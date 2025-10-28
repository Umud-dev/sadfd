"use client"

import { Home, ShoppingBag, User } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function BottomNavigation() {
  const { t, language } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: language === "uz" ? "Menyu" : "Меню",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: ShoppingBag,
      label: language === "uz" ? "Savatcha" : "Корзина",
      href: "/cart",
      active: pathname === "/cart",
      badge: "2",
    },
    {
      icon: User,
      label: language === "uz" ? "Profil" : "Профиль",
      href: "/profile",
      active: pathname === "/profile",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 z-50 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center gap-1.5 py-2 px-4 rounded-xl transition-all duration-200 ${
                item.active
                  ? "text-slate-900 dark:text-white bg-primary scale-105 shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <div className="relative">
                <item.icon className={`w-6 h-6 ${item.active ? "stroke-2" : "stroke-1.5"}`} />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium ${item.active ? "font-semibold text-slate-900 dark:text-white" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
