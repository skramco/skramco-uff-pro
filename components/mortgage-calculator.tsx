"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, Home, TrendingUp, Percent, CreditCard } from "lucide-react"

interface MortgageCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export function MortgageCalculator({ isOpen, onClose }: MortgageCalculatorProps) {
  // Payment Calculator State
  const [loanAmount, setLoanAmount] = useState("300000")
  const [interestRate, setInterestRate] = useState("6.5")
  const [loanTerm, setLoanTerm] = useState("30")
  const [paymentType, setPaymentType] = useState("pi")

  // Affordability Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState("8000")
  const [monthlyDebts, setMonthlyDebts] = useState("500")
  const [downPayment, setDownPayment] = useState("60000")
  const [affordInterestRate, setAffordInterestRate] = useState("6.5")
  const [affordLoanTerm, setAffordLoanTerm] = useState("30")
  const [dtiRatio, setDtiRatio] = useState("43")

  // Refinance Calculator State
  const [currentLoanBalance, setCurrentLoanBalance] = useState("250000")
  const [currentRate, setCurrentRate] = useState("7.0")
  const [currentPayment, setCurrentPayment] = useState("1663")
  const [newRate, setNewRate] = useState("6.0")
  const [closingCosts, setClosingCosts] = useState("5000")
  const [refiTerm, setRefiTerm] = useState("30")

  // DTI Calculator State
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("8000")
  const [proposedPayment, setProposedPayment] = useState("2000")
  const [creditCardPayments, setCreditCardPayments] = useState("200")
  const [carPayments, setCarPayments] = useState("400")
  const [studentLoanPayments, setStudentLoanPayments] = useState("300")
  const [otherDebts, setOtherDebts] = useState("100")

  // Down Payment Calculator State
  const [homePrice, setHomePrice] = useState("400000")
  const [downPaymentPercent, setDownPaymentPercent] = useState("20")

  // Helper Functions
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  // Payment Calculator Logic
  const calculatePayment = () => {
    const principal = Number.parseFloat(loanAmount)
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12
    const numberOfPayments = Number.parseFloat(loanTerm) * 12

    if (paymentType === "io") {
      // Interest-Only Payment
      return principal * monthlyRate
    } else {
      // Principal + Interest Payment
      if (monthlyRate === 0) return principal / numberOfPayments
      return (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      )
    }
  }

  const calculateTotalInterest = () => {
    const payment = calculatePayment()
    const numberOfPayments = Number.parseFloat(loanTerm) * 12
    const principal = Number.parseFloat(loanAmount)
    return payment * numberOfPayments - principal
  }

  const calculateTotalPayment = () => {
    const payment = calculatePayment()
    const numberOfPayments = Number.parseFloat(loanTerm) * 12
    return payment * numberOfPayments
  }

  // Affordability Calculator Logic
  const calculateAffordability = () => {
    const income = Number.parseFloat(monthlyIncome)
    const debts = Number.parseFloat(monthlyDebts)
    const maxDti = Number.parseFloat(dtiRatio) / 100
    const rate = Number.parseFloat(affordInterestRate) / 100 / 12
    const payments = Number.parseFloat(affordLoanTerm) * 12
    const down = Number.parseFloat(downPayment)

    // Calculate maximum monthly payment based on DTI
    const maxMonthlyPayment = income * maxDti - debts

    // Calculate maximum loan amount
    let maxLoanAmount = 0
    if (rate === 0) {
      maxLoanAmount = maxMonthlyPayment * payments
    } else {
      maxLoanAmount = (maxMonthlyPayment * (Math.pow(1 + rate, payments) - 1)) / (rate * Math.pow(1 + rate, payments))
    }

    const maxHomePrice = maxLoanAmount + down

    return {
      maxMonthlyPayment,
      maxLoanAmount,
      maxHomePrice,
    }
  }

