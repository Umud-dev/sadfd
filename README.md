# Mini Shop - Telegram Web App

A modern e-commerce mini app for Telegram with sushi/food delivery theme.

## Features

- 🛍️ **E-commerce Web App**: Modern shopping interface with product catalog
- 🌍 **Multi-language**: Support for Uzbek and Russian languages
- 🎨 **Theme Support**: Light and dark mode with emerald green theme
- 📱 **Mobile-first**: Optimized for Telegram Web App
- 🤖 **Telegram Bot**: Integrated bot with web app button
- 🛒 **Shopping Cart**: Add to cart functionality with quantity controls
- 👤 **User Profile**: Telegram user integration and account management

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Bot**: Node.js with Telegram Bot API
- **Deployment**: Vercel (recommended)

## Quick Start

### 1. Clone and Install
\`\`\`bash
git clone <repository-url>
cd mini-shop-app
npm install
\`\`\`

### 2. Environment Setup
Create \`.env.local\`:
\`\`\`
TELEGRAM_BOT_TOKEN=your_bot_token_here
NEXT_PUBLIC_WEB_APP_URL=https://shop.homeshop.uz
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 4. Setup Telegram Bot
\`\`\`bash
node scripts/bot-setup-instructions.js
node scripts/telegram-bot.js
\`\`\`

## Telegram Bot Setup

1. **Create Bot with @BotFather**:
   - Send \`/newbot\` to @BotFather
   - Name: "Mini Shop Bot"
   - Username: "minishop_bot"
   - Copy the token

2. **Configure Web App**:
   - Send \`/setmenubutton\` to @BotFather
   - Set URL: \`https://shop.homeshop.uz\`
   - Set button text: "🛍️ Open Mini Shop"

3. **Set Commands**:
   - Send \`/setcommands\` to @BotFather
   - Add: \`start - Start the bot and open Mini Shop\`

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with hero, categories, products
│   ├── profile/           # User profile and account pages
│   ├── cart/              # Shopping cart page
│   └── api/webhook/       # Telegram webhook endpoint
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero-section.tsx  # Hero section with CTA
│   ├── category-carousel.tsx # Horizontal scrolling categories
│   ├── product-grid.tsx  # Product listing with filters
│   ├── product-card.tsx  # Individual product cards
│   ├── bottom-navigation.tsx # Mobile navigation
│   └── language-provider.tsx # i18n context
├── scripts/              # Bot and utility scripts
│   ├── telegram-bot.js   # Main bot logic
│   └── bot-setup-instructions.js # Setup guide
└── public/              # Static assets and images
\`\`\`

## Features Overview

### Web App
- **Hero Section**: Welcome message with food imagery and CTAs
- **Categories**: Horizontal scrolling category carousel
- **Products**: Grid layout with filtering, pricing, and cart controls
- **Profile**: Telegram user info, settings, order history
- **Cart**: Shopping cart with quantity controls and checkout
- **Themes**: Light/dark mode with emerald green color scheme
- **Languages**: Uzbek and Russian with automatic detection

### Telegram Bot
- **Start Command**: Sends web app button and welcome message
- **Web App Button**: Opens mini shop at configured URL
- **Multi-language**: Responds in user's language (uz/ru)
- **Contact Info**: Provides business contact information
- **About Section**: Information about the shop

## Customization

### Colors
Edit \`app/globals.css\` to change the color scheme:
\`\`\`css
:root {
  --primary: oklch(0.598 0.175 162.48); /* Emerald green */
  --secondary: oklch(0.696 0.17 162.48);
  /* ... other colors */
}
\`\`\`

### Languages
Add translations in \`components/language-provider.tsx\`:
\`\`\`typescript
const translations = {
  uz: { /* Uzbek translations */ },
  ru: { /* Russian translations */ },
  // Add more languages here
}
\`\`\`

### Products
Update product data in \`components/product-grid.tsx\`:
\`\`\`typescript
const products = [
  {
    id: "1",
    name: "Product Name",
    nameRu: "Название продукта",
    price: 50000,
    image: "/product-image.jpg",
    // ... other properties
  }
]
\`\`\`

## Support

For issues and questions:
- 📧 Email: info@minishop.uz
- 📱 Phone: +998 90 123 45 67
- 🕐 Hours: 9:00 - 22:00

## License

MIT License - see LICENSE file for details.
\`\`\`
`
