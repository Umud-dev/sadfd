"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

interface TelegramContextType {
  user: TelegramUser | null
  isReady: boolean
  webApp: any
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [webApp, setWebApp] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      setWebApp(tg)

      // Initialize Telegram Web App
      tg.ready()
      tg.expand()

      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }

      setIsReady(true)
    }
  }, [])

  return <TelegramContext.Provider value={{ user, isReady, webApp }}>{children}</TelegramContext.Provider>
}

export function useTelegram() {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error("useTelegram must be used within a TelegramProvider")
  }
  return context
}