  // Refinance Calculator Logic
  const calculateRefinance = () => {
    const balance = Number.parseFloat(currentLoanBalance)
    const oldRate = Number.parseFloat(currentRate) / 100 / 12
    const newRateMonthly = Number.parseFloat(newRate) / 100 / 12
    const payments = Number.parseFloat(refiTerm) * 12
    const costs = Number.parseFloat(closingCosts)
    const oldPayment = Number.parseFloat(currentPayment)

    // Calculate new monthly payment
    let newPayment = 0
    if (newRateMonthly === 0) {
      newPayment = balance / payments
    } else {
      newPayment =
        (balance * newRateMonthly * Math.pow(1 + newRateMonthly, payments)) /
        (Math.pow(1 + newRateMonthly, payments) - 1)
    }

    const monthlySavings = oldPayment - newPayment
    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : 0
    const lifetimeSavings = monthlySavings * payments - costs

    return {
      newPayment,
      monthlySavings,
      breakEvenMonths,
      lifetimeSavings,
    }
  }

  // DTI Calculator Logic
  const calculateDTI = () => {
    const income = Number.parseFloat(grossMonthlyIncome)
    const housing = Number.parseFloat(proposedPayment)
    const creditCards = Number.parseFloat(creditCardPayments)
    const car = Number.parseFloat(carPayments)
    const studentLoans = Number.parseFloat(studentLoanPayments)
    const other = Number.parseFloat(otherDebts)

    const totalDebts = housing + creditCards + car + studentLoans + other
    const frontEndDTI = (housing / income) * 100
    const backEndDTI = (totalDebts / income) * 100

    return {
      frontEndDTI,
      backEndDTI,
      totalDebts,
    }
  }

  // Down Payment Calculator Logic
  const calculateDownPayment = () => {
    const price = Number.parseFloat(homePrice)
    const percent = Number.parseFloat(downPaymentPercent) / 100

    const downPaymentAmount = price * percent
    const loanAmountNeeded = price - downPaymentAmount
    const ltv = (loanAmountNeeded / price) * 100

    return {
      downPaymentAmount,
      loanAmountNeeded,
      ltv,
    }
  }

  // Amortization Schedule Logic
  const generateAmortizationSchedule = () => {
    const principal = Number.parseFloat(loanAmount)
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12
    const numberOfPayments = Number.parseFloat(loanTerm) * 12
    const monthlyPayment = calculatePayment()

    const schedule = []
    let remainingBalance = principal

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      // Ensure the last payment zeros out the balance
      if (i === numberOfPayments) {
        remainingBalance = 0
      }

      schedule.push({
        paymentNumber: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance > 0 ? remainingBalance : 0,
      })
    }

    return schedule
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6 text-red-600" />
            Mortgage Calculators
          </DialogTitle>
          <DialogDescription>
            Professional mortgage calculators for quick loan analysis and client consultations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="payment" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="affordability">Affordability</TabsTrigger>
            <TabsTrigger value="refinance">Refinance</TabsTrigger>
            <TabsTrigger value="dti">DTI</TabsTrigger>
            <TabsTrigger value="downpayment">Down Payment</TabsTrigger>
            <TabsTrigger value="amortization">Amortization</TabsTrigger>
          </TabsList>

