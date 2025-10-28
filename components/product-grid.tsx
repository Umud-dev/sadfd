"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { useSearch } from "@/components/search-provider"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  nameRu: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isPopular?: boolean
  isNew?: boolean
  hasDiscount?: boolean
  description?: string
  descriptionRu?: string
  bestseller?: boolean
  premium?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Kir yuvish mashinasi Samsung",
    nameRu: "Стиральная машина Samsung",
    price: 4500000,
    originalPrice: 5200000,
    image: "/samsung-washing-machine-front-load.jpg",
    category: "homeAppliances",
    hasDiscount: true,
    isPopular: true,
    description: "7kg sig'imli, energiya tejovchi",
    descriptionRu: "7кг загрузка, энергосберегающая",
  },
  {
    id: "2",
    name: "Bolalar konstruktori LEGO",
    nameRu: "Детский конструктор LEGO",
    price: 850000,
    originalPrice: 1000000,
    image: "/lego-construction-set-colorful.jpg",
    category: "toys",
    hasDiscount: true,
    bestseller: true,
    description: "500 qismli, 6+ yosh uchun",
    descriptionRu: "500 деталей, для детей 6+",
  },
  {
    id: "3",
    name: "Oshxona to'plami Premium",
    nameRu: "Кухонный набор Premium",
    price: 1200000,
    image: "/premium-kitchen-cookware-set.jpg",
    category: "kitchen",
    isNew: true,
    premium: true,
    description: "12 qismli, zanglamaydigan po'lat",
    descriptionRu: "12 предметов, нержавеющая сталь",
  },
  {
    id: "4",
    name: "Smart TV 55 dyuym",
    nameRu: "Smart TV 55 дюймов",
    price: 6800000,
    image: "/smart-tv-55-inch-4k.jpg",
    category: "electronics",
    isPopular: true,
    description: "4K Ultra HD, Android TV",
    descriptionRu: "4K Ultra HD, Android TV",
  },
  {
    id: "5",
    name: "Bolalar velosipedi",
    nameRu: "Детский велосипед",
    price: 950000,
    image: "/children-bicycle-colorful.jpg",
    category: "toys",
    isNew: true,
    description: "3-7 yosh, xavfsizlik g'ildiraklari bilan",
    descriptionRu: "3-7 лет, с боковыми колесиками",
  },
  {
    id: "6",
    name: "Chaqaloq karyolasi",
    nameRu: "Детская кроватка",
    price: 1800000,
    image: "/baby-crib-wooden-safe.jpg",
    category: "baby",
    premium: true,
    description: "Yog'och, xavfsiz bo'yoq",
    descriptionRu: "Деревянная, безопасная краска",
  },
  {
    id: "7",
    name: "Muzlatgich LG",
    nameRu: "Холодильник LG",
    price: 5200000,
    image: "/lg-refrigerator-double-door.jpg",
    category: "homeAppliances",
    isPopular: true,
    description: "No Frost, 400L",
    descriptionRu: "No Frost, 400Л",
  },
  {
    id: "8",
    name: "Bolalar mashinasi",
    nameRu: "Детская машинка",
    price: 450000,
    image: "/toy-car-remote-control.jpg",
    category: "toys",
    isNew: true,
    description: "Masofadan boshqariladigan",
    descriptionRu: "На радиоуправлении",
  },
  {
    id: "9",
    name: "Mikroto'lqinli pech",
    nameRu: "Микроволновая печь",
    price: 1500000,
    image: "/microwave-oven-digital.jpg",
    category: "kitchen",
    description: "25L, raqamli boshqaruv",
    descriptionRu: "25Л, цифровое управление",
  },
  {
    id: "10",
    name: "Noutbuk Asus",
    nameRu: "Ноутбук Asus",
    price: 8500000,
    image: "/asus-laptop-gaming.jpg",
    category: "electronics",
    isPopular: true,
    description: "Gaming, 16GB RAM",
    descriptionRu: "Игровой, 16ГБ ОЗУ",
  },
  {
    id: "11",
    name: "Qo'g'irchoq Barbie",
    nameRu: "Кукла Барби",
    price: 320000,
    image: "/barbie-doll-princess.jpg",
    category: "toys",
    description: "Malika libosida",
    descriptionRu: "В платье принцессы",
  },
  {
    id: "12",
    name: "Chaqaloq aravachasi",
    nameRu: "Детская коляска",
    price: 2200000,
    image: "/baby-stroller-modern.jpg",
    category: "baby",
    premium: true,
    description: "3 in 1, yengil",
    descriptionRu: "3 в 1, легкая",
  },
  {
    id: "13",
    name: "Konditsioner Gree",
    nameRu: "Кондиционер Gree",
    price: 3800000,
    originalPrice: 4200000,
    image: "/gree-air-conditioner.jpg",
    category: "homeAppliances",
    hasDiscount: true,
    description: "Inverter, 18000 BTU",
    descriptionRu: "Инвертор, 18000 БТЕ",
  },
  {
    id: "14",
    name: "Konstruktor Technic",
    nameRu: "Конструктор Technic",
    price: 1200000,
    image: "/lego-technic-car.jpg",
    category: "toys",
    isNew: true,
    description: "Mashina modeli, 1000+ qism",
    descriptionRu: "Модель машины, 1000+ деталей",
  },
  {
    id: "15",
    name: "Blender Philips",
    nameRu: "Блендер Philips",
    price: 650000,
    image: "/philips-blender-powerful.jpg",
    category: "kitchen",
    description: "1000W, shisha idish",
    descriptionRu: "1000Вт, стеклянная чаша",
  },
  {
    id: "16",
    name: "Planshet Samsung",
    nameRu: "Планшет Samsung",
    price: 4200000,
    image: "/samsung-tablet-10inch.jpg",
    category: "electronics",
    description: "10.1 dyuym, 64GB",
    descriptionRu: "10.1 дюйм, 64ГБ",
  },
  {
    id: "17",
    name: "Robot o'yinchoq",
    nameRu: "Робот игрушка",
    price: 780000,
    image: "/robot-toy-interactive.jpg",
    category: "toys",
    isPopular: true,
    description: "Interaktiv, ovozli",
    descriptionRu: "Интерактивный, со звуком",
  },
  {
    id: "18",
    name: "Chaqaloq o'rindiq",
    nameRu: "Детское автокресло",
    price: 1600000,
    image: "/baby-car-seat-safe.jpg",
    category: "baby",
    description: "0-18kg, xavfsiz",
    descriptionRu: "0-18кг, безопасное",
  },
  {
    id: "19",
    name: "Changyutgich Dyson",
    nameRu: "Пылесос Dyson",
    price: 3200000,
    originalPrice: 3800000,
    image: "/dyson-vacuum-cordless.jpg",
    category: "homeAppliances",
    hasDiscount: true,
    description: "Simsiz, V8 model",
    descriptionRu: "Беспроводной, модель V8",
  },
  {
    id: "20",
    name: "Puzzle 1000 qism",
    nameRu: "Пазл 1000 деталей",
    price: 180000,
    image: "/puzzle-1000-pieces.jpg",
    category: "toys",
    description: "Tabiat manzarasi",
    descriptionRu: "Пейзаж природы",
  },
  {
    id: "21",
    name: "Elektr choynak",
    nameRu: "Электрочайник",
    price: 420000,
    image: "/electric-kettle-glass.jpg",
    category: "kitchen",
    description: "Shisha, 1.7L",
    descriptionRu: "Стеклянный, 1.7Л",
  },
  {
    id: "22",
    name: "Smartfon iPhone",
    nameRu: "Смартфон iPhone",
    price: 12000000,
    image: "/iphone-latest-model.jpg",
    category: "electronics",
    premium: true,
    description: "Eng yangi model",
    descriptionRu: "Новейшая модель",
  },
  {
    id: "23",
    name: "Bolalar kitoblari",
    nameRu: "Детские книги",
    price: 250000,
    image: "/children-books-set.jpg",
    category: "toys",
    description: "10 kitobli to'plam",
    descriptionRu: "Набор из 10 книг",
  },
  {
    id: "24",
    name: "Chaqaloq monitori",
    nameRu: "Радионяня",
    price: 890000,
    image: "/baby-monitor-video.jpg",
    category: "baby",
    isNew: true,
    description: "Video va audio",
    descriptionRu: "Видео и аудио",
  },
  {
    id: "25",
    name: "Dazmol Tefal",
    nameRu: "Утюг Tefal",
    price: 680000,
    image: "/tefal-iron-steam.jpg",
    category: "homeAppliances",
    description: "Bug'li, keramik",
    descriptionRu: "Паровой, керамика",
  },
  {
    id: "26",
    name: "Lego Friends",
    nameRu: "Лего Френдс",
    price: 950000,
    image: "/lego-friends-house.jpg",
    category: "toys",
    isPopular: true,
    description: "Qizlar uchun uy",
    descriptionRu: "Дом для девочек",
  },
  {
    id: "27",
    name: "Toster Bosch",
    nameRu: "Тостер Bosch",
    price: 520000,
    image: "/bosch-toaster-2slice.jpg",
    category: "kitchen",
    description: "2 bo'lakli, inox",
    descriptionRu: "На 2 ломтика, нержавейка",
  },
  {
    id: "28",
    name: "Quloqchin Sony",
    nameRu: "Наушники Sony",
    price: 1800000,
    image: "/sony-headphones-wireless.jpg",
    category: "electronics",
    description: "Simsiz, shovqin bekor qiluvchi",
    descriptionRu: "Беспроводные, шумоподавление",
  },
  {
    id: "29",
    name: "Futbol to'pi",
    nameRu: "Футбольный мяч",
    price: 320000,
    image: "/football-ball-professional.jpg",
    category: "toys",
    description: "Professional, 5-razmer",
    descriptionRu: "Профессиональный, размер 5",
  },
  {
    id: "30",
    name: "Chaqaloq vannasi",
    nameRu: "Детская ванночка",
    price: 450000,
    image: "/baby-bathtub-ergonomic.jpg",
    category: "baby",
    description: "Ergonomik, plastik",
    descriptionRu: "Эргономичная, пластик",
  },
  {
    id: "31",
    name: "Fen Remington",
    nameRu: "Фен Remington",
    price: 380000,
    image: "/remington-hair-dryer.jpg",
    category: "homeAppliances",
    description: "Ionli, 2000W",
    descriptionRu: "Ионный, 2000Вт",
  },
  {
    id: "32",
    name: "Shaxmat to'plami",
    nameRu: "Шахматный набор",
    price: 280000,
    image: "/chess-set-wooden.jpg",
    category: "toys",
    description: "Yog'och, klassik",
    descriptionRu: "Деревянный, классический",
  },
]

