"use client"

import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useSearch } from "@/components/search-provider"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"

export function Header() {
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch()
  const { t } = useLanguage()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [localQuery, setSearchQuery])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setLocalQuery("")
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MS</span>
          </div>
          <span className="font-bold text-lg">Mini Shop</span>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-200">
              <Input
                type="text"
                placeholder={t("searchProducts")}
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-48 h-8"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
              <Search className="h-4 w-4" />
            </Button>
          )}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
