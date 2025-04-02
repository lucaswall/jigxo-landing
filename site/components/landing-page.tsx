"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignupModal } from "@/components/signup-modal"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openSignupModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Signup Modal */}
      <SignupModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      {/* Navbar - Fixed container width to match content */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/images/jigxo-logo.png" alt="Jigxo" width={300} height={100} className="h-24 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={openSignupModal}
            >
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Corrected gradient direction with more white */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 mb-8 overflow-hidden rounded-b-[32px]">
        {/* Background with diagonal gradient fade - white in bottom right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 40%, rgba(185, 131, 255, 0.4) 70%, #7366f0 100%)",
          }}
        ></div>

        {/* Light blue accent in bottom right */}
        <div
          className="absolute bottom-0 right-0 w-1/3 h-1/3"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(116, 185, 255, 0.2) 100%)",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 p-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900">
                <span className="font-bold block mb-2">Entendé y retené</span>
                <span className="font-normal">a más clientes de tu Tiendanube</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-800 mt-6">
                Más del 70% de las marcas de ecommerce pierden clientes y enfrentan dificultades para lograr la
                recurrencia por no contar con una estrategia clara. Con Jigxo, podés formar parte del 30% que lo logra,
                ¡sin necesidad de un equipo de marketing!
              </p>

              <div className="flex justify-center lg:justify-start mt-8">
                <button
                  className="bg-gradient-to-r from-[#6c5ce7] via-[#8c7ae6] to-[#f765a3] hover:shadow-lg text-white px-10 py-4 text-lg font-medium rounded-full shadow-md transform transition-all duration-300 hover:scale-105"
                  onClick={openSignupModal}
                >
                  CONECTÁ TU TIENDA NUBE
                </button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0 flex justify-center">
              <Image
                src="/images/computer.png"
                alt="Dashboard de análisis de clientes"
                width={600}
                height={400}
                className="w-full h-auto max-w-lg transform transition-all duration-500 hover:-translate-y-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Comparison between average and successful stores */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Lo que hacen las marcas que más venden...{" "}
            <span className="block mt-2">podés hacerlo vos también con Jigxo</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
            {/* Left column: La mayoría de las tiendas */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-full flex flex-col">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-red-500 mr-2">🚫</span> La mayoría de las tiendas:
              </h4>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <span>
                    Tienen <strong>solo 20-30% de clientes recurrentes</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <span>Gastan mucho en adquirir, pero no retienen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <span>No conocen a su clientela actual</span>
                </li>
              </ul>
            </div>

            {/* Right column: Las más exitosas */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-full flex flex-col">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-blue-500 mr-2">🚀</span> Las más exitosas:
              </h4>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <span>
                    Más del <strong>50% de las ventas vienen de clientes existentes</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <span>Tienen claro quién compra, cuánto y cada cuánto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✔</span>
                  <span>Aplican estrategias que solo equipos expertos suelen usar</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom full-width: With Jigxo */}
          <div className="bg-gradient-to-r from-[#6c5ce7]/10 via-[#8c7ae6]/10 to-[#f765a3]/10 p-8 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-6 flex items-center justify-center">
              <span className="text-blue-500 mr-2">💡</span> Con Jigxo podés:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1 text-xl">→</span>
                  <span>Identificar automáticamente tus mejores clientes y los que están en riesgo</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1 text-xl">→</span>
                  <span>Enviar mensajes personalizados según el comportamiento de cada cliente</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1 text-xl">→</span>
                  <span>Aumentar la retención y el valor de vida del cliente sin complicaciones</span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-lg text-center italic">Jigxo te da esa ventaja. Sin fricción, sin equipo.</p>
          </div>
        </div>
      </section>

      {/* Features Section - Using the same container width */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Conocé a tus clientes como nunca antes</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Jigxo analiza tu Tienda Nube con inteligencia proprietaria y te muestra quiénes son tu clientes más
            valiosos, cuales están por irse y como recuperarlos. Sin esfuerzo. Automágicamente.
          </p>
          <Button
            className="bg-[#6c5ce7] hover:bg-[#5b4bc7] text-white px-8 py-6 text-lg rounded-md mx-auto"
            onClick={openSignupModal}
          >
            Conectar mi Tiendanube
          </Button>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-16 mx-4 sm:mx-6 lg:mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Segmentos automáticos listos para usar, basados en el modelo RFM
          </h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#6c5ce7] flex items-center justify-center mt-1">
                <span className="text-white text-sm">•</span>
              </div>
              <span className="ml-3 text-lg text-gray-700">Quiénes son tus clientes VIP</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#6c5ce7] flex items-center justify-center mt-1">
                <span className="text-white text-sm">•</span>
              </div>
              <span className="ml-3 text-lg text-gray-700">Quiénes están a punto de abandonarte</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#6c5ce7] flex items-center justify-center mt-1">
                <span className="text-white text-sm">•</span>
              </div>
              <span className="ml-3 text-lg text-gray-700">Quiénes solo compran si hay descuento</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#6c5ce7] flex items-center justify-center mt-1">
                <span className="text-white text-sm">•</span>
              </div>
              <span className="ml-3 text-lg text-gray-700">Y muchos más...</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 text-center mb-8">
            Jigxo arma el modelo RFM para vos (que es utilizado por los grandes ecommerces). Clusteriza tu clientela, te
            da las métricas clave para mejorar la rentabilidad de cada segmento y ayuda a potenciar la fidelidad de tu
            clientela.
          </p>
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="w-full flex flex-col items-center justify-center">
                <Image
                  src="/images/customer-segmentation.png"
                  alt="Segmentación de clientes"
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md mb-6"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Segmentación automática de clientes</h3>
                  <p className="text-gray-600">
                    Identifica fácilmente tus clientes más valiosos y los que están en riesgo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Por qué importa</h3>
          <ul className="space-y-6 mb-12">
            <li className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#6c5ce7] flex items-center justify-center mb-4 md:mb-0">
                <span className="text-white text-lg">1</span>
              </div>
              <div className="md:ml-4">
                <p className="text-lg font-semibold text-gray-900">Vendé más:</p>
                <p className="text-lg text-gray-700">enfocándote en quienes más gastan.</p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#6c5ce7] flex items-center justify-center mb-4 md:mb-0">
                <span className="text-white text-lg">2</span>
              </div>
              <div className="md:ml-4">
                <p className="text-lg font-semibold text-gray-900">Reducí el abandono:</p>
                <p className="text-lg text-gray-700">recupera a los que casi se van.</p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#6c5ce7] flex items-center justify-center mb-4 md:mb-0">
                <span className="text-white text-lg">3</span>
              </div>
              <div className="md:ml-4">
                <p className="text-lg font-semibold text-gray-900">Usá tu tiempo mejor:</p>
                <p className="text-lg text-gray-700">campañas listas para lanzar según cada tipo de cliente.</p>
              </div>
            </li>
          </ul>

          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-xl italic text-gray-800 mb-4">
              "Con Jigxo entendí de verdad quiénes me compran. Ya no mando descuentos a ciegas"
            </p>
            <p className="text-gray-600">— Usuario de Tiendanube feliz</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Using the same container width */}
      <section className="py-16 md:py-24 bg-[#6c5ce7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ahora podés implementar estrategias que solo las grandes marcas con equipos de marketing de primer nivel
            pueden ejecutar.
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Empezá hoy a retener más clientes.</p>
          <Button
            className="bg-white text-[#6c5ce7] hover:bg-gray-100 px-8 py-6 text-lg rounded-md"
            onClick={openSignupModal}
          >
            CONECTÁ TU TIENDA NUBE
          </Button>
        </div>
      </section>

      {/* Footer - Using the same container width */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Image
                src="/images/jigxo-logo.png"
                alt="Jigxo"
                width={200}
                height={70}
                className="h-20 w-auto mb-4 invert"
              />
              <p className="text-gray-400">Simplificando el marketing para tiendas online.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white" onClick={openSignupModal}>
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white" onClick={openSignupModal}>
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white" onClick={openSignupModal}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white" onClick={openSignupModal}>
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white" onClick={openSignupModal}>
                    Términos de servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white" onClick={openSignupModal}>
                    Política de privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Jigxo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