export function ProductGrid() {
  const { t, language } = useLanguage()
  const { searchQuery } = useSearch()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      (language === "uz" ? product.name : product.nameRu).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === "uz" ? product.description : product.descriptionRu)
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: "all", name: "Barchasi", nameRu: "Все" },
    { id: "homeAppliances", name: "Uy jihozlari", nameRu: "Бытовая техника" },
    { id: "toys", name: "O'yinchoqlar", nameRu: "Игрушки" },
    { id: "kitchen", name: "Oshxona", nameRu: "Кухня" },
    { id: "electronics", name: "Elektronika", nameRu: "Электроника" },
    { id: "baby", name: "Chaqaloq", nameRu: "Детские товары" },
  ]

  const featuredProducts = filteredProducts.slice(0, 6)
  const regularProducts = filteredProducts.slice(6)

  if (isLoading) {
    return (
      <div className="py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-20 bg-muted animate-pulse rounded-full"></div>
              ))}
            </div>
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
              <div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <div className="aspect-[4/3] bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                    <div className="h-6 bg-muted animate-pulse rounded w-1/2"></div>
                    <div className="h-10 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
              <div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <div className="aspect-[4/3] bg-muted animate-pulse"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-muted animate-pulse rounded w-3/4"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                    <div className="h-8 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (searchQuery) {
    return (
      <div className="py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-balance">{t("searchResults")}</h2>
            <Badge variant="secondary" className="text-xs w-fit">
              {filteredProducts.length} {language === "uz" ? "mahsulot topildi" : "товаров найдено"}
            </Badge>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground text-base sm:text-lg">{t("noResults")}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                {language === "uz" ? "Boshqa kalit so'zlar bilan qidiring" : "Попробуйте другие ключевые слова"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} size="small" />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 space-y-8 sm:space-y-10 lg:space-y-12">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-slate-900 dark:text-white shadow-md scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-102"
                }`}
              >
                {language === "uz" ? category.name : category.nameRu}
              </button>
            ))}
          </div>
        </div>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-balance">{t("recommended")}</h2>
            <Badge variant="secondary" className="text-xs w-fit">
              {featuredProducts.length} {language === "uz" ? "mahsulot" : "товаров"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} size="normal" />
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-balance">{t("popular")}</h2>
            <Badge variant="secondary" className="text-xs w-fit">
              {regularProducts.length} {language === "uz" ? "mahsulot" : "товаров"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4">
            {regularProducts.slice(0, 26).map((product) => (
              <ProductCard key={product.id} product={product} size="small" />
            ))}
          </div>
        </section>

        {regularProducts.length > 26 && (
          <div className="text-center pt-4 sm:pt-6">
            <button className="px-6 py-3 text-primary hover:text-primary/80 font-medium text-sm sm:text-base transition-colors duration-200 hover:bg-primary/5 rounded-lg">
              {language === "uz" ? "Ko'proq yuklash" : "Загрузить еще"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
