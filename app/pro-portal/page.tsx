"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  DollarSign,
  Lock,
  Upload,
  BarChart3,
  Home,
  CreditCard,
  Shield,
  Eye,
  FileCheck,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  Users,
} from "lucide-react"
import Link from "next/link"
import { ProPortalLoginModal } from "@/components/pro-portal-login-modal"

export default function ProPortalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToFeatures = () => {
    const element = document.getElementById("features")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleProPortalClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-600 text-white">Proprietary Technology Platform</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              PRO Portal
              <span className="block text-red-400 text-3xl md:text-4xl font-normal mt-2">
                Powering Real Originators
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Our comprehensive loan management platform streamlines your entire process from application to closing,
              giving you the tools to close more loans faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                <Link href="/get-approved">
                  Get Portal Access <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                onClick={scrollToFeatures}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 bg-transparent cursor-pointer"
              >
                Explore Features
              </Button>
            </div>

            {/* Existing Partner Login CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-center">
                <p className="text-white/90 mb-3 text-lg">
                  🎯 <strong>Existing Partners:</strong> Access your account now
                </p>
                <Button
                  onClick={handleProPortalClick}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
                >
                  🚀 Login to PRO Portal
                </Button>
                <p className="text-white/70 text-sm mt-2">Secure access to your loan pipeline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process loans in minutes, not hours, with our streamlined workflow</p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">
                Your data and your clients' information is protected with enterprise-grade security
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Access</h3>
              <p className="text-gray-600">Work on your loans anytime, anywhere with our cloud-based platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for Mortgage Professionals</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                PRO Portal was designed by mortgage industry veterans who understand the challenges you face every day.
                Our platform combines cutting-edge technology with practical functionality to help you close more loans
                faster.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Intuitive interface designed for loan officers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Real-time updates and notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Seamless integration with existing workflows</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/smiling-man.png"
                alt="Smiling man looking up, representing a successful mortgage professional"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Loan Management Suite</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your loan pipeline from start to finish, all in one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Create Loans */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-red-600" />
                  Create Loans
                </CardTitle>
                <CardDescription>Streamlined loan application creation and management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Intuitive loan application interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Auto-populate borrower information
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Built-in compliance checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Save and resume functionality
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Price Loans */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-red-600" />
                  Price Loans
                </CardTitle>
                <CardDescription>Real-time pricing with competitive rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Live rate updates throughout the day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multiple pricing scenarios
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Instant loan-to-value calculations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Customizable pricing worksheets
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Lock Loans */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-6 w-6 text-red-600" />
                  Lock Loans
                </CardTitle>
                <CardDescription>Secure rates with instant lock confirmations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    One-click rate locks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Flexible lock periods
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Lock extension options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automated confirmations
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Upload Documents */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-6 w-6 text-red-600" />
                  Upload Documents
                </CardTitle>
                <CardDescription>Secure document management and sharing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Drag-and-drop file uploads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automatic document categorization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Version control and tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Secure encrypted storage
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Manage Pipeline */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                  Manage Pipeline
                </CardTitle>
                <CardDescription>Complete visibility into your loan pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Visual pipeline dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Milestone tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automated status updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Performance analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* View Conditions */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-red-600" />
                  View Conditions
                </CardTitle>
                <CardDescription>Real-time condition tracking and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Live condition updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Priority-based organization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Condition resolution tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automated notifications
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're constantly innovating to bring you even more powerful tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-6 w-6 text-gray-400" />
                    Order Appraisal
                  </CardTitle>
                  <Badge className="bg-red-600 text-white text-xs">Coming Soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Seamlessly order appraisals directly from the platform with integrated AMC partners.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    Order Credit
                  </CardTitle>
                  <Badge className="bg-red-600 text-white text-xs">Coming Soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pull credit reports instantly with integrated credit reporting agencies.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-gray-400" />
                    Digital Verifications
                  </CardTitle>
                  <Badge className="bg-red-600 text-white text-xs">Coming Soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Order employment, income, and asset verifications with digital VOE/VOI services.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-6 w-6 text-gray-400" />
                    Initial Disclosures
                  </CardTitle>
                  <Badge className="bg-red-600 text-white text-xs">Coming Soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate and deliver initial loan disclosures automatically upon application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories with Images */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Mortgage Professionals</h2>
            <p className="text-xl text-gray-600">See how PRO Portal is transforming businesses nationwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/team-meeting.png"
                alt="Group of smiling mortgage professionals collaborating in a meeting"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                <p className="text-gray-600 italic mb-4">
                  "PRO Portal has completely transformed how we manage our loan pipeline. What used to take hours now
                  takes minutes, and our clients love the faster turnaround times."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Martinez</p>
                    <p className="text-sm text-gray-600">Senior Loan Officer, Premier Mortgage Group</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                <p className="text-gray-600 italic mb-4">
                  "The real-time pricing and instant rate locks have given us a huge competitive advantage. We're
                  closing 30% more loans since switching to UFF and PRO Portal."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael Johnson</p>
                    <p className="text-sm text-gray-600">Branch Manager, Coastal Lending Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Advantages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PRO Portal?</h2>
            <p className="text-xl text-gray-600">Built by mortgage professionals, for mortgage professionals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Responsive</h3>
                  <p className="text-gray-600">
                    Access your loans and pipeline from any device, anywhere. Our mobile-optimized interface ensures you
                    never miss a beat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cloud-Based Platform</h3>
                  <p className="text-gray-600">
                    No software to install or maintain. Access PRO Portal from any web browser with automatic updates
                    and backups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Team Collaboration</h3>
                  <p className="text-gray-600">
                    Multiple users can work on the same loan file with role-based permissions and real-time
                    collaboration features.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/loan-pipeline-dashboard.png"
                alt="Screenshot of the PRO Portal loan pipeline dashboard"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Transform Your Mortgage Business Today</h2>
            <p className="text-xl mb-8 text-red-100">
              Don't let outdated processes slow you down. Join the PRO Portal revolution and start closing more loans
              faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Link href="/get-approved">Apply for Access</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
              >
                <Link href="/about">Learn About UFF</Link>
              </Button>
            </div>

            {/* PRO Portal Login CTA */}
            <div className="mt-6 p-4 bg-red-700 rounded-lg">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-white font-semibold">Already approved? Login now!</p>
                  <Button
                    onClick={handleProPortalClick}
                    className="mt-2 bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-2 rounded-full"
                  >
                    Access PRO Portal →
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
