"use client"

import { useLanguage } from "@/components/language-provider"

export function LoadingPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Loading Animation */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto">
            <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            {language === "uz" ? "Yuklanmoqda..." : "Загрузка..."}
          </h2>
          <p className="text-muted-foreground">
            {language === "uz"
              ? "Mahsulotlar yuklanmoqda, iltimos kuting."
              : "Загружаются товары, пожалуйста подождите."}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
