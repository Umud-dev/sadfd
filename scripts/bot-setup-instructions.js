// Instructions for setting up the Telegram Bot

console.log(`
🤖 TELEGRAM BOT SETUP INSTRUCTIONS
==================================

1. CREATE BOT:
   - Open Telegram and search for @BotFather
   - Send /newbot command
   - Choose a name: "Mini Shop Bot"
   - Choose a username: "minishop_bot" (must end with _bot)
   - Copy the bot token

2. CONFIGURE WEB APP:
   - Send /setmenubutton to @BotFather
   - Select your bot
   - Send the web app URL: https://shop.homeshop.uz
   - Set button text: "Open Mini Shop"

3. SET ENVIRONMENT VARIABLE:
   - Set TELEGRAM_BOT_TOKEN=your_bot_token_here
   
4. RUN THE BOT:
   - Development: node scripts/telegram-bot.js
   - Production: Set up webhook endpoint

5. OPTIONAL SETTINGS:
   - /setdescription - Set bot description
   - /setabouttext - Set about text
   - /setuserpic - Upload bot profile picture

EXAMPLE .env FILE:
==================
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
NODE_ENV=development

BOT COMMANDS TO SET (@BotFather):
=================================
start - Start the bot and open Mini Shop

WEBHOOK SETUP (Production):
===========================
POST https://api.telegram.org/bot<TOKEN>/setWebhook
{
  "url": "https://shop.homeshop.uz/api/webhook",
  "allowed_updates": ["message", "callback_query"]
}

TEST YOUR BOT:
==============
1. Search for your bot username in Telegram
2. Send /start command
3. Click "Open Mini Shop" button
4. Verify web app opens correctly
`)
