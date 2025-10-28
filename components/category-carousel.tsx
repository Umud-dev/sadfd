"use client"

import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Category {
  id: string
  nameKey: string
  icon: string
  color: string
  isNew?: boolean
  hasDiscount?: boolean
}

const categories: Category[] = [
  {
    id: "discounts",
    nameKey: "discounts",
    icon: "/discount-sale-percentage-icon.jpg",
    color: "bg-red-500",
    hasDiscount: true,
  },
  {
    id: "new",
    nameKey: "new",
    icon: "/new-arrival-star-badge-icon.jpg",
    color: "bg-primary",
    isNew: true,
  },
  {
    id: "homeAppliances",
    nameKey: "homeAppliances",
    icon: "/home-appliances-washing-machine-icon.jpg",
    color: "bg-blue-500",
  },
  {
    id: "toys",
    nameKey: "toys",
    icon: "/children-toys-teddy-bear-icon.jpg",
    color: "bg-pink-500",
  },
  {
    id: "kitchen",
    nameKey: "kitchen",
    icon: "/kitchen-utensils-cookware-icon.jpg",
    color: "bg-orange-500",
  },
  {
    id: "electronics",
    nameKey: "electronics",
    icon: "/electronics-smartphone-gadget-icon.jpg",
    color: "bg-purple-500",
  },
  {
    id: "furniture",
    nameKey: "furniture",
    icon: "/furniture-sofa-chair-icon.jpg",
    color: "bg-green-500",
  },
  {
    id: "decor",
    nameKey: "decor",
    icon: "/home-decor-vase-plant-icon.jpg",
    color: "bg-yellow-500",
  },
  {
    id: "baby",
    nameKey: "baby",
    icon: "/baby-products-bottle-icon.jpg",
    color: "bg-indigo-500",
  },
]

export function CategoryCarousel() {
  const { t } = useLanguage()

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary/20 transition-colors">
                    <img
                      src={category.icon || "/placeholder.svg"}
                      alt={t(category.nameKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Badges */}
                  {category.isNew && (
                    <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 h-5 bg-primary text-white shadow-sm">
                      NEW
                    </Badge>
                  )}
                  {category.hasDiscount && (
                    <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 h-5 bg-red-500 text-white">%</Badge>
                  )}
                </div>

                <span className="text-xs font-medium text-center max-w-[4rem] text-balance">{t(category.nameKey)}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </section>
  )
}
