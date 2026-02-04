"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Shield, Clock, Users, Award } from "lucide-react"
import Link from "next/link"
import { Captcha } from "@/components/ui/captcha" // Import Captcha

export default function GetApprovedPage() {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isCaptchaValid) {
      alert("Please complete the CAPTCHA.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      // Collect checkbox values for loan types
      const loanTypes: string[] = []
      if (formData.get('conventional')) loanTypes.push('Conventional')
      if (formData.get('fha')) loanTypes.push('FHA')
      if (formData.get('va')) loanTypes.push('VA')
      if (formData.get('usda')) loanTypes.push('USDA')
      if (formData.get('nonqm')) loanTypes.push('Non-QM')
      if (formData.get('jumbo')) loanTypes.push('Jumbo')

      // Prepare data for email API
      const emailData = {
        companyName: formData.get('company-name'),
        dba: formData.get('dba'),
        licenseNumber: formData.get('license-number'),
        yearsInBusiness: formData.get('years-in-business'),
        businessAddress: formData.get('business-address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        title: formData.get('title'),
        nmlsIndividual: formData.get('nmls-individual'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        monthlyVolume: formData.get('monthly-volume'),
        loanOfficers: formData.get('loan-officers'),
        loanTypes: loanTypes,
        currentLenders: formData.get('current-lenders'),
        additionalInfo: formData.get('additional-info'),
        marketingConsent: formData.get('marketing') === 'on'
      }

      // Send to Resend API
      const emailResponse = await fetch('/api/send-broker-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      setSubmitStatus('success')
      form.reset()
      setIsCaptchaValid(false)
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Broker Partnership Application</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Get Approved to Partner with UFF</h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Join our network of successful mortgage brokers and start sending loans to United Fidelity Funding Corp
              today.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with UFF?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Approvals</h3>
              <p className="text-sm text-gray-600">Get approved in 24-48 hours</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Competitive Rates</h3>
              <p className="text-sm text-gray-600">Industry-leading pricing</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-sm text-gray-600">Personal account management</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">PRO Portal Access</h3>
              <p className="text-sm text-gray-600">Advanced loan management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Broker Application Form</h2>
              <p className="text-xl text-gray-600">Complete the form below to start your partnership with UFF</p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Application Submitted Successfully!</h3>
                    <p className="text-green-800">
                      Thank you for your interest in partnering with UFF. We've received your application and will review it within 24-48 hours. You'll receive a confirmation email shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 text-red-600 mt-0.5">✕</div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Submission Failed</h3>
                    <p className="text-red-800">
                      We encountered an error submitting your application. Please try again or contact us directly at support@uff.loans.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form 
              onSubmit={handleSubmit} 
              className="space-y-8"
            >
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-600" />
                    Company Information
                  </CardTitle>
                  <CardDescription>Tell us about your mortgage brokerage business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company-name">Company Name *</Label>
                      <Input id="company-name" name="company-name" placeholder="Your Company Name" required />
                    </div>
                    <div>
                      <Label htmlFor="dba">DBA (if applicable)</Label>
                      <Input id="dba" name="dba" placeholder="Doing Business As" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="license-number">NMLS License Number *</Label>
                      <Input id="license-number" name="license-number" placeholder="NMLS #" required />
                    </div>
                    <div>
                      <Label htmlFor="years-in-business">Years in Business *</Label>
                      <Select name="years-in-business" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="more-than-10">More than 10 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="business-address">Business Address *</Label>
                    <Input id="business-address" name="business-address" placeholder="Street Address" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" placeholder="City" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select name="state" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="al">Alabama</SelectItem>
                          <SelectItem value="ak">Alaska</SelectItem>
                          <SelectItem value="az">Arizona</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code *</Label>
                      <Input id="zip" name="zip" placeholder="ZIP Code" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-red-600" />
                    Primary Contact Information
                  </CardTitle>
                  <CardDescription>Who should we contact regarding your application?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input id="first-name" name="first-name" placeholder="First Name" required />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name *</Label>
                      <Input id="last-name" name="last-name" placeholder="Last Name" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Title/Position *</Label>
                      <Input id="title" name="title" placeholder="e.g., Owner, Manager, Loan Officer" required />
                    </div>
                    <div>
                      <Label htmlFor="nmls-individual">Individual NMLS # *</Label>
                      <Input id="nmls-individual" name="nmls-individual" placeholder="Your NMLS #" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-red-600" />
                    Business Details
                  </CardTitle>
                  <CardDescription>Help us understand your business volume and focus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="monthly-volume">Monthly Loan Volume *</Label>
                      <Select name="monthly-volume" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select volume range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1m">$0 - $1M</SelectItem>
                          <SelectItem value="1-5m">$1M - $5M</SelectItem>
                          <SelectItem value="5-10m">$5M - $10M</SelectItem>
                          <SelectItem value="10-25m">$10M - $25M</SelectItem>
                          <SelectItem value="25m-plus">$25M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="loan-officers">Number of Loan Officers *</Label>
                      <Select name="loan-officers" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2</SelectItem>
                          <SelectItem value="3-5">3-5</SelectItem>
                          <SelectItem value="6-10">6-10</SelectItem>
                          <SelectItem value="11-25">11-25</SelectItem>
                          <SelectItem value="25-plus">25+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loan-types">Primary Loan Types (check all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="conventional" name="conventional" />
                        <Label htmlFor="conventional">Conventional</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fha" name="fha" />
                        <Label htmlFor="fha">FHA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="va" name="va" />
                        <Label htmlFor="va">VA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="usda" name="usda" />
                        <Label htmlFor="usda">USDA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="nonqm" name="nonqm" />
                        <Label htmlFor="nonqm">Non-QM</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="jumbo" name="jumbo" />
                        <Label htmlFor="jumbo">Jumbo</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="current-lenders">Current Wholesale Lenders</Label>
                    <Textarea
                      id="current-lenders"
                      name="current-lenders"
                      placeholder="List your current wholesale lending partners (optional)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-600" />
                    Required Documentation
                  </CardTitle>
                  <CardDescription>Please confirm you can provide the following documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">NMLS License & Registration</p>
                        <p className="text-sm text-gray-600">Current company and individual NMLS documentation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Business License</p>
                        <p className="text-sm text-gray-600">State business license and registration</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Errors & Omissions Insurance</p>
                        <p className="text-sm text-gray-600">Current E&O insurance certificate</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Financial Statements</p>
                        <p className="text-sm text-gray-600">Recent business financial statements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Sample Loan Files</p>
                        <p className="text-sm text-gray-600">2-3 recent closed loan files for review</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Anything else you'd like us to know about your business?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    name="additional-info"
                    placeholder="Tell us about your business goals, specialties, or any questions you have about partnering with UFF..."
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* CAPTCHA */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Check</CardTitle>
                  <CardDescription>Please complete the CAPTCHA to prove you're not a robot.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Captcha onCaptchaChange={handleCaptchaChange} />
                </CardContent>
              </Card>

              {/* Terms and Submit */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" name="terms" required />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I acknowledge that all information provided is true and accurate to the best of my knowledge. I
                        understand that UFF will review this application and may request additional documentation before
                        approval. *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="marketing" name="marketing" />
                      <Label htmlFor="marketing" className="text-sm leading-relaxed">
                        I agree to receive marketing communications from United Fidelity Funding Corp regarding
                        products, services, and industry updates.
                      </Label>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Button 
                      type="submit"
                      size="lg" 
                      className="bg-red-600 hover:bg-red-700 px-12 py-3" 
                      disabled={!isCaptchaValid || isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                    <p className="text-sm text-gray-600 mt-4">
                      We'll review your application and contact you within 24-48 hours
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      United Fidelity Funding Corp | NMLS ID: #34381 | Equal Housing Lender
                    </p>
                  </div>

                  {/* PRO Portal Preview CTA */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">🚀 Get a Preview</h3>
                      <p className="text-gray-600 mb-4">See what awaits you in the PRO Portal</p>
                      <Button
                        asChild
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent font-semibold px-6 py-2 rounded-full"
                      >
                        <Link href="/pro-portal">Explore PRO Portal Features</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
