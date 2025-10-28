"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary/20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-primary/60" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            {language === "uz" ? "Sahifa topilmadi" : "Страница не найдена"}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {language === "uz"
              ? "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin."
              : "Извините, страница, которую вы ищете, не существует или могла быть перемещена."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              {language === "uz" ? "Bosh sahifa" : "Главная"}
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === "uz" ? "Orqaga" : "Назад"}
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {language === "uz"
              ? "Yordam kerak bo'lsa, bizning qo'llab-quvvatlash xizmatimiz bilan bog'laning."
              : "Если вам нужна помощь, свяжитесь с нашей службой поддержки."}
          </p>
        </div>
      </div>
    </div>
  )
}
