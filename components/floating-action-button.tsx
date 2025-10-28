"use client"

import { ArrowUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"

export function FloatingActionButton() {
  const { language } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleContact = () => {
    // Open Telegram contact or phone
    window.open("https://t.me/homeshop_support", "_blank")
  }

  return (
    <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3">
      {/* Contact Button */}
      <Button
        onClick={handleContact}
        size="icon"
        className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label={language === "uz" ? "Bog'lanish" : "Связаться"}
      >
        <MessageCircle className="w-5 h-5" />
      </Button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 animate-in slide-in-from-bottom-2"
          aria-label={language === "uz" ? "Yuqoriga" : "Наверх"}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
