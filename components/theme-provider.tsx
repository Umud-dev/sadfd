"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="system"
      enableSystem={true}
      attribute="class"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}
