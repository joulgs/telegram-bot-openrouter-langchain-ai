console.assert(process.env.TELEGRAM_BOT_TOKEN, '⚠️  TELEGRAM_BOT_TOKEN is not defined in environment variables')

export const config = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
};
