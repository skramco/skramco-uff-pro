"use client"

import { CardContent } from "@/components/ui/card"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Bell, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Captcha } from "@/components/ui/captcha" // Import Captcha

interface ProPortalLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProPortalLoginModal({ isOpen, onClose }: ProPortalLoginModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCaptchaValid, setIsCaptchaValid] = useState(false) // New state for CAPTCHA validity
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    title: "",
    volume: "",
    interest: "",
  })
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCaptchaValid) {
      alert("Please complete the CAPTCHA.")
      return
    }
    setIsSubmitting(true)
    const webhookData = formData // Declare webhookData variable

    try {
      // Send webhook to Zapier  ---  CORS-safe
      await fetch("https://hooks.zapier.com/hooks/catch/209660/u33ao2t/", {
        method: "POST",
        mode: "no-cors", // prevents CORS failures in browsers / Next.js
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      // If we reach this line the network request did not hard-fail
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Webhook submission error:", error)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        router.push("/")
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white text-gray-900">
          <div className="text-center py-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              We've received your information and will contact you as soon as PRO Portal is available.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              You'll be among the first to experience our revolutionary loan management platform.
            </p>
            <p className="text-sm text-red-600 font-medium">Redirecting you to the home page...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
              <Rocket className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">PRO Portal Coming Soon</DialogTitle>
              <Badge className="bg-red-600 text-white mt-1">Beta Program Available</Badge>
            </div>
          </div>
          <DialogDescription className="text-lg text-gray-600 leading-relaxed">
            We're putting the finishing touches on our revolutionary loan management platform. Join our exclusive beta
            program to be among the first to experience PRO Portal's powerful features.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Benefits Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Beta Program Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <Users className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Early Access</h4>
                  <p className="text-sm text-gray-600">Be the first to use PRO Portal before public launch</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <Bell className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Priority Support</h4>
                  <p className="text-sm text-gray-600">Direct access to our development team for feedback</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="beta-first-name">First Name *</Label>
                <Input
                  id="beta-first-name"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="beta-last-name">Last Name *</Label>
                <Input
                  id="beta-last-name"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="beta-email">Email Address *</Label>
                <Input
                  id="beta-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="beta-phone">Phone Number</Label>
                <Input
                  id="beta-phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="beta-company">Company Name *</Label>
              <Input
                id="beta-company"
                placeholder="Your mortgage company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="beta-title">Your Title/Role *</Label>
                <Select value={formData.title} onValueChange={(value) => handleInputChange("title", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner/President</SelectItem>
                    <SelectItem value="manager">Branch Manager</SelectItem>
                    <SelectItem value="loan-officer">Loan Officer</SelectItem>
                    <SelectItem value="processor">Loan Processor</SelectItem>
                    <SelectItem value="operations">Operations Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="beta-volume">Monthly Loan Volume</Label>
                <Select value={formData.volume} onValueChange={(value) => handleInputChange("volume", value)}>
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
            </div>

            <div>
              <Label htmlFor="beta-interest">What interests you most about PRO Portal?</Label>
              <Textarea
                id="beta-interest"
                placeholder="Tell us what features or capabilities you're most excited about..."
                rows={3}
                value={formData.interest}
                onChange={(e) => handleInputChange("interest", e.target.value)}
              />
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

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What to Expect</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• We'll contact you within 48 hours to confirm your beta participation</li>
                <li>• Beta access will be granted in phases based on business volume and readiness</li>
                <li>• Training and onboarding support will be provided at no additional cost</li>
                <li>• Your feedback will directly influence the final product features</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isSubmitting || !isCaptchaValid}
              >
                {isSubmitting ? "Submitting..." : "Join Beta Program"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="px-8 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
