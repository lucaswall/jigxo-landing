"use client"

import { useState, useEffect } from "react"
import { type TiendaNubeStore, mockStore } from "@/utils/tiendanube-mock"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface PageCustomizerProps {
  onCustomizationChange: (customization: PageCustomization) => void
  initialCustomization?: PageCustomization
}

export interface PageCustomization {
  title: string
  description: string
  logo: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  showTimer: boolean
  timerEndDate?: Date
  showBadges: boolean
  badgeText: string
  showOriginalPrices: boolean
}

export default function PageCustomizer({ onCustomizationChange, initialCustomization }: PageCustomizerProps) {
  const [storeData, setStoreData] = useState<TiendaNubeStore>(mockStore)
  const [customization, setCustomization] = useState<PageCustomization>(
    initialCustomization || {
      title: "Productos Exclusivos",
      description: "Accede a estos productos exclusivos antes que nadie. Oferta por tiempo limitado.",
      logo: storeData.logo,
      colors: { ...storeData.colors },
      showTimer: true,
      timerEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      showBadges: true,
      badgeText: "Exclusivo",
      showOriginalPrices: true,
    },
  )

  useEffect(() => {
    // In a real app, this would fetch the store data from Tienda Nube API
    // For now, we'll use the mock data
    setStoreData(mockStore)
  }, [])

  useEffect(() => {
    onCustomizationChange(customization)
  }, [customization, onCustomizationChange])

  const handleColorChange = (colorKey: keyof PageCustomization["colors"], value: string) => {
    setCustomization({
      ...customization,
      colors: {
        ...customization.colors,
        [colorKey]: value,
      },
    })
  }

  const resetToStoreColors = () => {
    setCustomization({
      ...customization,
      colors: { ...storeData.colors },
    })
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="colors">Colores</TabsTrigger>
        <TabsTrigger value="features">Características</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="page-title">Título de la página</Label>
          <Input
            id="page-title"
            value={customization.title}
            onChange={(e) => setCustomization({ ...customization, title: e.target.value })}
            placeholder="Ej: Productos Exclusivos"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="page-description">Descripción</Label>
          <Textarea
            id="page-description"
            value={customization.description}
            onChange={(e) => setCustomization({ ...customization, description: e.target.value })}
            placeholder="Describe brevemente esta colección exclusiva..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="page-logo">Logo (URL)</Label>
          <div className="flex gap-2">
            <Input
              id="page-logo"
              value={customization.logo}
              onChange={(e) => setCustomization({ ...customization, logo: e.target.value })}
              placeholder="URL del logo"
            />
            <Button variant="outline" onClick={() => setCustomization({ ...customization, logo: storeData.logo })}>
              Restaurar
            </Button>
          </div>
          <div className="mt-2 p-4 bg-gray-50 rounded-md flex justify-center">
            <div className="relative h-16 w-64">
              <Image
                src={customization.logo || "/placeholder.svg"}
                alt="Logo preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="colors" className="space-y-4 pt-4">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={resetToStoreColors}>
            Restaurar colores de la tienda
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            label="Color primario"
            value={customization.colors.primary}
            onChange={(value) => handleColorChange("primary", value)}
          />
          <ColorPicker
            label="Color secundario"
            value={customization.colors.secondary}
            onChange={(value) => handleColorChange("secondary", value)}
          />
          <ColorPicker
            label="Color de acento"
            value={customization.colors.accent}
            onChange={(value) => handleColorChange("accent", value)}
          />
          <ColorPicker
            label="Color de fondo"
            value={customization.colors.background}
            onChange={(value) => handleColorChange("background", value)}
          />
          <ColorPicker
            label="Color de texto"
            value={customization.colors.text}
            onChange={(value) => handleColorChange("text", value)}
          />
        </div>

        <div className="mt-4 p-4 rounded-md" style={{ backgroundColor: customization.colors.background }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: customization.colors.text }}>
            Vista previa de colores
          </h3>
          <div className="flex gap-2">
            <Button style={{ backgroundColor: customization.colors.primary, color: "#fff" }}>Botón primario</Button>
            <Button
              variant="outline"
              style={{
                borderColor: customization.colors.secondary,
                color: customization.colors.secondary,
              }}
            >
              Botón secundario
            </Button>
          </div>
          <div className="mt-2 p-2 rounded-md" style={{ backgroundColor: customization.colors.accent, color: "#fff" }}>
            Elemento de acento
          </div>
        </div>
      </TabsContent>

      <TabsContent value="features" className="space-y-4 pt-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Mostrar temporizador de cuenta regresiva</h3>
                <p className="text-sm text-gray-500">Muestra un temporizador que indica cuándo finaliza la oferta</p>
              </div>
              <Switch
                checked={customization.showTimer}
                onCheckedChange={(checked) => setCustomization({ ...customization, showTimer: checked })}
              />
            </div>

            {customization.showTimer && (
              <div className="ml-6 mt-2">
                <Label htmlFor="timer-end-date">Fecha de finalización</Label>
                <Input
                  id="timer-end-date"
                  type="datetime-local"
                  value={customization.timerEndDate ? customization.timerEndDate.toISOString().slice(0, 16) : ""}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined
                    setCustomization({ ...customization, timerEndDate: date })
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Mostrar etiquetas en productos</h3>
                <p className="text-sm text-gray-500">Muestra etiquetas destacadas en los productos</p>
              </div>
              <Switch
                checked={customization.showBadges}
                onCheckedChange={(checked) => setCustomization({ ...customization, showBadges: checked })}
              />
            </div>

            {customization.showBadges && (
              <div className="ml-6 mt-2">
                <Label htmlFor="badge-text">Texto de la etiqueta</Label>
                <Input
                  id="badge-text"
                  value={customization.badgeText}
                  onChange={(e) => setCustomization({ ...customization, badgeText: e.target.value })}
                  placeholder="Ej: Exclusivo"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Mostrar precios originales</h3>
                <p className="text-sm text-gray-500">
                  Muestra los precios originales tachados junto a los precios con descuento
                </p>
              </div>
              <Switch
                checked={customization.showOriginalPrices}
                onCheckedChange={(checked) => setCustomization({ ...customization, showOriginalPrices: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[40px] h-[40px] p-0 border-2", value === "#000000" && "border-gray-400")}
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-5 gap-2">
              {[
                "#FF6B6B",
                "#FF8E53",
                "#FFDA83",
                "#BAFF8A",
                "#8AE9FF",
                "#FF8AE9",
                "#D78AFF",
                "#8A94FF",
                "#8AFFCB",
                "#FFFFFF",
                "#E74C3C",
                "#E67E22",
                "#F1C40F",
                "#2ECC71",
                "#3498DB",
                "#9B59B6",
                "#34495E",
                "#1ABC9C",
                "#95A5A6",
                "#000000",
              ].map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  className={cn(
                    "w-full h-8 p-0 border-2",
                    value === color && "ring-2 ring-primary",
                    color === "#FFFFFF" && "border-gray-200",
                    color === "#000000" && "border-gray-400",
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                />
              ))}
            </div>
            <div className="flex items-center mt-4">
              <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
              <div className="w-8 h-8 ml-2 border rounded" style={{ backgroundColor: value }} />
            </div>
          </PopoverContent>
        </Popover>
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
      </div>
    </div>
  )
}

