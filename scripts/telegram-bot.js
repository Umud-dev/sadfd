// Telegram Bot for Mini Shop
// This bot sends a web app button when users send /start command

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8299226351:AAGkOILSMB7PCquK3dKGQ8KvTufxJEYgp3Q"
const WEB_APP_URL = "https://shop.homeshop.uz"

class MiniShopBot {
  constructor(token) {
    this.token = token
    this.apiUrl = `https://api.telegram.org/bot${token}`
  }

  // Send HTTP request to Telegram API
  async sendRequest(method, data) {
    try {
      const response = await fetch(`${this.apiUrl}/${method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      console.error("Error sending request:", error)
      return null
    }
  }

  // Send message with web app button
  async sendWebAppButton(chatId, language = "ru") {
    const messages = {
      uz: {
        text: `🏠 *HomeShop Mini Ilovasiga Xush Kelibsiz!*

Bizning katalogimizda:
• 🏠 Uy jihozlari va texnikalar
• 🧸 Bolalar o'yinchoqlari
• 🍳 Oshxona anjomlar
• 📱 Elektronika va gadjetlar
• 👶 Bolalar uchun mahsulotlar

Mahsulotlarni ko'rish va xarid qilish uchun pastdagi tugmani bosing!`,
        button: "🛍️ Do'konni ochish",
        menu: "📋 Menyu",
        contact: "📞 Aloqa",
        about: "ℹ️ Ma'lumot",
        language: "🌐 Tilni o'zgartirish",
      },
      ru: {
        text: `🏠 *Добро пожаловать в HomeShop Mini App!*

В нашем каталоге:
• 🏠 Бытовая техника и товары для дома
• 🧸 Детские игрушки
• 🍳 Кухонные принадлежности  
• 📱 Электроника и гаджеты
• 👶 Товары для детей

Нажмите кнопку ниже, чтобы посмотреть товары и сделать покупки!`,
        button: "🛍️ Открыть магазин",
        menu: "📋 Меню",
        contact: "📞 Контакты",
        about: "ℹ️ О нас",
        language: "🌐 Сменить язык",
      },
    }

    const message = messages[language] || messages.ru

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: message.button,
            web_app: {
              url: WEB_APP_URL,
            },
          },
        ],
        [
          {
            text: message.menu,
            callback_data: "menu",
          },
          {
            text: message.contact,
            callback_data: "contact",
          },
        ],
        [
          {
            text: message.about,
            callback_data: "about",
          },
          {
            text: message.language,
            callback_data: "language",
          },
        ],
      ],
    }

    return await this.sendRequest("sendMessage", {
      chat_id: chatId,
      text: message.text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    })
  }

  // Send message with web app button
  async sendMenu(chatId, language = "ru") {
    const messages = {
      uz: {
        text: `📋 *Asosiy Menyu*

Quyidagi bo'limlardan birini tanlang:`,
        categories: "🏷️ Kategoriyalar",
        popular: "⭐ Mashhur mahsulotlar",
        new: "🆕 Yangi mahsulotlar",
        discounts: "🔥 Chegirmalar",
        back: "⬅️ Orqaga",
      },
      ru: {
        text: `📋 *Главное меню*

Выберите один из разделов:`,
        categories: "🏷️ Категории",
        popular: "⭐ Популярные товары",
        new: "🆕 Новые товары",
        discounts: "🔥 Скидки",
        back: "⬅️ Назад",
      },
    }

    const message = messages[language] || messages.ru

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: message.categories,
            callback_data: "categories",
          },
          {
            text: message.popular,
            callback_data: "popular",
          },
        ],
        [
          {
            text: message.new,
            callback_data: "new_products",
          },
          {
            text: message.discounts,
            callback_data: "discounts",
          },
        ],
        [
          {
            text: message.back,
            callback_data: "back_to_main",
          },
        ],
      ],
    }

    return await this.sendRequest("sendMessage", {
      chat_id: chatId,
      text: message.text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    })
  }

  // Send message with web app button
  async sendLanguageMenu(chatId, language = "ru") {
    const messages = {
      uz: {
        text: `🌐 *Tilni tanlang*

Qaysi tilda davom etishni xohlaysiz?`,
      },
      ru: {
        text: `🌐 *Выберите язык*

На каком языке продолжить?`,
      },
    }

    const message = messages[language] || messages.ru

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: "🇺🇿 O'zbekcha",
            callback_data: "lang_uz",
          },
          {
            text: "🇷🇺 Русский",
            callback_data: "lang_ru",
          },
        ],
        [
          {
            text: language === "uz" ? "⬅️ Orqaga" : "⬅️ Назад",
            callback_data: "back_to_main",
          },
        ],
      ],
    }

    return await this.sendRequest("sendMessage", {
      chat_id: chatId,
      text: message.text,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    })
  }

  // Send HTTP request to Telegram API
  async deleteMessage(chatId, messageId) {
    return await this.sendRequest("deleteMessage", {
      chat_id: chatId,
      message_id: messageId,
    })
  }

  // Send HTTP request to Telegram API
  async editMessage(chatId, messageId, text, replyMarkup = null) {
    return await this.sendRequest("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "Markdown",
      reply_markup: replyMarkup,
    })
  }

  // Handle /start command
  async handleStart(chatId, user) {
    console.log(`User ${user.first_name} (${user.id}) started the bot`)

    // Detect user language
    const language = user.language_code === "uz" ? "uz" : "ru"

    return await this.sendWebAppButton(chatId, language)
  }

  // Handle callback queries (button presses)
  async handleCallbackQuery(callbackQuery) {
    const { id, data, from, message } = callbackQuery
    const language = from.language_code === "uz" ? "uz" : "ru"
    const chatId = message.chat.id
    const messageId = message.message_id

    await this.deleteMessage(chatId, messageId)

    let responseText = ""
    let shouldSendNewMessage = true

    switch (data) {
      case "menu":
        await this.sendMenu(chatId, language)
        shouldSendNewMessage = false
        break

      case "language":
        await this.sendLanguageMenu(chatId, language)
        shouldSendNewMessage = false
        break

      case "lang_uz":
        await this.sendWebAppButton(chatId, "uz")
        shouldSendNewMessage = false
        break

      case "lang_ru":
        await this.sendWebAppButton(chatId, "ru")
        shouldSendNewMessage = false
        break

      case "back_to_main":
        await this.sendWebAppButton(chatId, language)
        shouldSendNewMessage = false
        break

      case "categories":
        responseText =
          language === "uz"
            ? `🏷️ *Kategoriyalar*

• 🏠 Uy jihozlari
• 🧸 Bolalar o'yinchoqlari  
• 🍳 Oshxona anjomlar
• 📱 Elektronika
• 👶 Bolalar mahsulotlari
• 🛏️ Mebel va dekor

Barcha mahsulotlarni ko'rish uchun ilovani oching!`
            : `🏷️ *Категории*

• 🏠 Бытовая техника
• 🧸 Детские игрушки
• 🍳 Кухонные принадлежности
• 📱 Электроника
• 👶 Товары для детей
• 🛏️ Мебель и декор

Откройте приложение, чтобы увидеть все товары!`
        break

      case "popular":
        responseText =
          language === "uz"
            ? `⭐ *Mashhur mahsulotlar*

• Samsung kir yuvish mashinasi
• LEGO konstruktor to'plami
• Philips blender
• ASUS noutbuk
• Bolalar velosipedi

Batafsil ma'lumot uchun ilovani oching!`
            : `⭐ *Популярные товары*

• Стиральная машина Samsung
• Конструктор LEGO
• Блендер Philips  
• Ноутбук ASUS
• Детский велосипед

Откройте приложение для подробной информации!`
        break

      case "new_products":
        responseText =
          language === "uz"
            ? `🆕 *Yangi mahsulotlar*

• iPhone 15 Pro Max
• Dyson changyutgich
• Bosch toster
• Sony quloqchin
• Bolalar kitoblari to'plami

Yangi mahsulotlarni ilovada ko'ring!`
            : `🆕 *Новые товары*

• iPhone 15 Pro Max
• Пылесос Dyson
• Тостер Bosch
• Наушники Sony
• Набор детских книг

Смотрите новые товары в приложении!`
        break

      case "discounts":
        responseText =
          language === "uz"
            ? `🔥 *Chegirmalar*

• Dyson changyutgich - 16% chegirma
• Samsung planshet - 20% chegirma
• Oshxona to'plami - 15% chegirma
• Bolalar o'yinchoqlari - 25% chegirma

Barcha chegirmalarni ilovada ko'ring!`
            : `🔥 *Скидки*

• Пылесос Dyson - скидка 16%
• Планшет Samsung - скидка 20%
• Кухонный набор - скидка 15%
• Детские игрушки - скидка 25%

Все скидки смотрите в приложении!`
        break

      case "contact":
        responseText =
          language === "uz"
            ? `📞 *Aloqa ma'lumotlari*

📱 Telefon: +998 90 123 45 67
📧 Email: info@homeshop.uz
🌐 Sayt: shop.homeshop.uz
📍 Manzil: Toshkent, Chilonzor tumani

🕐 Ish vaqti: 
Dushanba-Yakshanba: 9:00 - 22:00

💬 Savollaringiz bo'lsa, bizga murojaat qiling!`
            : `📞 *Контактная информация*

📱 Телефон: +998 90 123 45 67
📧 Email: info@homeshop.uz
🌐 Сайт: shop.homeshop.uz
📍 Адрес: Ташкент, Чиланзарский район

🕐 Время работы:
Понедельник-Воскресенье: 9:00 - 22:00

💬 Если у вас есть вопросы, обращайтесь к нам!`
        break

      case "about":
        responseText =
          language === "uz"
            ? `ℹ️ *HomeShop haqida*

Biz 2024-yilda tashkil etilgan zamonaviy onlayn do'konmiz. 

🎯 *Bizning maqsadimiz:*
Mijozlarimizga sifatli mahsulotlar va mukammal xizmat ko'rsatish

✨ *Bizning afzalliklarimiz:*
• Keng mahsulot assortimenti
• Tez va ishonchli yetkazib berish
• Qulay narxlar va chegirmalar
• 24/7 mijozlar xizmati
• Kafolat va sifat nazorati

🚀 Bizning Telegram Mini App orqali xarid qilish oson va qulay!`
            : `ℹ️ *О HomeShop*

Мы современный интернет-магазин, основанный в 2024 году.

🎯 *Наша цель:*
Предоставить клиентам качественные товары и отличный сервис

✨ *Наши преимущества:*
• Широкий ассортимент товаров
• Быстрая и надежная доставка
• Доступные цены и скидки
• Служба поддержки 24/7
• Гарантия и контроль качества

🚀 Покупки через наше Telegram Mini App просты и удобны!`
        break

      default:
        responseText = language === "uz" ? "Noma'lum buyruq" : "Неизвестная команда"
    }

    // Answer callback query
    await this.sendRequest("answerCallbackQuery", {
      callback_query_id: id,
      text: language === "uz" ? "✅ Bajarildi" : "✅ Выполнено",
    })

    if (shouldSendNewMessage && responseText) {
      const backButton = {
        inline_keyboard: [
          [
            {
              text: language === "uz" ? "⬅️ Orqaga" : "⬅️ Назад",
              callback_data: "back_to_main",
            },
            {
              text: language === "uz" ? "🛍️ Do'konni ochish" : "🛍️ Открыть магазин",
              web_app: {
                url: WEB_APP_URL,
              },
            },
          ],
        ],
      }

      return await this.sendRequest("sendMessage", {
        chat_id: chatId,
        text: responseText,
        parse_mode: "Markdown",
        reply_markup: backButton,
      })
    }
  }

  // Handle regular messages
  async handleMessage(message) {
    const { chat, from, text } = message

    if (text === "/start") {
      return await this.handleStart(chat.id, from)
    }

    // Handle other commands
    const language = from.language_code === "uz" ? "uz" : "ru"

    const helpText =
      language === "uz"
        ? `🤖 Mini Shop Bot\n\nMavjud buyruqlar:\n/start - Botni ishga tushirish\n\nMahsulotlarni ko'rish uchun "Mini Shop ni ochish" tugmasini bosing!`
        : `🤖 Mini Shop Bot\n\nДоступные команды:\n/start - Запустить бота\n\nДля просмотра товаров нажмите кнопку "Открыть Mini Shop"!`

    return await this.sendRequest("sendMessage", {
      chat_id: chat.id,
      text: helpText,
      parse_mode: "Markdown",
    })
  }

  // Process incoming updates
  async processUpdate(update) {
    try {
      if (update.message) {
        await this.handleMessage(update.message)
      } else if (update.callback_query) {
        await this.handleCallbackQuery(update.callback_query)
      }
    } catch (error) {
      console.error("Error processing update:", error)
    }
  }

  // Set webhook for production
  async setWebhook(webhookUrl) {
    const result = await this.sendRequest("setWebhook", {
      url: webhookUrl,
      allowed_updates: ["message", "callback_query"],
    })
    console.log("Webhook set:", result)
    return result
  }

  // Get bot info
  async getBotInfo() {
    const result = await this.sendRequest("getMe")
    console.log("Bot info:", result)
    return result
  }

  // Start polling for development
  async startPolling() {
    console.log("Starting bot polling...")
    let offset = 0

    while (true) {
      try {
        const updates = await this.sendRequest("getUpdates", {
          offset: offset,
          timeout: 30,
        })

        if (updates && updates.ok && updates.result.length > 0) {
          for (const update of updates.result) {
            await this.processUpdate(update)
            offset = update.update_id + 1
          }
        }
      } catch (error) {
        console.error("Polling error:", error)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
    }
  }
}

// Initialize and start bot
async function main() {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
    console.error("Please set TELEGRAM_BOT_TOKEN environment variable")
    console.log("Get your bot token from @BotFather on Telegram")
    return
  }

  const bot = new MiniShopBot(TELEGRAM_BOT_TOKEN)

  // Get bot info
  await bot.getBotInfo()

  // Start polling (for development)
  // For production, use webhook instead
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode - set up webhook manually")
    // await bot.setWebhook('https://your-domain.com/webhook')
  } else {
    await bot.startPolling()
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MiniShopBot }
}

// Run if called directly
if (typeof require !== "undefined" && require.main === module) {
  main().catch(console.error)
}
