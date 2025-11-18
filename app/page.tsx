"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, TrendingUp, CheckCircle, Star } from 'lucide-react'
import Link from "next/link"
import { ProPortalLoginModal } from "@/components/pro-portal-login-modal"

const heroSlides = [
  {
    id: 1,
    background: "/professional-mortgage-broker-meeting-with-happy-cl.jpg",
    tagline: "Trusted by Mortgage Professionals Nationwide",
    headline: "Your Gateway to Faster Closings and Better Rates",
    subheadline: "Partner with UFF for competitive rates, fast closings, and comprehensive loan solutions. Access our PRO Portal for seamless loan management.",
  },
  {
    id: 2,
    background: "/diverse-team-of-mortgage-professionals-collaborati.jpg",
    tagline: "Leading the Industry Since 2010",
    headline: "Build Your Success with America's Fastest Growing Wholesale Lender",
    subheadline: "Join 500+ broker partners who trust UFF for competitive pricing, cutting-edge technology, and unmatched support.",
  },
  {
    id: 3,
    background: "/modern-business-handshake-partnership-deal-mortgag.jpg",
    tagline: "Innovation Meets Excellence",
    headline: "Close More Deals with Our Advanced PRO Portal Technology",
    subheadline: "Streamline your workflow with instant rate quotes, real-time status updates, and 24/7 support that keeps your business moving.",
  },
  {
    id: 4,
    background: "/happy-family-receiving-house-keys-from-mortgage-br.jpg",
    tagline: "Your Success is Our Mission",
    headline: "Turn More Applications into Funded Loans",
    subheadline: "With 15-day average closings, flexible loan programs, and dedicated support, we help you win more business and grow your pipeline.",
  },
]

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleProPortalClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Now with rotating content */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide.background}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />
        ))}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/70 via-red-500/70 to-red-700/70" />
        
        {/* Content - Now dynamically updating based on current slide */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge 
              key={`badge-${currentSlide}`}
              className="mb-6 bg-white/20 text-white border-white/30 animate-in fade-in slide-in-from-top-4 duration-700"
            >
              {currentHero.tagline}
            </Badge>
            
            <h1 
              key={`headline-${currentSlide}`}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              {currentHero.headline}
            </h1>
            
            <p 
              key={`subheadline-${currentSlide}`}
              className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            >
              {currentHero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 text-lg px-8 py-3">
                <Link href="/get-approved">
                  Get Approved Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/pro-portal">Explore PRO Portal</Link>
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Fancy PRO Portal Login CTA */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-white/90 mb-2">Already a partner?</p>
                  <Button
                    onClick={handleProPortalClick}
                    className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🚀 Login to PRO Portal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">$10B+</div>
              <div className="text-gray-600">Loans Funded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Broker Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">15</div>
              <div className="text-gray-600">Day Average Close</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Loan Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a full spectrum of loan products to meet your clients' diverse needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-red-600" />
                  Conventional Loans
                </CardTitle>
                <CardDescription>Traditional financing with competitive rates and flexible terms</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Down payments as low as 3%
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Loan amounts up to $806,500 (2025 conforming)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Fixed and adjustable rates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-red-600" />
                  FHA Loans
                </CardTitle>
                <CardDescription>Government-backed loans for first-time and repeat buyers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Down payments as low as 3.5%
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Flexible credit requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Gift funds allowed
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-red-600" />
                  VA Loans
                </CardTitle>
                <CardDescription>Exclusive benefits for military veterans and active duty</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No down payment required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No private mortgage insurance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Competitive interest rates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                  USDA Loans
                </CardTitle>
                <CardDescription>Rural development loans for eligible properties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    100% financing available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Below-market interest rates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Rural and suburban eligible
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-red-600" />
                  Non-QM Loans
                </CardTitle>
                <CardDescription>Alternative documentation for unique borrower situations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Bank statement programs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Asset-based lending
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Self-employed friendly
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-center">Ready to Get Started?</CardTitle>
                <CardDescription className="text-center">Join hundreds of successful mortgage brokers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/loan-products">
                    View All Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PRO Portal CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Experience the Power of PRO Portal</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our proprietary platform streamlines your entire loan process from application to closing
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Process loans in minutes, not hours</p>
              </div>
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-400">Bank-level security for all transactions</p>
              </div>
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-400">Dedicated support when you need it</p>
              </div>
            </div>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
              <Link href="/pro-portal">
                Learn More About PRO Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* PRO Portal Login CTA */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Ready to get started?</p>
                  <p className="text-gray-300 text-sm">Access your PRO Portal account</p>
                </div>
                <Button
                  onClick={handleProPortalClick}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg"
                >
                  Login to PRO →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
