import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { CartProvider } from "@/components/cart-provider"
import { TelegramProvider } from "@/components/telegram-provider"
import { SearchProvider } from "@/components/search-provider"
import { TelegramGuard } from "@/components/telegram-guard"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Tog'a Market - Telegram Web App",
  description: "Tog'a Market - Telegram Web App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <TelegramProvider>
              <CartProvider>
                <LanguageProvider>
                  <SearchProvider>
                    <TelegramGuard>{children}</TelegramGuard>
                  </SearchProvider>
                </LanguageProvider>
              </CartProvider>
            </TelegramProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
