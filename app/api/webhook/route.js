// Webhook endpoint for Telegram Bot (Production)
import { MiniShopBot } from "../../../scripts/telegram-bot.js"

const bot = new MiniShopBot(process.env.TELEGRAM_BOT_TOKEN)

export async function POST(request) {
  try {
    const update = await request.json()

    // Process the update
    await bot.processUpdate(update)

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new Response("Error", { status: 500 })
  }
}

// Verify webhook setup
export async function GET() {
  return new Response(
    JSON.stringify({
      status: "Webhook is active",
      timestamp: new Date().toISOString(),
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  )
}
