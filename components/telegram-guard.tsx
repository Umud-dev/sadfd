"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Smartphone, MessageCircle, ArrowRight, Shield, Zap } from "lucide-react"

export function TelegramGuard({ children }: { children: React.ReactNode }) {
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if running in Telegram Web App environment
    const checkTelegram = () => {
      if (typeof window !== "undefined") {
        // Check for Telegram Web App
        const hasTelegramWebApp = !!(window as any).Telegram?.WebApp
        const hasTelegramInitData = !!(window as any).Telegram?.WebApp?.initData
        const isInTelegram =
          hasTelegramWebApp &&
          (hasTelegramInitData ||
            window.location.search.includes("tgWebAppData") ||
            document.referrer.includes("t.me") ||
            navigator.userAgent.includes("TelegramBot"))

        setIsTelegram(isInTelegram)
      }
    }

    // Check immediately
    checkTelegram()

    // Also check after a short delay to ensure Telegram scripts are loaded
    const timer = setTimeout(checkTelegram, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading while checking
  if (isTelegram === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t("loading")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Block access if not from Telegram
  if (!isTelegram) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl relative z-10">
          <CardContent className="p-10 text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <MessageCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                {t("telegramOnly.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-md mx-auto">
                {t("telegramOnly.description")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                  1
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{t("telegramOnly.step1")}</p>
                </div>
                <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                  2
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{t("telegramOnly.step2")}</p>
                </div>
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              </div>
            </div>

            <Button
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open("https://t.me/TogaShopBot/shop", "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              {t("telegramOnly.openTelegram")}
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{t("telegramOnly.footer")}</span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Allow access if from Telegram
  return <>{children}</>
}
