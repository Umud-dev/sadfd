"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "uz" | "ru"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  uz: {
    // Navigation
    menu: "Menyu",
    cart: "Savatcha",
    profile: "Profil",
    home: "Bosh sahifa",

    // Hero section
    welcome: "HomeShop ga xush kelibsiz",
    subtitle: "Uy jihozlari va bolalar o'yinchoqlari eng yaxshi narxlarda",
    orderNow: "Hozir buyurtma bering",
    qualityProducts: "Sifatli mahsulotlar",
    fastDelivery: "Tez yetkazib berish",

    // Categories
    discounts: "Chegirmalar",
    new: "Yangi",
    homeAppliances: "Uy jihozlari",
    toys: "O'yinchoqlar",
    kitchen: "Oshxona",
    electronics: "Elektronika",
    furniture: "Mebel",
    decor: "Dekor",
    baby: "Chaqaloq buyumlari",

    // Products
    addToCart: "Savatga qo'shish",
    price: "Narx",
    sum: "so'm",
    popular: "Mashhur",
    recommended: "Tavsiya etiladi",
    bestseller: "Eng ko'p sotilgan",
    premium: "Premium",

    // Account
    account: "Hisob",
    settings: "Sozlamalar",
    theme: "Mavzu",
    language: "Til",
    light: "Yorug'",
    dark: "Qorong'u",
    system: "Tizim",
    logout: "Chiqish",
    myOrders: "Mening buyurtmalarim",
    favorites: "Sevimlilar",

    // Search related translations
    search: "Qidirish",
    searchProducts: "Mahsulotlarni qidiring...",
    searchResults: "Qidiruv natijalari",
    noResults: "Hech narsa topilmadi",

    // Loading states
    loading: "Yuklanmoqda...",
    loadingProducts: "Mahsulotlar yuklanmoqda, iltimos kuting.",
    imageNotLoaded: "Rasm yuklanmadi",

    // Error page
    pageNotFound: "Sahifa topilmadi",
    pageNotFoundMessage: "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.",
    backToHome: "Bosh sahifa",
    goBack: "Orqaga",
    needHelp: "Yordam kerak bo'lsa, bizning qo'llab-quvvatlash xizmatimiz bilan bog'laning.",

    // Common
    error: "Xatolik yuz berdi",
    retry: "Qayta urinish",
    cancel: "Bekor qilish",
    confirm: "Tasdiqlash",
    close: "Yopish",
    save: "Saqlash",
    edit: "Tahrirlash",
    delete: "O'chirish",
    back: "Orqaga",
    next: "Keyingi",
    previous: "Oldingi",
    total: "Jami",
    quantity: "Miqdor",

    // Cart
    cartEmpty: "Savatcha bo'sh",
    checkout: "To'lov",
    removeFromCart: "Savatchadan olib tashlash",

    // Orders
    orderHistory: "Buyurtmalar tarixi",
    orderStatus: "Buyurtma holati",
    pending: "Kutilmoqda",
    confirmed: "Tasdiqlangan",
    preparing: "Tayyorlanmoqda",
    delivered: "Yetkazilgan",
    cancelled: "Bekor qilingan",

    // Telegram-only access translations
    telegramOnly: {
      title: "Faqat Telegram orqali",
      description: "Bu ilova faqat Telegram Mini App sifatida ishlaydi. Iltimos, Telegram orqali kiring.",
      step1: "Telegram ilovasini oching",
      step2: "Bizning botimizni toping va Mini App ni ishga tushiring",
      openTelegram: "Telegram ochish",
      footer: "Faqat Telegram Mini App",
    },
  },
  ru: {
    // Navigation
    menu: "Меню",
    cart: "Корзина",
    profile: "Профиль",
    home: "Главная",

    // Hero section
    welcome: "Добро пожаловать в HomeShop",
    subtitle: "Товары для дома и детские игрушки по лучшим ценам",
    orderNow: "Заказать сейчас",
    qualityProducts: "Качественные товары",
    fastDelivery: "Быстрая доставка",

    // Categories
    discounts: "Скидки",
    new: "Новинки",
    homeAppliances: "Бытовая техника",
    toys: "Игрушки",
    kitchen: "Кухня",
    electronics: "Электроника",
    furniture: "Мебель",
    decor: "Декор",
    baby: "Детские товары",

    // Products
    addToCart: "В корзину",
    price: "Цена",
    sum: "сум",
    popular: "Популярное",
    recommended: "Рекомендуем",
    bestseller: "Хит продаж",
    premium: "Премиум",

    // Account
    account: "Аккаунт",
    settings: "Настройки",
    theme: "Тема",
    language: "Язык",
    light: "Светлая",
    dark: "Темная",
    system: "Системная",
    logout: "Выйти",
    myOrders: "Мои заказы",
    favorites: "Избранное",

    // Search related translations
    search: "Поиск",
    searchProducts: "Поиск товаров...",
    searchResults: "Результаты поиска",
    noResults: "Ничего не найдено",

    // Loading states
    loading: "Загрузка...",
    loadingProducts: "Загружаются товары, пожалуйста подождите.",
    imageNotLoaded: "Изображение не загружено",

    // Error page
    pageNotFound: "Страница не найдена",
    pageNotFoundMessage: "Извините, страница, которую вы ищете, не существует или могла быть перемещена.",
    backToHome: "Главная",
    goBack: "Назад",
    needHelp: "Если вам нужна помощь, свяжитесь с нашей службой поддержки.",

    // Common
    error: "Произошла ошибка",
    retry: "Повторить",
    cancel: "Отмена",
    confirm: "Подтвердить",
    close: "Закрыть",
    save: "Сохранить",
    edit: "Редактировать",
    delete: "Удалить",
    back: "Назад",
    next: "Далее",
    previous: "Предыдущий",
    total: "Итого",
    quantity: "Количество",

    // Cart
    cartEmpty: "Корзина пуста",
    checkout: "Оформить заказ",
    removeFromCart: "Удалить из корзины",

    // Orders
    orderHistory: "История заказов",
    orderStatus: "Статус заказа",
    pending: "Ожидает",
    confirmed: "Подтвержден",
    preparing: "Готовится",
    delivered: "Доставлен",
    cancelled: "Отменен",

    // Telegram-only access translations
    telegramOnly: {
      title: "Только через Telegram",
      description: "Это приложение работает только как Telegram Mini App. Пожалуйста, войдите через Telegram.",
      step1: "Откройте приложение Telegram",
      step2: "Найдите нашего бота и запустите Mini App",
      openTelegram: "Открыть Telegram",
      footer: "Только Telegram Mini App",
    },
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    // Get language from localStorage or Telegram user language
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "uz" || savedLanguage === "ru")) {
      setLanguage(savedLanguage)
    } else if (typeof window !== "undefined" && window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {
      const telegramLang = window.Telegram.WebApp.initDataUnsafe.user.language_code
      if (telegramLang === "uz") {
        setLanguage("uz")
      } else {
        setLanguage("ru")
      }
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
