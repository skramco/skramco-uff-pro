"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Download,
  Calculator,
  BookOpen,
  Users,
  TrendingUp,
  Search,
  Shield,
  Home,
  Building,
  File,
  Star,
  Edit3,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { ProPortalLoginModal } from "@/components/pro-portal-login-modal"
import { MortgageCalculator } from "@/components/mortgage-calculator"
import { FHACaseNumberForm } from "@/components/fha-case-number-form"
import { RateSheetPasswordModal } from "@/components/rate-sheet-password-modal"

// Form data structure - verified government URLs only
const formSections = [
  {
    id: "general",
    title: "General Forms",
    icon: FileText,
    color: "blue",
    forms: [
      {
        name: "Uniform Residential Loan Application (URLA 1003)",
        description:
          "Standard mortgage application form required by Fannie Mae and Freddie Mac for all residential loan applications",
        url: "https://selling-guide.fanniemae.com/Selling-Guide/Origination-thru-Closing/Subpart-B3-Underwriting-Borrowers/Chapter-B3-6-Underwriting-Property/1032999861/B3-6-05-Freddie-Mac-Form-65-Uniform-Residential-Loan-Application-07-05-2021.htm",
        source: "Fannie Mae",
      },
      {
        name: "Initial Borrower Contact Form",
        description: "Document initial contact with borrowers and capture preliminary loan information for processing",
        comingSoon: true,
      },
      {
        name: "Loan Estimate Request Form",
        description:
          "Request form for obtaining a Loan Estimate with detailed terms and estimated costs for the mortgage",
        comingSoon: true,
      },
      {
        name: "Income & Asset Documentation Checklist",
        description: "Comprehensive list of required income and asset documents needed for loan underwriting",
        comingSoon: true,
      },
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure Forms",
    icon: Shield,
    color: "red",
    forms: [
      {
        name: "Loan Estimate (LE) Sample",
        description: "Three-page form that provides borrowers with important details about the requested mortgage loan",
        url: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/",
        source: "CFPB",
      },
      {
        name: "Closing Disclosure (CD) Sample",
        description:
          "Five-page form detailing the final terms and costs of the mortgage, provided at least 3 days before closing",
        url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/",
        source: "CFPB",
      },
      {
        name: "TRID Disclosure Forms Package",
        description: "Complete package of TILA-RESPA Integrated Disclosure forms required for mortgage transactions",
        comingSoon: true,
      },
      {
        name: "Privacy Notice Template",
        description: "Required notice explaining how borrower financial information is collected, used, and protected",
        comingSoon: true,
      },
      {
        name: "ECOA/Adverse Action Notice Information",
        description:
          "Information about Equal Credit Opportunity Act rights and adverse action notification requirements",
        url: "https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/tila-respa-integrated-disclosures/trid-overview/",
        source: "CFPB",
      },
    ],
  },
  {
    id: "fha",
    title: "FHA Forms",
    icon: Users,
    color: "green",
    forms: [
      {
        name: "FHA Connection Information",
        description: "Access FHA Connection portal for case number requests, appraisal ordering, and loan processing",
        url: "https://www.hud.gov/program_offices/housing/sfh/lender/lendmail",
        source: "HUD",
      },
      {
        name: "FHA Amendatory Clause & Real Estate Certification",
        description: "Required FHA form certifying property value and protecting borrowers in purchase transactions",
        url: "https://www.hud.gov/sites/dfiles/OCHCO/documents/92900b.pdf",
        source: "HUD",
      },
      {
        name: "FHA Case Number Request Form",
        description:
          "Submit request to obtain an FHA case number for new loan applications through United Fidelity Funding",
        isForm: true,
      },
      {
        name: "FHA Borrower Certification & Authorization",
        description: "Borrower certifies occupancy intent and authorizes FHA to verify information for loan approval",
        comingSoon: true,
      },
      {
        name: "FHA Identity of Interest Certification",
        description: "Discloses any identity of interest relationships between parties in the transaction",
        comingSoon: true,
      },
    ],
  },
  {
    id: "va",
    title: "VA Forms",
    icon: Star,
    color: "purple",
    forms: [
      {
        name: "VA Form 26-1880 - Request for Certificate of Eligibility",
        description:
          "Apply for VA loan eligibility certificate to determine entitlement for VA-guaranteed home loan benefits",
        url: "https://www.va.gov/find-forms/about-form-26-1880/",
        source: "VA",
      },
      {
        name: "VA Form 26-1802a - HUD/VA Addendum to URLA",
        description: "Required addendum to the standard loan application for VA-guaranteed loans",
        url: "https://www.va.gov/find-forms/about-form-26-1802a/",
        source: "VA",
      },
      {
        name: "VA Funding Fee Information",
        description: "Details about VA funding fee rates, exemptions, and payment options for VA loans",
        url: "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/",
        source: "VA",
      },
      {
        name: "VA Occupancy Certification",
        description: "Borrower certifies intent to occupy the property as primary residence for VA loan eligibility",
        comingSoon: true,
      },
    ],
  },
  {
    id: "appraisal",
    title: "Appraisal Forms",
    icon: Home,
    color: "orange",
    forms: [
      {
        name: "Uniform Residential Appraisal Report (Form 1004)",
        description: "Standard appraisal form for single-family properties, detailing property value and condition",
        url: "https://singlefamily.fanniemae.com/appraisal-forms-and-documents",
        source: "Fannie Mae",
      },
      {
        name: "Appraisal Order Form",
        description: "Order professional property appraisal with detailed property information and loan requirements",
        comingSoon: true,
      },
      {
        name: "Property Inspection Waiver (PIW) Request",
        description: "Request waiver of physical property inspection when eligible based on data and risk assessment",
        comingSoon: true,
      },
      {
        name: "Desktop Appraisal Request",
        description: "Request desktop appraisal using public records and MLS data without physical property inspection",
        comingSoon: true,
      },
    ],
  },
  {
    id: "condo",
    title: "Condo Forms",
    icon: Building,
    color: "indigo",
    forms: [
      {
        name: "Fannie Mae Condo Project Manager",
        description: "Search and verify FHA and Fannie Mae approved condominium projects for loan eligibility",
        url: "https://www.fanniemae.com/singlefamily/condo-project-manager",
        source: "Fannie Mae",
      },
      {
        name: "Condo Project Questionnaire (Form 1076)",
        description: "Detailed questionnaire about condo project for determining financing eligibility and approval",
        comingSoon: true,
      },
      {
        name: "Condo/PUD Rider",
        description: "Mortgage addendum for condominium or planned unit development properties with specific terms",
        comingSoon: true,
      },
      {
        name: "HOA Certification Form",
        description: "Homeowners association provides certification of fees, insurance, and project financial health",
        comingSoon: true,
      },
    ],
  },
  {
    id: "other",
    title: "Other Forms",
    icon: File,
    color: "gray",
    forms: [
      {
        name: "Power of Attorney (POA) Form",
        description: "Legal document authorizing someone to act on borrower's behalf during loan closing process",
        comingSoon: true,
      },
      {
        name: "Gift Letter Template",
        description: "Document verifying that down payment funds are a gift, not a loan, from family or approved donor",
        comingSoon: true,
      },
      {
        name: "Explanation of Credit Letter Template",
        description:
          "Template for borrowers to explain credit issues, late payments, or derogatory items on credit report",
        comingSoon: true,
      },
      {
        name: "Subordination Agreement",
        description: "Legal agreement changing lien priority when refinancing with existing second mortgage or HELOC",
        comingSoon: true,
      },
      {
        name: "Rate Lock Agreement",
        description: "Agreement securing specific interest rate for defined period during loan processing",
        comingSoon: true,
      },
    ],
  },
]

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [isFHAFormOpen, setIsFHAFormOpen] = useState(false)
  const [isRateSheetPasswordOpen, setIsRateSheetPasswordOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleProPortalClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(true)
  }

  const handleRateSheetClick = () => {
    setIsRateSheetPasswordOpen(true)
  }

  const handleDownload = (url: string, formName: string, source: string) => {
    // Open the official government form URL in a new tab
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleFormClick = (formName: string) => {
    if (formName === "FHA Case Number Request Form") {
      setIsFHAFormOpen(true)
    }
  }

  // Filter forms based on search query
  const filteredSections = formSections
    .map((section) => ({
      ...section,
      forms: section.forms.filter(
        (form) =>
          form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          form.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.forms.length > 0)

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      red: "bg-red-100 text-red-800 border-red-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      red: "text-red-600",
      green: "text-green-600",
      purple: "text-purple-600",
      orange: "text-orange-600",
      indigo: "text-indigo-600",
      gray: "text-gray-600",
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Broker Resources</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Form Library</h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Access all the forms and documents you need to process loans efficiently. Download directly from official
              government sources.
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
                <Button onClick={handleRateSheetClick} className="w-full bg-red-600 hover:bg-red-700">
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
                <CardTitle>Loan Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Calculate payments and scenarios</p>
                <Button
                  onClick={handleCalculatorClick}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Open Calculator
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Product guidelines and overlays</p>
                <br />
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  <Link href="/loan-products">View Guidelines</Link>
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

      {/* Forms Library Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Downloadable Forms</h2>
              <p className="text-xl text-gray-600 mb-8">
                All the forms you need for efficient loan processing, organized by category
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search forms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg"
                />
              </div>
            </div>

            {/* Forms Grid */}
            <div className="space-y-8">
              {filteredSections.map((section) => {
                const IconComponent = section.icon
                return (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader className={`${getColorClasses(section.color)} border-b`}>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <IconComponent className={`h-6 w-6 ${getIconColorClasses(section.color)}`} />
                        </div>
                        {section.title}
                        <Badge variant="outline" className="ml-auto bg-white/50">
                          {section.forms.length} forms
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {section.forms.map((form, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4"
                          >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-gray-900">{form.name}</p>
                                  {form.source && (
                                    <Badge variant="outline" className="text-xs flex-shrink-0">
                                      {form.source}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{form.description}</p>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {form.isForm ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleFormClick(form.name)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Edit3 className="mr-2 h-4 w-4" />
                                  Fill Out Form
                                </Button>
                              ) : form.comingSoon ? (
                                <Badge variant="secondary" className="text-gray-600">
                                  Coming Soon
                                </Badge>
                              ) : form.url ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(form.url!, form.name, form.source!)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {filteredSections.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No forms found</h3>
                  <p className="text-gray-500">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Need Additional Resources?</h2>
            <p className="text-xl mb-8 text-red-100">
              Can't find what you're looking for? Our support team is here to help you access the resources you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                onClick={handleProPortalClick}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
              >
                Access PRO Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <MortgageCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <FHACaseNumberForm isOpen={isFHAFormOpen} onClose={() => setIsFHAFormOpen(false)} />
      <RateSheetPasswordModal isOpen={isRateSheetPasswordOpen} onClose={() => setIsRateSheetPasswordOpen(false)} />
    </div>
  )
}
