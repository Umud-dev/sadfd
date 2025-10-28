"use client"

import { ShoppingBag, Plus, Minus, Trash2, CreditCard, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/components/cart-provider"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { formatPrice } from "@/lib/utils"
import { useState } from "react"

export default function CartPage() {
  const { t, language } = useLanguage()
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart()
  const [selectedPayment, setSelectedPayment] = useState<"full" | "3" | "6" | "12">("full")

  const total = getTotalPrice()

  const calculateInstallmentPrice = (basePrice: number, months: number) => {
    const percentages = { 3: 10, 6: 20, 12: 44 }
    const percentage = percentages[months as keyof typeof percentages] || 0
    return basePrice + (basePrice * percentage) / 100
  }

  const getPaymentTotal = () => {
    if (selectedPayment === "full") return total
    const months = Number.parseInt(selectedPayment)
    return calculateInstallmentPrice(total, months)
  }

  const getMonthlyPayment = () => {
    if (selectedPayment === "full") return total
    const months = Number.parseInt(selectedPayment)
    return getPaymentTotal() / months
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-32">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{t("cart")}</h1>
                <p className="text-sm text-muted-foreground">
                  {items.length} {language === "uz" ? "mahsulot" : "товаров"}
                </p>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("cartEmpty")}</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                {language === "uz"
                  ? "Savatchangiz bo'sh. Mahsulotlarni qo'shishni boshlang va xaridingizni davom ettiring."
                  : "Ваша корзина пуста. Начните добавлять товары и продолжите покупки."}
              </p>
              <Button size="lg" className="px-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "uz" ? "Xarid qilishni boshlash" : "Начать покупки"}
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">
                  {language === "uz" ? "Savatdagi mahsulotlar" : "Товары в корзине"}
                </h2>
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-2 line-clamp-2">
                            {language === "uz" ? item.name : item.nameRu}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(item.price)} {t("sum")}
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center bg-muted rounded-xl overflow-hidden">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-10 w-10 p-0 hover:bg-background"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="px-4 py-2 text-sm font-semibold min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-10 w-10 p-0 hover:bg-background"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-10 w-10 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 border-t bg-muted/30">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {language === "uz" ? "Mahsulot jami:" : "Итого за товар:"}
                          </span>
                          <span className="font-semibold">
                            {formatPrice(item.price * item.quantity)} {t("sum")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg">{language === "uz" ? "To'lov usuli" : "Способ оплаты"}</h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        {language === "uz" ? "Qulay to'lov usulini tanlang" : "Выберите удобный способ оплаты"}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPayment === "full"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:bg-muted/50 hover:border-muted-foreground/20"
                    }`}
                    onClick={() => setSelectedPayment("full")}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-base">
                          {language === "uz" ? "To'liq to'lov" : "Полная оплата"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === "uz" ? "Bir marta to'lash, chegirma bilan" : "Единовременная оплата со скидкой"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(total)} {t("sum")}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          {language === "uz" ? "Eng tejamkor" : "Самый выгодный"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {[
                    { months: 3, percentage: 10 },
                    { months: 6, percentage: 20 },
                    { months: 12, percentage: 44 },
                  ].map(({ months, percentage }) => (
                    <div
                      key={months}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedPayment === months.toString()
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:bg-muted/50 hover:border-muted-foreground/20"
                      }`}
                      onClick={() => setSelectedPayment(months.toString())}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-base">
                            {months} {language === "uz" ? "oylik" : "месяцев"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            +{percentage}% {language === "uz" ? "ustama to'lov" : "переплата"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {formatPrice(getMonthlyPayment())} {t("sum")}
                            <span className="text-sm font-normal">/{language === "uz" ? "oy" : "мес"}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === "uz" ? "Jami:" : "Итого:"}{" "}
                            {formatPrice(calculateInstallmentPrice(total, months))} {t("sum")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-card/95 backdrop-blur-sm border-t shadow-lg">
          <div className="container mx-auto px-4 py-4 max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-lg font-semibold">{t("total")}:</span>
                {selectedPayment !== "full" && (
                  <p className="text-sm text-muted-foreground">
                    {selectedPayment} {language === "uz" ? "oylik to'lov rejasi" : "месячный план оплаты"}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  {selectedPayment === "full" ? formatPrice(total) : formatPrice(getMonthlyPayment())} {t("sum")}
                  {selectedPayment !== "full" && <span className="text-base">/{language === "uz" ? "oy" : "мес"}</span>}
                </span>
                {selectedPayment !== "full" && (
                  <p className="text-sm text-muted-foreground">
                    {language === "uz" ? "Umumiy summa:" : "Общая сумма:"} {formatPrice(getPaymentTotal())} {t("sum")}
                  </p>
                )}
              </div>
            </div>
            <Button className="w-full h-12 text-base font-semibold" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              {selectedPayment === "full"
                ? language === "uz"
                  ? "Buyurtmani rasmiylashtirish"
                  : "Оформить заказ"
                : `${language === "uz" ? "Bo'lib to'lashni rasmiylashtirish" : "Оформить рассрочку"} (${selectedPayment} ${language === "uz" ? "oy" : "мес"})`}
            </Button>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}
