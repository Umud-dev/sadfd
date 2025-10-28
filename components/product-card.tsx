"use client"

import { useState } from "react"
import { Heart, Plus, Minus, ImageOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"

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
  spicy?: boolean
  vegetarian?: boolean
}

interface ProductCardProps {
  product: Product
  size?: "small" | "normal"
}

export function ProductCard({ product, size = "normal" }: ProductCardProps) {
  const { t, language } = useLanguage()
  const { addToCart, getItemQuantity } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const quantity = getItemQuantity(product.id)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: language === "uz" ? product.name : product.nameRu,
      price: product.price,
      image: product.image,
    })
  }

  const cardClasses =
    "bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden group hover:shadow-lg hover:border-primary/20 transition-all duration-300 w-full"

  const imageClasses =
    size === "small"
      ? "relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10"
      : "relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10"

  const paddingClasses = size === "small" ? "p-3 space-y-2" : "p-4 space-y-3"

  return (
    <div className={cardClasses}>
      {/* Product Image */}
      <div className={imageClasses}>
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <div className="text-xs text-muted-foreground text-center px-2">
              {language === "uz" ? "Rasm yuklanmoqda..." : "Загрузка изображения..."}
            </div>
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center text-muted-foreground">
            <ImageOff className="w-8 h-8 mb-2 text-muted-foreground/60" />
            <span className="text-xs text-center px-2 mb-2">
              {language === "uz" ? "Rasm yuklanmadi" : "Изображение не загружено"}
            </span>
            <button
              onClick={() => {
                setImageError(false)
                setImageLoading(true)
              }}
              className="text-xs text-primary hover:text-primary/80 underline"
            >
              {language === "uz" ? "Qayta urinish" : "Повторить"}
            </button>
          </div>
        ) : (
          <img
            src={product.image || "/placeholder.svg"}
            alt={language === "uz" ? product.name : product.nameRu}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
              imageLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"
            }`}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false)
              setImageError(true)
            }}
          />
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.hasDiscount && (
            <Badge className="bg-red-600 text-white font-bold text-xs px-2 py-1 rounded-full shadow-lg">
              -{discountPercentage}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground font-bold text-xs px-2 py-1 rounded-full shadow-lg">
              {language === "uz" ? "YANGI" : "НОВОЕ"}
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-orange-600 text-white font-bold text-xs px-2 py-1 rounded-full shadow-lg">
              {language === "uz" ? "MASHHUR" : "ПОПУЛЯРНОЕ"}
            </Badge>
          )}
        </div>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-400"}`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className={paddingClasses}>
        {/* Product Name */}
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {language === "uz" ? product.name : product.nameRu}
        </h3>

        {/* Price Display */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-lg text-foreground">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground font-medium">{language === "uz" ? "so'm" : "сум"}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 dark:text-slate-400 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Section */}
        {quantity === 0 ? (
          <Button
            onClick={handleAddToCart}
            className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("addToCart")}
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-muted rounded-xl border border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                /* Remove from cart logic */
              }}
              className="h-8 w-8 p-0 rounded-lg hover:bg-muted-foreground/10 transition-colors"
            >
              <Minus className="w-4 h-4 text-foreground" />
            </Button>
            <span className="font-bold text-base text-foreground min-w-[2rem] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddToCart}
              className="h-8 w-8 p-0 rounded-lg hover:bg-muted-foreground/10 transition-colors"
            >
              <Plus className="w-4 h-4 text-foreground" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
