import { WhatsAppHandler, type WhatsAppConfig } from '../libs/WhatsAppHandler';

/**
 * WhatsApp Configuration
 * Centralized configuration for WhatsApp Business API
 */

/**
 * Get WhatsApp configuration from environment variables
 */
export function getWhatsAppConfig(): WhatsAppConfig {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error('WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID are required');
  }

  return {
    token,
    phoneNumberId,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    version: process.env.WHATSAPP_API_VERSION || 'v21.0',
    appSecret: process.env.WHATSAPP_APP_SECRET,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    apiTimeout: process.env.WHATSAPP_API_TIMEOUT 
      ? parseInt(process.env.WHATSAPP_API_TIMEOUT, 10) 
      : 30000,
    maxRetries: process.env.WHATSAPP_MAX_RETRIES 
      ? parseInt(process.env.WHATSAPP_MAX_RETRIES, 10) 
      : 3,
    rateLimitPerSecond: process.env.WHATSAPP_RATE_LIMIT_PER_SECOND
      ? parseInt(process.env.WHATSAPP_RATE_LIMIT_PER_SECOND, 10)
      : 80,
  };
}

/**
 * Create WhatsApp handler instance
 */
export function createWhatsAppHandler(overrides?: Partial<WhatsAppConfig>): WhatsAppHandler {
  const config = getWhatsAppConfig();
  return new WhatsAppHandler({ ...config, ...overrides });
}

/**
 * Default WhatsApp handler instance (singleton pattern)
 */
let defaultWhatsAppHandler: WhatsAppHandler | null = null;

export function getDefaultWhatsAppHandler(overrides?: Partial<WhatsAppConfig>): WhatsAppHandler {
  if (!defaultWhatsAppHandler) {
    defaultWhatsAppHandler = createWhatsAppHandler(overrides);
  }
  return defaultWhatsAppHandler;
}

export function resetDefaultWhatsAppHandler(): void {
  defaultWhatsAppHandler = null;
}

