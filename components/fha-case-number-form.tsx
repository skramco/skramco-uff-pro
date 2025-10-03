"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

interface FHACaseNumberFormProps {
  isOpen: boolean
  onClose: () => void
}

export function FHACaseNumberForm({ isOpen, onClose }: FHACaseNumberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [loanPurpose, setLoanPurpose] = useState<"purchase" | "refinance">("purchase")
  const [isCondo, setIsCondo] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/send-fha-case-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => {
          setSubmitSuccess(false)
          onClose()
          e.currentTarget.reset()
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">FHA Case Number Request Form</DialogTitle>
          <DialogDescription>
            Complete this form to request an FHA Case Number. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Broker Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Broker Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brokerName">
                    Broker Name <span className="text-red-600">*</span>
                  </Label>
                  <Input id="brokerName" name="brokerName" required />
                </div>
                <div>
                  <Label htmlFor="taxId">
                    Tax ID#/EIN <span className="text-red-600">*</span>
                  </Label>
                  <Input id="taxId" name="taxId" required />
                </div>
                <div>
                  <Label htmlFor="loanOfficerName">
                    Loan Officer Name <span className="text-red-600">*</span>
                  </Label>
                  <Input id="loanOfficerName" name="loanOfficerName" required />
                </div>
                <div>
                  <Label htmlFor="loanOfficerNMLS">
                    Loan Officer NMLS # <span className="text-red-600">*</span>
                  </Label>
                  <Input id="loanOfficerNMLS" name="loanOfficerNMLS" required />
                </div>
                <div>
                  <Label htmlFor="contactName">
                    Contact Name <span className="text-red-600">*</span>
                  </Label>
                  <Input id="contactName" name="contactName" required />
                </div>
                <div>
                  <Label htmlFor="contactPhone">
                    Contact Phone <span className="text-red-600">*</span>
                  </Label>
                  <Input id="contactPhone" name="contactPhone" type="tel" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="contactEmail">
                    Contact Email <span className="text-red-600">*</span>
                  </Label>
                  <Input id="contactEmail" name="contactEmail" type="email" required />
                </div>
              </div>
            </div>

            {/* Borrower Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Borrower Information</h3>

              {/* Borrower 1 */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-900">Primary Borrower</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="borrower1Name">
                      Full Name <span className="text-red-600">*</span>
                    </Label>
                    <Input id="borrower1Name" name="borrower1Name" placeholder="First, MI, Last" required />
                  </div>
                  <div>
                    <Label htmlFor="borrower1DOB">
                      Date of Birth <span className="text-red-600">*</span>
                    </Label>
                    <Input id="borrower1DOB" name="borrower1DOB" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="borrower1SSN">
                      SSN <span className="text-red-600">*</span>
                    </Label>
                    <Input id="borrower1SSN" name="borrower1SSN" placeholder="XXX-XX-XXXX" required />
                  </div>
                </div>
              </div>

              {/* Borrower 2 */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-900">Co-Borrower (if applicable)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="borrower2Name">Full Name</Label>
                    <Input id="borrower2Name" name="borrower2Name" placeholder="First, MI, Last" />
                  </div>
                  <div>
                    <Label htmlFor="borrower2DOB">Date of Birth</Label>
                    <Input id="borrower2DOB" name="borrower2DOB" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="borrower2SSN">SSN</Label>
                    <Input id="borrower2SSN" name="borrower2SSN" placeholder="XXX-XX-XXXX" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="propertyAddress">
                    Property Address <span className="text-red-600">*</span>
                  </Label>
                  <Input id="propertyAddress" name="propertyAddress" required />
                </div>
                <div>
                  <Label htmlFor="unitNumber">Unit #</Label>
                  <Input id="unitNumber" name="unitNumber" />
                </div>
                <div>
                  <Label htmlFor="city">
                    City <span className="text-red-600">*</span>
                  </Label>
                  <Input id="city" name="city" required />
                </div>
                <div>
                  <Label htmlFor="state">
                    State <span className="text-red-600">*</span>
                  </Label>
                  <Input id="state" name="state" required />
                </div>
                <div>
                  <Label htmlFor="zipCode">
                    Zip Code <span className="text-red-600">*</span>
                  </Label>
                  <Input id="zipCode" name="zipCode" required />
                </div>
                <div>
                  <Label htmlFor="yearBuilt">Month & Year Built</Label>
                  <Input id="yearBuilt" name="yearBuilt" placeholder="MM/YYYY" />
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Loan Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>
                    Loan Purpose <span className="text-red-600">*</span>
                  </Label>
                  <RadioGroup
                    value={loanPurpose}
                    onValueChange={(value) => setLoanPurpose(value as "purchase" | "refinance")}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="purchase" id="purchase" />
                      <Label htmlFor="purchase" className="font-normal">
                        Purchase
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refinance" id="refinance" />
                      <Label htmlFor="refinance" className="font-normal">
                        Refinance
                      </Label>
                    </div>
                  </RadioGroup>
                  <input type="hidden" name="loanPurpose" value={loanPurpose} />
                </div>

                <div>
                  <Label>
                    Rate Type <span className="text-red-600">*</span>
                  </Label>
                  <RadioGroup name="rateType" className="flex gap-4 mt-2" defaultValue="fixed">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed" className="font-normal">
                        Fixed
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="arm" id="arm" />
                      <Label htmlFor="arm" className="font-normal">
                        ARM
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="amortizationTerm">
                    Amortization Term (Years) <span className="text-red-600">*</span>
                  </Label>
                  <Input id="amortizationTerm" name="amortizationTerm" type="number" required />
                </div>
              </div>

              {/* Purchase Specific */}
              {loanPurpose === "purchase" && (
                <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-gray-900">Purchase Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hudREO" name="hudREO" />
                      <Label htmlFor="hudREO" className="font-normal">
                        HUD previously sold as REO
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor="reoProcessingType">Processing Type</Label>
                      <RadioGroup name="reoProcessingType" className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="na" id="na" />
                          <Label htmlFor="na" className="font-normal">
                            N/A
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hudREOWithAppraisal" id="hudREOWithAppraisal" />
                          <Label htmlFor="hudREOWithAppraisal" className="font-normal">
                            HUD REO with Appraisal
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="reoCaseNumber">REO Case Number (if applicable)</Label>
                      <Input id="reoCaseNumber" name="reoCaseNumber" />
                    </div>
                  </div>
                </div>
              )}

              {/* Refinance Specific */}
              {loanPurpose === "refinance" && (
                <div className="bg-green-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-gray-900">Refinance Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Cash Out Refinance?</Label>
                      <RadioGroup name="cashOutRefi" className="flex gap-4 mt-2" defaultValue="no">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="cashOutNo" />
                          <Label htmlFor="cashOutNo" className="font-normal">
                            No
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="cashOutYes" />
                          <Label htmlFor="cashOutYes" className="font-normal">
                            Yes
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Previous Loan Type</Label>
                      <RadioGroup name="previousLoanType" className="flex gap-4 mt-2" defaultValue="conv">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="conv" id="conv" />
                          <Label htmlFor="conv" className="font-normal">
                            Conventional
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fha" id="fhaPrevious" />
                          <Label htmlFor="fhaPrevious" className="font-normal">
                            FHA
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="previousFHACaseNumber">Previous FHA Case Number (if applicable)</Label>
                      <Input id="previousFHACaseNumber" name="previousFHACaseNumber" />
                    </div>

                    <div>
                      <Label>Streamline?</Label>
                      <RadioGroup name="streamline" className="flex gap-4 mt-2" defaultValue="no">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="streamlineNo" />
                          <Label htmlFor="streamlineNo" className="font-normal">
                            No
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="streamlineYes" />
                          <Label htmlFor="streamlineYes" className="font-normal">
                            Yes
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Streamline with Appraisal?</Label>
                      <RadioGroup name="streamlineWithAppraisal" className="flex gap-4 mt-2" defaultValue="no">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="streamlineAppraisalNo" />
                          <Label htmlFor="streamlineAppraisalNo" className="font-normal">
                            No
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="streamlineAppraisalYes" />
                          <Label htmlFor="streamlineAppraisalYes" className="font-normal">
                            Yes
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* Condo Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isCondo" checked={isCondo} onCheckedChange={(checked) => setIsCondo(!!checked)} />
                  <Label htmlFor="isCondo" className="font-normal">
                    Property is a Condo (Condo project must be FHA approved)
                  </Label>
                </div>

                {isCondo && (
                  <div className="bg-purple-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fhaProjectId">
                        FHA Project ID <span className="text-red-600">*</span>
                      </Label>
                      <Input id="fhaProjectId" name="fhaProjectId" required />
                    </div>
                    <div>
                      <Label htmlFor="condoProjectName">
                        Condo Project Name <span className="text-red-600">*</span>
                      </Label>
                      <Input id="condoProjectName" name="condoProjectName" required />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4 border-t">
              <Button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : submitSuccess ? (
                  "✓ Submitted Successfully!"
                ) : (
                  "Submit Request"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>

            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Your FHA Case Number request has been submitted successfully. You will be contacted shortly.
              </div>
            )}
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
