"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Calculator,
  BookOpen,
  Video,
  Users,
  TrendingUp,
  Clock,
  ExternalLink,
  Newspaper,
} from "lucide-react"
import Link from "next/link"
import { ProPortalLoginModal } from "@/components/pro-portal-login-modal"

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProPortalClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Broker Resources</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Resources & Tools</h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Everything you need to succeed as a mortgage broker partner. From rate sheets to training materials, we've
              got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access Tools</h2>
            <p className="text-xl text-gray-600">Essential tools for your daily operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Current Rate Sheet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Today's competitive rates and pricing</p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Loan Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Calculate payments and scenarios</p>
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                  Open Calculator
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Application Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Download required forms and documents</p>
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                  View Forms
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>PRO Portal Login</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Access your loan management platform</p>
                <Button
                  onClick={handleProPortalClick}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold shadow-lg"
                >
                  🚀 Login to PRO Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resource Library</h2>
            <p className="text-xl text-gray-600">Comprehensive resources to help you grow your business</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Training & Education */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-red-600" />
                  Training & Education
                </CardTitle>
                <CardDescription>Enhance your skills and stay current with industry trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">PRO Portal Training Videos</h4>
                    <p className="text-sm text-gray-600">Step-by-step platform tutorials</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Webinar Series</h4>
                    <p className="text-sm text-gray-600">Monthly industry updates and training</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Compliance Updates</h4>
                    <p className="text-sm text-gray-600">Latest regulatory changes</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Materials */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-red-600" />
                  Marketing Materials
                </CardTitle>
                <CardDescription>Professional materials to help you market our services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Product Flyers</h4>
                    <p className="text-sm text-gray-600">Customizable loan product sheets</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Logo & Brand Assets</h4>
                    <p className="text-sm text-gray-600">UFF logos and brand guidelines</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Social Media Kit</h4>
                    <p className="text-sm text-gray-600">Ready-to-post social content</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-red-600" />
                  Documentation
                </CardTitle>
                <CardDescription>Forms, guidelines, and reference materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Loan Program Guidelines</h4>
                    <p className="text-sm text-gray-600">Detailed program requirements</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Underwriting Guidelines</h4>
                    <p className="text-sm text-gray-600">Complete underwriting standards</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Broker Agreement</h4>
                    <p className="text-sm text-gray-600">Partnership terms and conditions</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tools & Calculators */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-red-600" />
                  Tools & Calculators
                </CardTitle>
                <CardDescription>Interactive tools to help your clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Mortgage Calculator</h4>
                    <p className="text-sm text-gray-600">Payment and amortization calculator</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Tool
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Affordability Calculator</h4>
                    <p className="text-sm text-gray-600">How much house can they afford?</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Tool
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Refinance Calculator</h4>
                    <p className="text-sm text-gray-600">Should they refinance?</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Need Additional Resources?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help you access the resources you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                onClick={handleProPortalClick}
                variant="outline"
                size="lg"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Access PRO Portal
              </Button>
            </div>

            {/* Additional PRO Portal CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-red-800 mb-2">🎯 Quick Access</h3>
                <p className="text-red-700 mb-4">Jump straight to your PRO Portal dashboard</p>
                <Button
                  onClick={handleProPortalClick}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Login Now →
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