          {/* Payment Calculator */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-red-600" />
                  Monthly Payment Calculator
                </CardTitle>
                <CardDescription>Calculate monthly mortgage payments (P&I or Interest-Only)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="300000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.125"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="6.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <Select value={loanTerm} onValueChange={setLoanTerm}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                          <SelectItem value="40">40 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="paymentType">Payment Type</Label>
                      <Select value={paymentType} onValueChange={setPaymentType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pi">Principal & Interest</SelectItem>
                          <SelectItem value="io">Interest Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-red-800 text-lg">Results</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Monthly Payment:</span>
                        <span className="font-bold text-red-600 text-lg">{formatCurrency(calculatePayment())}</span>
                      </div>
                      {paymentType === "pi" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Total Interest:</span>
                            <span className="font-semibold">{formatCurrency(calculateTotalInterest())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Total Payment:</span>
                            <span className="font-semibold">{formatCurrency(calculateTotalPayment())}</span>
                          </div>
                        </>
                      )}
                      {paymentType === "io" && (
                        <div className="text-sm text-gray-600 mt-2">
                          <p>
                            * Interest-Only payment. Principal balance remains at{" "}
                            {formatCurrency(Number.parseFloat(loanAmount))}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affordability Calculator */}
          <TabsContent value="affordability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-red-600" />
                  Home Affordability Calculator
                </CardTitle>
                <CardDescription>Calculate how much home a borrower can afford</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="monthlyIncome">Gross Monthly Income</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        placeholder="8000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyDebts">Monthly Debts</Label>
                      <Input
                        id="monthlyDebts"
                        type="number"
                        value={monthlyDebts}
                        onChange={(e) => setMonthlyDebts(e.target.value)}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="downPayment">Down Payment</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="60000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="affordInterestRate">Interest Rate (%)</Label>
                      <Input
                        id="affordInterestRate"
                        type="number"
                        step="0.125"
                        value={affordInterestRate}
                        onChange={(e) => setAffordInterestRate(e.target.value)}
                        placeholder="6.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="affordLoanTerm">Loan Term (years)</Label>
                      <Select value={affordLoanTerm} onValueChange={setAffordLoanTerm}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dtiRatio">Max DTI Ratio (%)</Label>
                      <Input
                        id="dtiRatio"
                        type="number"
                        value={dtiRatio}
                        onChange={(e) => setDtiRatio(e.target.value)}
                        placeholder="43"
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-green-800 text-lg">Maximum Affordability</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Max Home Price:</span>
                        <span className="font-bold text-green-600 text-lg">
                          {formatCurrency(calculateAffordability().maxHomePrice)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Max Loan Amount:</span>
                        <span className="font-semibold">{formatCurrency(calculateAffordability().maxLoanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Max Monthly Payment:</span>
                        <span className="font-semibold">
                          {formatCurrency(calculateAffordability().maxMonthlyPayment)}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-green-200">
                      <p>* Based on {dtiRatio}% DTI ratio</p>
                      <p>* Does not include property taxes, insurance, or HOA fees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Refinance Calculator */}
          <TabsContent value="refinance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  Refinance Calculator
                </CardTitle>
                <CardDescription>Calculate potential savings and break-even point</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <h5 className="font-semibold text-gray-800">Current Loan</h5>
                      <div>
                        <Label htmlFor="currentLoanBalance">Current Loan Balance</Label>
                        <Input
                          id="currentLoanBalance"
                          type="number"
                          value={currentLoanBalance}
                          onChange={(e) => setCurrentLoanBalance(e.target.value)}
                          placeholder="250000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                        <Input
                          id="currentRate"
                          type="number"
                          step="0.125"
                          value={currentRate}
                          onChange={(e) => setCurrentRate(e.target.value)}
                          placeholder="7.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentPayment">Current Monthly Payment</Label>
                        <Input
                          id="currentPayment"
                          type="number"
                          value={currentPayment}
                          onChange={(e) => setCurrentPayment(e.target.value)}
                          placeholder="1663"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <h5 className="font-semibold text-gray-800">New Loan</h5>
                      <div>
                        <Label htmlFor="newRate">New Interest Rate (%)</Label>
                        <Input
                          id="newRate"
                          type="number"
                          step="0.125"
                          value={newRate}
                          onChange={(e) => setNewRate(e.target.value)}
                          placeholder="6.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="refiTerm">New Loan Term (years)</Label>
                        <Select value={refiTerm} onValueChange={setRefiTerm}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="30">30 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="closingCosts">Closing Costs</Label>
                        <Input
                          id="closingCosts"
                          type="number"
                          value={closingCosts}
                          onChange={(e) => setClosingCosts(e.target.value)}
                          placeholder="5000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-blue-800 text-lg">Refinance Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">New Monthly Payment:</span>
                        <span className="font-bold text-blue-600 text-lg">
                          {formatCurrency(calculateRefinance().newPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Monthly Savings:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(calculateRefinance().monthlySavings)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Break-Even Point:</span>
                        <span className="font-semibold">{calculateRefinance().breakEvenMonths.toFixed(1)} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Lifetime Savings:</span>
                        <span className="font-semibold">{formatCurrency(calculateRefinance().lifetimeSavings)}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-blue-200">
                      <p>
                        {calculateRefinance().breakEvenMonths < 36
                          ? "✓ Good refinance opportunity"
                          : "⚠ Break-even period may be too long"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DTI Calculator */}
          <TabsContent value="dti" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-red-600" />
                  Debt-to-Income Ratio Calculator
                </CardTitle>
                <CardDescription>Calculate front-end and back-end DTI ratios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="grossMonthlyIncome">Gross Monthly Income</Label>
                      <Input
                        id="grossMonthlyIncome"
                        type="number"
                        value={grossMonthlyIncome}
                        onChange={(e) => setGrossMonthlyIncome(e.target.value)}
                        placeholder="8000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="proposedPayment">Proposed Housing Payment (PITI)</Label>
                      <Input
                        id="proposedPayment"
                        type="number"
                        value={proposedPayment}
                        onChange={(e) => setProposedPayment(e.target.value)}
                        placeholder="2000"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Principal, Interest, Taxes, Insurance, and HOA (if applicable)
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="creditCardPayments">Credit Card Minimum Payments</Label>
                      <Input
                        id="creditCardPayments"
                        type="number"
                        value={creditCardPayments}
                        onChange={(e) => setCreditCardPayments(e.target.value)}
                        placeholder="200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carPayments">Car/Auto Loan Payments</Label>
                      <Input
                        id="carPayments"
                        type="number"
                        value={carPayments}
                        onChange={(e) => setCarPayments(e.target.value)}
                        placeholder="400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentLoanPayments">Student Loan Payments</Label>
                      <Input
                        id="studentLoanPayments"
                        type="number"
                        value={studentLoanPayments}
                        onChange={(e) => setStudentLoanPayments(e.target.value)}
                        placeholder="300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherDebts">Other Monthly Debts</Label>
                      <Input
                        id="otherDebts"
                        type="number"
                        value={otherDebts}
                        onChange={(e) => setOtherDebts(e.target.value)}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                      <h4 className="font-semibold text-purple-800 text-lg">DTI Results</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Front-End DTI:</span>
                          <span
                            className={`font-bold text-lg ${calculateDTI().frontEndDTI <= 28 ? "text-green-600" : calculateDTI().frontEndDTI <= 36 ? "text-yellow-600" : "text-red-600"}`}
                          >
                            {formatPercent(calculateDTI().frontEndDTI)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Back-End DTI:</span>
                          <span
                            className={`font-bold text-lg ${calculateDTI().backEndDTI <= 36 ? "text-green-600" : calculateDTI().backEndDTI <= 43 ? "text-yellow-600" : "text-red-600"}`}
                          >
                            {formatPercent(calculateDTI().backEndDTI)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Monthly Debts:</span>
                          <span className="font-semibold">{formatCurrency(calculateDTI().totalDebts)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <h5 className="font-semibold text-gray-800 text-sm">DTI Guidelines:</h5>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>
                          <strong>Front-End DTI:</strong> Housing payment ÷ Income
                        </p>
                        <p>
                          <strong>Back-End DTI:</strong> All debts ÷ Income
                        </p>
                        <p className="mt-2 pt-2 border-t border-gray-200">
                          <strong>Conventional:</strong> 28% / 36% (ideal)
                        </p>
                        <p>
                          <strong>FHA:</strong> 31% / 43% (max)
                        </p>
                        <p>
                          <strong>VA:</strong> No front-end / 41% (max)
                        </p>
                        <p>
                          <strong>Non-QM:</strong> Varies by program
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Down Payment Calculator */}
          <TabsContent value="downpayment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-600" />
                  Down Payment Calculator
                </CardTitle>
                <CardDescription>Calculate down payment amount and loan-to-value ratio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="homePrice">Home Purchase Price</Label>
                      <Input
                        id="homePrice"
                        type="number"
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                        placeholder="400000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="downPaymentPercent">Down Payment Percentage</Label>
                      <Input
                        id="downPaymentPercent"
                        type="number"
                        step="0.5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(e.target.value)}
                        placeholder="20"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <h5 className="font-semibold text-gray-800 text-sm">Common Down Payments:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDownPaymentPercent("3")}
                          className="text-xs"
                        >
                          3% (Conventional)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDownPaymentPercent("3.5")}
                          className="text-xs"
                        >
                          3.5% (FHA)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDownPaymentPercent("10")}
                          className="text-xs"
                        >
                          10%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDownPaymentPercent("15")}
                          className="text-xs"
                        >
                          15%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDownPaymentPercent("20")}
                          className="text-xs"
                        >
                          20% (No PMI)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDownPaymentPercent("25")}
                          className="text-xs"
                        >
                          25%
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-orange-800 text-lg">Down Payment Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Down Payment Amount:</span>
                        <span className="font-bold text-orange-600 text-lg">
                          {formatCurrency(calculateDownPayment().downPaymentAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Loan Amount Needed:</span>
                        <span className="font-semibold">{formatCurrency(calculateDownPayment().loanAmountNeeded)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Loan-to-Value (LTV):</span>
                        <span className="font-semibold">{formatPercent(calculateDownPayment().ltv)}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-orange-200">
                      <p>
                        {calculateDownPayment().ltv < 80
                          ? "✓ No PMI required (LTV under 80%)"
                          : "⚠ PMI required (LTV over 80%)"}
                      </p>
                      <p className="mt-2">
                        {calculateDownPayment().ltv <= 80
                          ? "Better loan terms typically available"
                          : "Consider increasing down payment to avoid PMI"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Amortization Schedule */}
          <TabsContent value="amortization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  Amortization Schedule
                </CardTitle>
                <CardDescription>View detailed payment breakdown over loan term</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amortLoanAmount">Loan Amount</Label>
                      <Input
                        id="amortLoanAmount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="300000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amortInterestRate">Interest Rate (%)</Label>
                      <Input
                        id="amortInterestRate"
                        type="number"
                        step="0.125"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="6.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amortLoanTerm">Loan Term (years)</Label>
                      <Select value={loanTerm} onValueChange={setLoanTerm}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                          <SelectItem value="40">40 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-indigo-800 text-lg">Loan Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Monthly Payment:</span>
                        <span className="font-bold text-indigo-600 text-lg">{formatCurrency(calculatePayment())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Total Payments:</span>
                        <span className="font-semibold">{formatCurrency(calculateTotalPayment())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Total Interest:</span>
                        <span className="font-semibold">{formatCurrency(calculateTotalInterest())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Number of Payments:</span>
                        <span className="font-semibold">{Number.parseFloat(loanTerm) * 12}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Payment Schedule</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">Payment #</th>
                            <th className="px-4 py-3 text-right font-semibold">Payment</th>
                            <th className="px-4 py-3 text-right font-semibold">Principal</th>
                            <th className="px-4 py-3 text-right font-semibold">Interest</th>
                            <th className="px-4 py-3 text-right font-semibold">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {generateAmortizationSchedule().map((payment, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-4 py-2 text-left">{payment.paymentNumber}</td>
                              <td className="px-4 py-2 text-right">{formatCurrency(payment.payment)}</td>
                              <td className="px-4 py-2 text-right text-green-600 font-medium">
                                {formatCurrency(payment.principal)}
                              </td>
                              <td className="px-4 py-2 text-right text-red-600">{formatCurrency(payment.interest)}</td>
                              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(payment.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
