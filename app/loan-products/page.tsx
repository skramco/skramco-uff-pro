"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Shield, Users, Star, TrendingUp, Zap, CheckCircle, ArrowRight, Home, DollarSign, FileText, Calculator, Clock, Grid3X3, TrendingDown } from 'lucide-react'
import Link from "next/link"

export default function LoanProductsPage() {
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("")

  const openMatrixPDF = (pdfPath: string) => {
    window.open(pdfPath, '_blank', 'noopener,noreferrer')
  }

  const openRatesModal = (productType: string) => {
    setSelectedProduct(productType)
    setIsRatesModalOpen(true)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        fetchPricing(productType)
      }
    }, 100)
  }

  const calculateAPR = (loanAmount: number, closingCosts: number, nominalRate: number, loanTermYears = 30) => {
    const loanTermMonths = loanTermYears * 12
    const monthlyNominalRate = nominalRate / 100 / 12
    const monthlyPayment = (loanAmount * monthlyNominalRate) / (1 - Math.pow(1 + monthlyNominalRate, -loanTermMonths))
    const amountReceived = loanAmount - closingCosts

    let low = 0.00001
    let high = 1
    let aprGuess = 0

    while (high - low > 1e-7) {
      const mid = (high + low) / 2
      const guessedPayment = (amountReceived * mid) / (1 - Math.pow(1 + mid, -loanTermMonths))

      if (guessedPayment > monthlyPayment) {
        high = mid
      } else {
        low = mid
      }
      aprGuess = mid
    }

    const aprAnnual = aprGuess * 12 * 100
    return [aprAnnual, monthlyPayment]
  }

  const fetchPricing = async (productType = "Conventional") => {
    const container = document.getElementById("wp-pricing-grid")
    if (!container) return

    const payload = {
      loan: {
        loanPurpose: "Purchase",
        baseLoanAmount: 455000,
        representativeFico: 780,
        ltv: 70,
        cltv: 70,
        prepayOptions: "None",
        docType: "FullDoc",
      },
      borrower: {
        citizenship: "USCitizen",
        isSelfEmployed: false,
        isFirstTimeHomeBuyer: false,
        monthsReserves: 36,
        rentalHistoryMonths: 24,
        debtToIncomeRatio: 20,
      },
      subjectProperty: {
        occupancy: "OwnerOccupied",
        propertyType: "SingleFamilyResidence",
        appraisedValue: 650000,
        state: "CA",
        purchasePrice: 650000,
      },
      options: {
        lockTerm: 30,
        productFamilies: ["Conventional"],
        productShortNames: ["CON30FFN", "CON30FFH", "CON20FFN", "CON15FFN", "CON56ASOFR", "CON76ASOFR", "CON106ASOFR"],
        lenderId: "7b691756-acde-4e4e-b002-7b8761ffb9a0",
        includeRulesResults: false,
      },
    }

    switch (productType) {
      case "FHA":
        payload.options.productFamilies = ["FHA"]
        payload.options.productShortNames = ["FHA30F", "FHA20F", "FHA15F", "FHA30FSTR"]
        break
      case "VA":
        payload.options.productFamilies = ["VA"]
        payload.options.productShortNames = ["VA30F", "VA30FIRL"]
        break
      case "USDA":
        payload.options.productFamilies = ["USDA"]
        payload.options.productShortNames = ["USDA30F"]
        break
      case "Non-QM":
        payload.options.productFamilies = ["Non-QM"]
        payload.options.productShortNames = ["NQM30FS", "NQM30FDSCR"]
        break
      case "Conventional":
      default:
        break
    }

    try {
      const res = await fetch("https://pricing-engine-service.ratesboard.com/product-pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        container.innerHTML = `<div class="error-message">Error loading rates: ${res.status}</div>`
        return
      }

      const data = await res.json()
      const loanAmount = 375000
      const closingCosts = 5000
      let html = ""

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="no-data-message">No products available at this time.</div>'
        return
      }

      data.forEach((product) => {
        const grid = product?.basePrices?.priceGrid?.["30"]
        const name = product?.product?.customProductName || "Unnamed Product"
        const activeDate = product?.basePrices?.activeDate
        const adjustments = product?.basePrices?.adjustments

        if (!Array.isArray(grid)) return

        html += `<div class="product-section">
          <h3 class="product-title">${name}</h3>
          <div class="pricing-table-container">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th>Rate</th>
                  <th>Price</th>
                  <th>APR</th>
                  <th>Monthly P&I</th>
                </tr>
              </thead>
              <tbody>`

        grid.forEach((row) => {
          if (row.rate && row.basePrice >= 98 && row.basePrice <= 104) {
            const rate = row.rate / 100
            const price = row.basePrice
            const [apr, payment] = calculateAPR(loanAmount, closingCosts, rate * 100)

            html += `
              <tr>
                <td class="rate-cell">${(rate * 100).toFixed(3)}%</td>
                <td class="price-cell">${price.toFixed(3)}</td>
                <td class="apr-cell">${apr.toFixed(3)}%</td>
                <td class="payment-cell">$${payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>`
          }
        })

        html += `</tbody></table></div>`

        const visibleAdjustments = Array.isArray(adjustments) ? adjustments.filter((adj) => adj.isHidden === false) : []

        if (visibleAdjustments.length > 0) {
          html += `<div class="adjustments-section">
            <h4>Rate Adjustments:</h4>
            <table class="adjustments-table">`
          visibleAdjustments.forEach((adj) => {
            html += `<tr>
              <td>${adj.description || ""}</td>
              <td>${adj.points?.toFixed(3) ?? ""}</td>
            </tr>`
          })
          html += `</table></div>`
        }

        if (activeDate) {
          html += `<p class="last-updated">Last Updated: ${new Date(activeDate).toLocaleString()}</p>`
        }

        html += `</div>`
      })

      container.innerHTML = html || '<div class="no-data-message">No pricing grids available.</div>'
    } catch (err) {
      container.innerHTML = `<div class="error-message">Unable to load rates: ${err instanceof Error ? err.message : "Unknown error"}</div>`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Comprehensive Loan Solutions</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Loan Products That Drive Results</h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              From conventional to specialty programs, we offer the complete range of loan products your clients need
              with competitive rates and fast closings.
            </p>
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 text-lg px-8 py-3">
              <Link href="/get-approved">
                Partner With Us Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Product Suite</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of loan products to meet every borrower's needs
            </p>
          </div>

          <Tabs defaultValue="conventional" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="conventional">Conventional</TabsTrigger>
              <TabsTrigger value="fha">FHA</TabsTrigger>
              <TabsTrigger value="va">VA</TabsTrigger>
              <TabsTrigger value="usda">USDA</TabsTrigger>
              <TabsTrigger value="nonqm">Non-QM</TabsTrigger>
            </TabsList>

            <TabsContent value="conventional" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-red-600" />
                      Conventional Loans
                    </CardTitle>
                    <CardDescription>Traditional financing with competitive rates and flexible terms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-600">
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
                          Fixed and adjustable rate options
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Primary, secondary, and investment properties
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Purchase and refinance options
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Ideal For:</h4>
                      <p className="text-gray-600">
                        Borrowers with good credit scores (typically 620+) and stable income. Perfect for first-time
                        homebuyers and repeat buyers looking for competitive rates.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button
                        onClick={() => window.open('/matrix/conventional-fannie', '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        View Matrix - Fannie
                      </Button>
                      <Button
                        onClick={() => window.open('/matrix/conventional-freddie', '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        View Matrix - Freddie
                      </Button>
                      <Button
                        onClick={() => openRatesModal("Conventional")}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                      >
                        <TrendingDown className="h-4 w-4" />
                        Current Rates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-red-600" />
                        Loan Limits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Conforming Limit (2025):</span>
                          <span className="font-semibold">$806,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">High-Cost Areas:</span>
                          <span className="font-semibold">Up to $1,209,750</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Down Payment:</span>
                          <span className="font-semibold">3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-red-600" />
                        Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Full income documentation required</li>
                        <li>• 2 years tax returns and W-2s</li>
                        <li>• Recent pay stubs and bank statements</li>
                        <li>• Credit score typically 620+ required</li>
                        <li>• Debt-to-income ratio up to 50%</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fha" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-red-600" />
                      FHA Loans
                    </CardTitle>
                    <CardDescription>Government-backed loans with flexible qualification requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Down payments as low as 3.5%
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Credit scores as low as 580
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Gift funds allowed for down payment
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Flexible debt-to-income ratios
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Assumable loans available
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Ideal For:</h4>
                      <p className="text-gray-600">
                        First-time homebuyers, borrowers with limited down payment funds, or those with
                        less-than-perfect credit histories.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button
                        onClick={() => window.open('/matrix/fha', '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        View Matrix
                      </Button>
                      <Button
                        onClick={() => openRatesModal("FHA")}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                      >
                        <TrendingDown className="h-4 w-4" />
                        Current Rates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-red-600" />
                        FHA Limits & Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Loan Limit:</span>
                          <span className="font-semibold">$524,225</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">High-Cost Areas:</span>
                          <span className="font-semibold">Up to $1,209,750</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Credit Score:</span>
                          <span className="font-semibold">580 (3.5% down)*</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-4 italic">* Some restrictions may apply</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mortgage Insurance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Upfront mortgage insurance premium (UFMIP)</li>
                        <li>• Annual mortgage insurance premium (MIP)</li>
                        <li>• MIP removal after 11 years (if 10% down)</li>
                        <li>• Lifetime MIP for loans with less than 10% down</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="va" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-red-600" />
                      VA Loans
                    </CardTitle>
                    <CardDescription>
                      Exclusive benefits for military veterans and active duty service members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          No down payment required
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          No private mortgage insurance (PMI)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Competitive interest rates
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          No prepayment penalties
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Assumable loans
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Reusable benefit
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Eligible Borrowers:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Veterans with qualifying service</li>
                        <li>• Active duty service members</li>
                        <li>• National Guard and Reserve members</li>
                        <li>• Surviving spouses (under certain conditions)</li>
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button
                        onClick={() => window.open('/matrix/va', '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        View Matrix
                      </Button>
                      <Button
                        onClick={() => openRatesModal("VA")}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                      >
                        <TrendingDown className="h-4 w-4" />
                        Current Rates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-red-600" />
                        VA Loan Limits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Loan Limit:</span>
                          <span className="font-semibold">$806,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">High-Cost Areas:</span>
                          <span className="font-semibold">Up to $1,209,750</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">VA Funding Fee:</span>
                          <span className="font-semibold">2.15% - 3.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Disabled Veterans:</span>
                          <span className="font-semibold">Fee Exempt</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Property Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Primary residence only</li>
                        <li>• VA appraisal required</li>
                        <li>• Property must meet VA standards</li>
                        <li>• Certificate of Eligibility required</li>
                        <li>• Occupancy within 60 days</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usda" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-red-600" />
                      USDA Rural Development Loans
                    </CardTitle>
                    <CardDescription>100% financing for eligible rural and suburban properties</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          100% financing (no down payment)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Below-market interest rates
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Low mortgage insurance costs
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Fixed-rate mortgages
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          30-year terms available
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Eligibility Requirements:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Property must be in USDA-eligible area</li>
                        <li>• Income limits based on area median income</li>
                        <li>• Primary residence only</li>
                        <li>• U.S. citizenship or permanent residency</li>
                        <li>• Stable and dependable income</li>
                      </ul>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => window.open('/matrix/usda', '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        View Matrix
                      </Button>
                      <Button
                        onClick={() => openRatesModal("USDA")}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                      >
                        <TrendingDown className="h-4 w-4" />
                        Current Rates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-red-600" />
                        USDA Program Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maximum Loan Amount:</span>
                          <span className="font-semibold">No set limit</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Income Limit:</span>
                          <span className="font-semibold">115% of AMI</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Upfront Guarantee Fee:</span>
                          <span className="font-semibold">1.0%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Fee:</span>
                          <span className="font-semibold">0.35%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Eligibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Rural areas with population under 35,000</li>
                        <li>• Some suburban areas qualify</li>
                        <li>• Check USDA eligibility map</li>
                        <li>• Properties outside major metropolitan areas</li>
                        <li>• Single-family homes, condos, and manufactured homes</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nonqm" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-red-600" />
                      Non-QM Loans
                    </CardTitle>
                    <CardDescription>Alternative documentation loans for unique borrower situations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Program Types:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Bank Statement Programs (12 or 24 months)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Asset Depletion (36 or 84 months)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Debt Service Coverage Ratio (DSCR)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Interest-Only Options
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Foreign National Programs
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Ideal For:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Self-employed borrowers</li>
                        <li>• Real estate investors</li>
                        <li>• High-net-worth individuals</li>
                        <li>• Foreign nationals</li>
                        <li>• Complex income situations</li>
                      </ul>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => window.open('/matrix/nonqm', '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        View Matrix
                      </Button>
                      <Button
                        onClick={() => openRatesModal("Non-QM")}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                      >
                        <TrendingDown className="h-4 w-4" />
                        Current Rates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-red-600" />
                        Program Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amounts:</span>
                          <span className="font-semibold">Up to $3M+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Down Payment:</span>
                          <span className="font-semibold">10% - 25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credit Score:</span>
                          <span className="font-semibold">660+ typically</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property Types:</span>
                          <span className="font-semibold">All types</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Documentation Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Bank statements (personal or business)</li>
                        <li>• Asset depletion calculations</li>
                        <li>• Rental income documentation</li>
                        <li>• P&L statements</li>
                        <li>• CPA letters</li>
                        <li>• Alternative income verification</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose UFF */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose UFF for Your Loan Products?</h2>
            <p className="text-xl text-gray-600">We make it easier for you to close more loans with better terms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Competitive Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Industry-leading rates and pricing that help you win more deals and increase your margins.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Fast Turnaround</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick underwriting decisions and efficient processing to meet your closing deadlines.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dedicated account managers and underwriters who understand your business needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Reliable Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Consistent funding and reliable service you can count on for every transaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Expand Your Product Offerings?</h2>
            <p className="text-xl mb-8 text-red-100">
              Partner with UFF and give your clients access to the complete range of loan products they need with
              competitive rates and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700">
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
          </div>
        </div>
      </section>

      {/* Rates Modal */}
      <Dialog open={isRatesModalOpen} onOpenChange={setIsRatesModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900">
              <TrendingDown className="h-5 w-5 text-red-600" />
              Current {selectedProduct} Rates
            </DialogTitle>
            <DialogDescription className="text-gray-600">Live pricing for {selectedProduct} loan products</DialogDescription>
          </DialogHeader>
          {/* Scenario Disclosure Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold">Scenario:</span> Loan Purpose: Purchase | Loan Amount: $375,000 | LTV/CLTV: 70% | Occupancy: Owner Occupied | State: CA | Lock Term: 30 Days | Credit Score: 780
            </p>
          </div>
          <div className="py-6">
            <div id="wp-pricing-grid" className="pricing-container">
              <div className="loading-message">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                  <p>Loading mortgage pricing...</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .pricing-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .product-section {
          margin-bottom: 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .product-title {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 1rem 1.5rem;
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .pricing-table-container {
          overflow-x: auto;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
        }

        .pricing-table thead {
          background-color: #f9fafb;
        }

        .pricing-table th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }

        .pricing-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .pricing-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .rate-cell {
          font-weight: 600;
          color: #dc2626;
        }

        .price-cell {
          font-weight: 500;
        }

        .apr-cell {
          color: #059669;
          font-weight: 500;
        }

        .payment-cell {
          font-weight: 600;
          color: #1f2937;
        }

        .adjustments-section {
          padding: 1.5rem;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }

        .adjustments-section h4 {
          margin: 0 0 1rem 0;
          color: #374151;
          font-size: 1rem;
          font-weight: 600;
        }

        .adjustments-table {
          width: 100%;
          border-collapse: collapse;
        }

        .adjustments-table td {
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid #d1d5db;
          font-size: 0.875rem;
        }

        .adjustments-table td:first-child {
          color: #374151;
        }

        .adjustments-table td:last-child {
          font-weight: 500;
          text-align: right;
        }

        .last-updated {
          padding: 1rem 1.5rem;
          margin: 0;
          font-size: 0.875rem;
          color: #6b7280;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }

        .loading-message {
          padding: 3rem;
          text-align: center;
          color: #6b7280;
        }

        .error-message {
          padding: 2rem;
          text-align: center;
          color: #dc2626;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          margin: 1rem;
        }

        .no-data-message {
          padding: 2rem;
          text-align: center;
          color: #6b7280;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin: 1rem;
        }
      `}</style>
    </div>
  )
}
