/*
 * Copyright 2023 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import swaggerAutogen from 'swagger-autogen';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import config from './config';

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/routes/index.ts'];

const doc = {
  info: {
    version: '2.0.0',
    title: 'FusionHub API',
    description:
      'Welcome to the FusionHub API documentation. This API provides a set of endpoints to interact with the application, allowing you to build integrations and automate interactions with WhatsApp.',
  },
  host: `${config.host}:${config.port}`,
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  swaggerOptions: {
    customCss: `
      .swagger-ui .topbar-wrapper > *,
      .swagger-ui .topbar-wrapper > * {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
      }

      .swagger-ui .topbar-wrapper svg,
      .swagger-ui .topbar a,
      .swagger-ui .topbar .download-url-wrapper,
      .swagger-ui .topbar form,
      .swagger-ui .topbar .download-url-input,
      .swagger-ui .topbar .download-url-button {
        display: none !important;
      }

      .swagger-ui .topbar,
      .swagger-ui .topbar-wrapper {
        background: #5F4AA8 !important;
        padding: 10px 0 !important;
        height: 60px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative !important;
        border-bottom: 1px solid #6b57b8;
      }

      .swagger-ui .topbar-wrapper:after {
        content: '';
        background-image: url('/images/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        height: 40px;
        width: 200px;
        display: block !important;
      }

      /* Add favicon */
      link[rel="icon"],
      link[rel="shortcut icon"] {
        content: url('/images/favicon.png') !important;
      }
    `,
    customSiteTitle: "FusionHub API",
    customfavIcon: "/images/favicon.png",
    customJs: '/custom.js'
  },
  tags: [
    {
      name: 'Auth',
      description: '',
    },
    {
      name: 'Chat',
      description: 'Manages chat-related operations.',
    },
    {
      name: 'Contact',
      description:
        'Handles operations related to contacts, such as managing contact lists, adding or removing contacts, and retrieving contact information.',
    },
    {
      name: 'Catalog & Bussiness',
      description:
        'Handles operations related to catalogs and business-related functionalities, such as managing product catalogs and business information.',
    },
    {
      name: 'Community',
      description: 'Manage communities.',
    },
    {
      name: 'Messages',
      description:
        'Handles message-related operations, including sending, receiving, and managing messages.',
    },
    {
      name: 'Profile',
      description:
        'Manages user profile-related operations, such as retrieving and updating profile information',
    },
    {
      name: 'Status Stories',
      description:
        'Handles operations related to status stories, such as viewing, updating, and managing status stories',
    },
    {
      name: 'Labels',
      description:
        'Manages labels or tags associated with chats or messages for organization and categorization purposes.',
    },
    {
      name: 'Group',
      description:
        'Manages operations related to WhatsApp groups, such as creating, modifying, and managing group settings.',
    },
    {
      name: 'Misc',
      description:
        'Handles miscellaneous operations that do not fit into other specific categories.',
    },
  ],
  definitions: {},
  components: {
    '@schemas': {
      session: {
        type: 'string',
        schema: 'NERDWHATS_AMERICA',
      },
    },
  },
};

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// First generate the swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Then use the generated JSON file
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(require('./swagger.json'), {
    customCss: `
      .swagger-ui .topbar {
        background-color: #fff;
        padding: 10px 0;
      }

      .swagger-ui .topbar-wrapper img {
        content: url('/public/images/logo.png');
        height: 40px;
        margin: 0;
      }

      .swagger-ui .topbar-wrapper > *:not(img) {
        display: none !important;
      }

      /* Change main page title */
      .swagger-ui .info .title {
        display: none;
      }
      
      .swagger-ui .info:before {
        content: 'FusionHub API';
        font-size: 36px;
        font-weight: bold;
        display: block;
        margin-bottom: 20px;
      }

      /* Override Swagger UI text */
      .swagger-ui .swagger-ui-wrap:before {
        content: 'FusionHub API';
      }
    `,
    customSiteTitle: "FusionHub API",
    customfavIcon: "/images/favicon.png",
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
      displayRequestDuration: true,
      filter: true,
      tagsSorter: 'alpha'
    }
  })
);
