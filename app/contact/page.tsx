"use client"

import { Suspense, useMemo, useState, type FormEvent } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Headphones } from "lucide-react"
import { Captcha } from "@/components/ui/captcha" // Import Captcha
import { PRO_PORTAL_LOGIN_URL } from "@/lib/pro-portal-url"
import { PageHero } from "@/components/page-hero"

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  )
}

function ContactPageInner() {
  const searchParams = useSearchParams()
  const [isCaptchaValid, setIsCaptchaValid] = useState(false) // New state for CAPTCHA validity
  const scenarioMessage = useMemo(() => {
    if (searchParams.get("topic") !== "scenario") return ""
    const product = searchParams.get("productName") || searchParams.get("product") || ""
    const loanAmount = searchParams.get("loanAmount") || ""
    const fico = searchParams.get("fico") || ""
    const ltv = searchParams.get("ltv") || ""
    const occupancy = searchParams.get("occupancy") || ""
    return [
      `Scenario check${product ? ` — ${product}` : ""}`,
      loanAmount ? `Loan amount: ${loanAmount}` : null,
      fico ? `FICO: ${fico}` : null,
      ltv ? `LTV: ${ltv}` : null,
      occupancy ? `Occupancy: ${occupancy}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  }, [searchParams])

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid)
  }

  const handleSubmit = (e: FormEvent) => {
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
      <PageHero eyebrow="Contact" title="Contact United Fidelity Funding">
        <p>Kansas City operations. For mortgage professionals only.</p>
      </PageHero>

      <section className="section-pad border-b border-hairline">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="panel p-5">
              <p className="caption">Phone</p>
              <p className="data-num mt-2 text-lg font-medium">(855) 95-EAGLE</p>
              <p className="mt-1 text-sm text-ink-muted">Monday–Friday, 8:00 AM–6:00 PM CT</p>
            </div>
            <div className="panel p-5">
              <p className="caption">Email</p>
              <p className="mt-2 font-medium">support@uff.loans</p>
            </div>
            <div className="panel p-5">
              <p className="caption">Headquarters</p>
              <p className="mt-2 text-sm">
                1300 NW Briarcliff Pkwy #275
                <br />
                Kansas City, MO 64116
              </p>
              <p className="caption mt-2">NMLS #34381</p>
            </div>
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
                  <Select defaultValue={searchParams.get("topic") === "scenario" ? "scenario" : undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scenario">Scenario desk</SelectItem>
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
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    defaultValue={scenarioMessage}
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
                        asChild
                        className="w-full"
                      >
                        <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                          Log in to PRO Portal
                        </a>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-hairline">
        <div className="container mx-auto px-4">
          <h2>Headquarters</h2>
          <p className="prose-body mt-3">1300 NW Briarcliff Pkwy #275, Kansas City, MO 64116</p>
          <Button asChild className="mt-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=1300+NW+Briarcliff+Pkwy+%23275%2C+Kansas+City%2C+MO+64116"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </Button>
        </div>
      </section>

    </div>
  )
}
