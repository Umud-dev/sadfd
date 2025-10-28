"use client"

import { HeroSection } from "@/components/hero-section"
import { CategoryCarousel } from "@/components/category-carousel"
import { ProductGrid } from "@/components/product-grid"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FloatingActionButton } from "@/components/floating-action-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-32">
        <HeroSection />
        <CategoryCarousel />
        <ProductGrid />
      </main>
      <BottomNavigation />
      <FloatingActionButton />
    </div>
  )
}
