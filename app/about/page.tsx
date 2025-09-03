"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ProPortalLoginModal } from "@/components/pro-portal-login-modal"

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProPortalClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-600 text-white">Our Story</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">United Fidelity Funding Corp</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Empowering mortgage professionals with innovative solutions, competitive rates, and unparalleled service
              since our founding.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To be the premier wholesale mortgage lender that mortgage brokers trust and rely on for exceptional
                service, competitive pricing, and innovative technology solutions. We envision a future where every
                mortgage professional has access to the tools and support they need to grow their business and serve
                their clients with excellence.
              </p>
              <div className="flex items-center gap-4 p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
                <Eye className="h-8 w-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Looking Forward</h3>
                  <p className="text-gray-600">
                    We're constantly innovating to stay ahead of industry trends and provide cutting-edge solutions for
                    our broker partners.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-red-600" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To provide mortgage brokers with comprehensive loan solutions, advanced technology, and exceptional
                    support that enables them to close more loans faster while delivering superior service to their
                    borrowers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-red-600" />
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • <strong>Integrity:</strong> Honest, transparent business practices
                    </li>
                    <li>
                      • <strong>Excellence:</strong> Commitment to superior service quality
                    </li>
                    <li>
                      • <strong>Innovation:</strong> Embracing technology for better solutions
                    </li>
                    <li>
                      • <strong>Partnership:</strong> Building lasting relationships with brokers
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another wholesale lender. We're your strategic partner in success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                  Competitive Pricing
                </CardTitle>
                <CardDescription>Industry-leading rates and pricing that help you win more deals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our strong investor relationships and efficient operations allow us to offer some of the most
                  competitive rates in the market, giving you the edge you need.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-red-600" />
                  Dedicated Support
                </CardTitle>
                <CardDescription>Personal account management and responsive customer service</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every broker partner gets a dedicated account manager who understands your business and is committed
                  to your success. No call centers, just real relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-red-600" />
                  Fast Closings
                </CardTitle>
                <CardDescription>Streamlined processes that get your loans closed quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our efficient underwriting process and PRO Portal technology enable faster loan processing, helping
                  you close more loans in less time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Track Record</h2>
            <p className="text-xl text-gray-600">Numbers that speak to our commitment and success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl font-bold text-red-600 mb-4">15+</div>
              <div className="text-gray-600 font-medium">Years in Business</div>
              <div className="text-sm text-gray-500 mt-2">Established expertise</div>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl font-bold text-red-600 mb-4">3000+</div>
              <div className="text-gray-600 font-medium">Broker Partners</div>
              <div className="text-sm text-gray-500 mt-2">Nationwide network</div>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl font-bold text-red-600 mb-4">$4B+</div>
              <div className="text-gray-600 font-medium">Loans Funded</div>
              <div className="text-sm text-gray-500 mt-2">Proven track record</div>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="text-5xl font-bold text-red-600 mb-4">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              <div className="text-sm text-gray-500 mt-2">Happy partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Partner with UFF?</h2>
            <p className="text-xl mb-8 text-red-100">
              Join our growing network of successful mortgage brokers and experience the UFF difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Link href="/get-approved">Get Approved Today</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
              >
                <Link href="/pro-portal">Explore PRO Portal</Link>
              </Button>
            </div>

            {/* PRO Portal Login CTA */}
            <div className="mt-6 p-4 bg-red-700 rounded-lg">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-white font-semibold">Already a UFF partner?</p>
                  <Button
                    onClick={handleProPortalClick}
                    className="mt-2 bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-2 rounded-full shadow-lg"
                  >
                    🚀 Access PRO Portal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
