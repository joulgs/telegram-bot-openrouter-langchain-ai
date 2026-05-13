console.assert(!!process.env.TELEGRAM_BOT_TOKEN, '⚠️  TELEGRAM_BOT_TOKEN is not defined in environment variables')

export const config = {
  telegram: { botToken: process.env.TELEGRAM_BOT_TOKEN || '' },
};
