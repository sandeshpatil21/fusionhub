import path from 'path';

const RENDER_STORAGE_PATH = process.env.RENDER_STORAGE_PATH || '/opt/render/storage';

export const getStoragePath = (subPath: string = '') => {
  if (process.env.RENDER) {
    // Use Render's persistent storage path when deployed
    return path.join(RENDER_STORAGE_PATH, subPath);
  }
  // Use local paths for development
  return path.join(process.cwd(), subPath);
};

export const getPaths = () => ({
  userDataDir: getStoragePath('userDataDir'),
  tokens: getStoragePath('tokens'),
  uploads: getStoragePath('uploads'),
  whatsappImages: getStoragePath('WhatsAppImages'),
}); 