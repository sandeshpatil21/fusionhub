FROM node:lts-alpine3.18 as base
WORKDIR /usr/src/wpp-server
ENV NODE_ENV=production PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install system dependencies
RUN apk update && \
    apk add --no-cache \
    vips-dev \
    fftw-dev \
    gcc \
    g++ \
    make \
    libc6-compat \
    python3 \
    && rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile && \
    yarn add sharp --ignore-engines && \
    yarn cache clean

FROM base as build
WORKDIR /usr/src/wpp-server
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Copy all source files
COPY . .

# Install all dependencies including devDependencies
RUN yarn install --frozen-lockfile && \
    yarn build

FROM base
WORKDIR /usr/src/wpp-server/

# Install chromium
RUN apk add --no-cache chromium

# Copy built files and source
COPY --from=build /usr/src/wpp-server/dist ./dist
COPY --from=build /usr/src/wpp-server/src ./src

# Create necessary directories
RUN mkdir -p \
    ./userDataDir \
    ./tokens \
    ./uploads \
    ./WhatsAppImages \
    && chown -R node:node .

# Use non-root user
USER node

EXPOSE 21465
CMD ["node", "dist/server.js"]
