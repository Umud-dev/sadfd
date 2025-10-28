"use client"

import {
  Settings,
  Heart,
  ShoppingBag,
  LogOut,
  Crown,
  Star,
  Shield,
  Bell,
  CreditCard,
  Gift,
  HelpCircle,
  ChevronRight,
  User,
  MapPin,
  Sparkles,
  Award,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { useTelegram } from "@/components/telegram-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const { t, language } = useLanguage()
  const { user, isReady } = useTelegram()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    if (isReady) {
      clearTimeout(timer)
      setIsLoading(false)
    }

    return () => clearTimeout(timer)
  }, [isReady])

  const isPremium = user?.is_premium || false

  const accountItems = [
    {
      icon: ShoppingBag,
      label: t("myOrders"),
      badge: "24",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      description: language === "uz" ? "Buyurtmalar tarixi" : "История заказов",
    },
    {
      icon: Heart,
      label: t("favorites"),
      badge: "12",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      description: language === "uz" ? "Saqlangan mahsulotlar" : "Сохраненные товары",
    },
    {
      icon: CreditCard,
      label: language === "uz" ? "To'lov usullari" : "Способы оплаты",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      description: language === "uz" ? "Kartalar va to'lovlar" : "Карты и платежи",
    },
    {
      icon: MapPin,
      label: language === "uz" ? "Manzillarim" : "Мои адреса",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      description: language === "uz" ? "Yetkazib berish manzillari" : "Адреса доставки",
    },
  ]

  const supportItems = [
    {
      icon: Gift,
      label: language === "uz" ? "Bonuslar" : "Бонусы",
      badge: "1,250",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      description: language === "uz" ? "Bonus ballaringiz" : "Ваши бонусные баллы",
    },
    {
      icon: Bell,
      label: language === "uz" ? "Bildirishnomalar" : "Уведомления",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      description: language === "uz" ? "Xabarlar sozlamalari" : "Настройки уведомлений",
    },
    {
      icon: HelpCircle,
      label: language === "uz" ? "Yordam" : "Помощь",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      description: language === "uz" ? "Qo'llab-quvvatlash" : "Поддержка",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <main className="pb-32">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <div className="relative h-36 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative h-28 bg-gradient-to-br from-muted via-muted/70 to-muted rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="relative h-16 bg-gradient-to-r from-muted via-muted/60 to-muted rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="pb-32">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
            <CardContent className="p-8 relative">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-lg"></div>
                  <Avatar className="w-28 h-28 border-4 border-primary/30 shadow-2xl relative">
                    <AvatarImage src={user?.photo_url || "/placeholder.svg"} alt={user?.first_name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-4xl font-bold">
                      {user?.first_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {isPremium && (
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white dark:border-background">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white dark:border-background flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent truncate">
                      {user?.first_name} {user?.last_name}
                    </h1>
                    {isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-sm font-bold px-3 py-1.5 shadow-lg">
                        <Crown className="w-4 h-4 mr-1" />
                        PREMIUM
                      </Badge>
                    )}
                  </div>
                  {user?.username && (
                    <p className="text-muted-foreground mb-4 flex items-center gap-2 text-lg">
                      <User className="w-5 h-5" />@{user.username}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="text-sm font-semibold px-3 py-1.5 bg-muted/50">
                      ID: {user?.id || "N/A"}
                    </Badge>
                    {user?.language_code && (
                      <Badge variant="outline" className="text-sm font-semibold px-3 py-1.5 bg-muted/50">
                        {user.language_code.toUpperCase()}
                      </Badge>
                    )}
                    <Badge className="text-sm font-semibold px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                      <Shield className="w-4 h-4 mr-1" />
                      {language === "uz" ? "Tasdiqlangan" : "Проверено"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
              <CardContent className="p-6 relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">24</div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                  {language === "uz" ? "Buyurtma" : "Заказов"}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-red-50 via-red-100 to-red-50 dark:from-red-950 dark:via-red-900 dark:to-red-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
              <CardContent className="p-6 relative">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-700 dark:text-red-300 mb-1">12</div>
                <div className="text-sm text-red-600 dark:text-red-400 font-semibold">
                  {language === "uz" ? "Sevimli" : "Избранных"}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 dark:from-yellow-950 dark:via-yellow-900 dark:to-yellow-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
              <CardContent className="p-6 relative">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mb-1">4.8</div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">
                  {language === "uz" ? "Reyting" : "Рейтинг"}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-green-50 via-green-100 to-green-50 dark:from-green-950 dark:via-green-900 dark:to-green-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
              <CardContent className="p-6 relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">1.2K</div>
                <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  {language === "uz" ? "Bonus" : "Бонусов"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div>{language === "uz" ? "Tez sozlamalar" : "Быстрые настройки"}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {language === "uz" ? "Asosiy parametrlar" : "Основные параметры"}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-sm"></div>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">{t("theme")}</span>
                    <div className="text-sm text-muted-foreground">
                      {language === "uz" ? "Interfeys ko'rinishi" : "Внешний вид интерфейса"}
                    </div>
                  </div>
                </div>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">Aa</span>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">{t("language")}</span>
                    <div className="text-sm text-muted-foreground">
                      {language === "uz" ? "Interfeys tili" : "Язык интерфейса"}
                    </div>
                  </div>
                </div>
                <LanguageToggle />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                {language === "uz" ? "Tez sozlamalar" : "Быстрые настройки"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                  <span className="font-medium">{t("theme")}</span>
                </div>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">Aa</span>
                  </div>
                  <span className="font-medium">{t("language")}</span>
                </div>
                <LanguageToggle />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                {language === "uz" ? "Hisob boshqaruvi" : "Управление аккаунтом"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {accountItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl cursor-pointer transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs font-semibold">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  {index < accountItems.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                {language === "uz" ? "Qo'llab-quvvatlash" : "Поддержка"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {supportItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl cursor-pointer transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs font-semibold">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  {index < supportItems.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {isReady && (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/30 dark:from-blue-950/50 dark:via-indigo-950/30 dark:to-purple-950/20 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
              <CardHeader className="pb-6 relative">
                <CardTitle className="text-xl font-bold flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                    <span className="text-white text-2xl font-bold">T</span>
                  </div>
                  <div>
                    <div className="text-2xl">Telegram {language === "uz" ? "Ma'lumotlari" : "Информация"}</div>
                    <div className="text-sm text-muted-foreground font-normal flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {language === "uz" ? "Xavfsiz hisob ma'lumotlari" : "Безопасная информация аккаунта"}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-black/30 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {language === "uz" ? "To'liq ism" : "Полное имя"}
                    </span>
                    <span className="font-bold text-lg">
                      {user?.first_name} {user?.last_name || ""}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-black/30 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Username
                    </span>
                    <span className="font-bold text-lg">@{user?.username || "N/A"}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-black/30 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      {language === "uz" ? "Premium holati" : "Статус Premium"}
                    </span>
                    {isPremium ? (
                      <Badge className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold px-4 py-2 text-sm shadow-lg">
                        <Crown className="w-4 h-4 mr-1" />
                        PREMIUM
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="font-semibold px-4 py-2 bg-muted/50">
                        {language === "uz" ? "Oddiy" : "Обычный"}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-black/30 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                    <span className="text-muted-foreground font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Telegram ID
                    </span>
                    <span className="font-mono text-sm bg-gradient-to-r from-muted to-muted/80 px-4 py-2 rounded-xl font-bold border">
                      {user?.id || "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            variant="outline"
            className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-300 h-14 font-bold border-2 bg-gradient-to-r from-transparent to-transparent hover:from-destructive/5 hover:to-destructive/10 text-lg shadow-lg"
            size="lg"
          >
            <LogOut className="w-6 h-6 mr-3" />
            {language === "uz" ? "Hisobdan chiqish" : "Выйти из аккаунта"}
          </Button>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
