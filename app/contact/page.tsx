"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageSquare, Users, Headphones } from "lucide-react"
import { ProPortalLoginModal } from "@/components/pro-portal-login-modal"
import { Captcha } from "@/components/ui/captcha" // Import Captcha

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCaptchaValid, setIsCaptchaValid] = useState(false) // New state for CAPTCHA validity

  const handleProPortalClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCaptchaValid) {
      alert("Please complete the CAPTCHA.")
      return
    }
    // Handle form submission logic here
    console.log("Contact form submitted!")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Get In Touch</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Contact United Fidelity Funding</h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Ready to partner with us? Have questions about our services? Our team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Speak with our team directly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600 mb-2">(855) 95-EAGLE</p>
                <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM CST</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Get help via email</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-red-600 mb-2">support@uff.loans</p>
                <p className="text-gray-600">We respond within 2 business hours</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Corporate Headquarters</CardTitle>
                <CardDescription>Visit us in Kansas City</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-gray-900 mb-1">1300 NW Briarcliff Pkwy #275</p>
                <p className="text-gray-600 mb-2">Kansas City, MO 64116</p>
                <p className="text-sm text-gray-500">NMLS ID: #34381</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Office Hours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="first-name">First Name *</Label>
                    <Input id="first-name" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name *</Label>
                    <Input id="last-name" placeholder="Your last name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Your mortgage company" />
                </div>

                <div>
                  <Label htmlFor="inquiry-type">Inquiry Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="rates">Rate Information</SelectItem>
                      <SelectItem value="licensing">Licensing Questions</SelectItem>
                      <SelectItem value="general">General Information</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" placeholder="Tell us how we can help you..." rows={5} />
                </div>

                {/* CAPTCHA */}
                <Card className="p-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Security Check</CardTitle>
                    <CardDescription>Please complete the CAPTCHA to prove you're not a robot.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Captcha onCaptchaChange={handleCaptchaChange} />
                  </CardContent>
                </Card>

                <Button className="w-full bg-red-600 hover:bg-red-700" disabled={!isCaptchaValid}>
                  Send Message
                </Button>
              </form>
            </div>

            {/* Office Hours & Additional Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM CST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span className="font-semibold">9:00 AM - 2:00 PM CST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-red-600" />
                    Department Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">New Partnerships</h4>
                      <p className="text-sm text-gray-600">partnerships@uff.loans</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Technical Support</h4>
                      <p className="text-sm text-gray-600">support@uff.loans</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Underwriting</h4>
                      <p className="text-sm text-gray-600">underwriting@uff.loans</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Compliance</h4>
                      <p className="text-sm text-gray-600">compliance@uff.loans</p>
                    </div>

                    {/* PRO Portal Access */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">PRO Portal Access</h4>
                      <Button
                        onClick={handleProPortalClick}
                        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-full"
                      >
                        🚀 Login to PRO Portal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-red-600" />
                    Emergency Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">
                    For urgent matters outside business hours, our emergency support line is available for existing
                    partners.
                  </p>
                  <p className="font-semibold text-red-600">(855) 95-EAGLE ext. 911</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-red-600" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">Chat with our support team in real-time during business hours.</p>
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Headquarters</h2>
            <p className="text-xl text-gray-600">Located in the heart of Kansas City, Missouri</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
                  <p className="text-gray-600">1300 NW Briarcliff Pkwy #275, Kansas City, MO 64116</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700">Get Directions</Button>
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
