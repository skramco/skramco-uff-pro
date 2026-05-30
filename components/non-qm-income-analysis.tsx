"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  calculateIncomeAnalysis,
  formatCurrency,
  recalculateBusinessRow,
} from "@/lib/asset-depletion-calculator"
import {
  assetCategoryLabel,
  calculateEligibleAmount,
  getEligiblePercent,
} from "@/lib/asset-eligibility"
import type {
  AssetCategory,
  AssetRow,
  BusinessIncomeRow,
  IncomeAnalysisInput,
  MismoParseResponse,
} from "@/types/non-qm-income-analysis"
import {
  AlertCircle,
  CheckCircle2,
  FileUp,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react"

const EMPTY_ANALYSIS: IncomeAnalysisInput = {
  borrowers: [
    {
      role: "B",
      firstName: "",
      lastName: "",
      isSelfEmployed: false,
    },
  ],
  businessIncomeRows: [],
  assets: [],
  loan: {
    noteAmount: 0,
    pitiaMonthly: 0,
    totalMonthlyLiabilities: 0,
    baseQualifyingIncome: 0,
  },
  reserveMonthsRequired: 6,
  residentialDepletionMonths: 36,
}

function SummaryMetric({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: "pass" | "fail" | "neutral"
}) {
  const valueClass =
    highlight === "pass"
      ? "text-green-700"
      : highlight === "fail"
        ? "text-red-600 font-semibold"
        : "text-gray-900"

  return (
    <div className="rounded border border-gray-300 bg-white px-3 py-2 min-w-[140px]">
      <p className="text-[11px] uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`text-sm font-medium ${valueClass}`}>{value}</p>
    </div>
  )
}

function createBusinessRow(): BusinessIncomeRow {
  return recalculateBusinessRow({
    id: `business-${Date.now()}`,
    included: true,
    companyName: "",
    ownershipPercent: 100,
    businessType: "Other",
    monthlyDeposits: 0,
    accountType: "Business",
    employeeCount: "0",
    productServiceSold: "",
    expenseFactor: 50,
    monthlyBusinessIncome: 0,
  })
}

function createAssetRow(): AssetRow {
  return {
    id: `asset-${Date.now()}`,
    assetType: "CheckingSavings",
    cashValue: 0,
    borrowerRole: "B",
    eligiblePercent: 1,
    eligibleAmount: 0,
    assetName: "",
    accountNumber: "",
    notes: "",
    isReserve: false,
  }
}

export default function NonQmIncomeAnalysisTool() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [analysisInput, setAnalysisInput] = useState<IncomeAnalysisInput>(EMPTY_ANALYSIS)
  const [parseSource, setParseSource] = useState<MismoParseResponse["source"] | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const businessRows = useMemo(
    () => analysisInput.businessIncomeRows.map(recalculateBusinessRow),
    [analysisInput.businessIncomeRows],
  )

  const computedInput = useMemo(
    () => ({
      ...analysisInput,
      businessIncomeRows: businessRows,
    }),
    [analysisInput, businessRows],
  )

  const results = useMemo(() => calculateIncomeAnalysis(computedInput), [computedInput])

  const primaryBorrower = analysisInput.borrowers.find((b) => b.role === "B")
  const coBorrower = analysisInput.borrowers.find((b) => b.role === "C")

  const processMismoFile = useCallback(async (file: File) => {
    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/parse-mismo", {
        method: "POST",
        body: formData,
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to parse MISMO file.")
      }

      const parsed = payload as MismoParseResponse
      setAnalysisInput(parsed.analysis)
      setParseSource(parsed.source)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) processMismoFile(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) processMismoFile(file)
  }

  const updateAsset = (id: string, updates: Partial<AssetRow>) => {
    setAnalysisInput((current) => ({
      ...current,
      assets: current.assets.map((asset) => {
        if (asset.id !== id) return asset

        const next = { ...asset, ...updates }
        const borrowerAge = current.borrowers.find((b) => b.role === next.borrowerRole)?.age
        const eligiblePercent =
          updates.eligiblePercent ??
          getEligiblePercent(next.assetType, borrowerAge)
        const cashValue = updates.cashValue ?? next.cashValue

        return {
          ...next,
          eligiblePercent,
          eligibleAmount: calculateEligibleAmount(cashValue, eligiblePercent),
          isReserve:
            updates.isReserve ??
            (updates.notes ?? next.notes).toLowerCase().includes("reserve"),
        }
      }),
    }))
  }

  const updateBusinessRow = (id: string, updates: Partial<BusinessIncomeRow>) => {
    setAnalysisInput((current) => ({
      ...current,
      businessIncomeRows: current.businessIncomeRows.map((row) =>
        row.id === id ? recalculateBusinessRow({ ...row, ...updates }) : row,
      ),
    }))
  }

  const resetAnalysis = () => {
    setAnalysisInput(EMPTY_ANALYSIS)
    setParseSource(null)
    setUploadError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-red-600" />
            Upload MISMO 3.4 File
          </CardTitle>
          <CardDescription>
            Upload an Encompass or LOS MISMO 3.4 export. We extract borrower, asset, liability, and
            loan data, optionally enrich it through your conversion API, and populate this Non-QM
            income worksheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragOver={(event) => {
              event.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragActive ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <FileUp className="mx-auto mb-3 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-700">
              Drag and drop a MISMO 3.4 XML file here, or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xml,application/xml,text/xml"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Select MISMO File
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={resetAnalysis}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Worksheet
              </Button>
            </div>
          </div>

          {parseSource && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Data loaded using{" "}
              {parseSource === "external" ? "Vesta MISMO API (with local fallback fields)" : "local MISMO parser"}.
            </div>
          )}

          {uploadError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="rounded-lg border border-gray-300 bg-[#ececec] p-4">
        <div className="mb-4 flex flex-wrap gap-3">
          <SummaryMetric label="Non QM DTI" value={`${results.nonQmDti.toFixed(3)}%`} />
          <SummaryMetric label="DSCR Ratio" value={results.dscrRatio.toFixed(3)} />
          <SummaryMetric
            label="No Ratio Elig"
            value={results.noRatioStatus}
            highlight={results.noRatioEligible ? "pass" : "fail"}
          />
          <SummaryMetric label="Asset Income" value={formatCurrency(results.assetIncome)} />
          <SummaryMetric
            label="Self Employed"
            value={results.selfEmployed ? "Y" : "N"}
          />
          <SummaryMetric
            label="Bank Statement Income"
            value={formatCurrency(results.bankStatementIncome)}
          />
        </div>

        {analysisInput.loan.propertyAddress && (
          <p className="mb-4 text-sm text-gray-700">
            <span className="font-medium">Subject Property:</span> {analysisInput.loan.propertyAddress}
          </p>
        )}

        <section className="mb-6 rounded border border-gray-300 bg-[#f5f5f5]">
          <div className="border-b border-gray-300 bg-[#ddd] px-3 py-2 text-sm font-semibold">
            Self Employment - Bank Statement Analysis
          </div>
          <div className="overflow-x-auto p-3">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="bg-white">
                  {[
                    "Include",
                    "Co. Name",
                    "Own %",
                    "Business Type",
                    "Mo. Deposits",
                    "Acct Type",
                    "# Employees",
                    "Product-Service Sold",
                    "Exp Factor",
                    "Mo Business Income",
                    "",
                  ].map((header) => (
                    <th key={header} className="border border-gray-300 px-2 py-1 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {businessRows.map((row) => (
                  <tr key={row.id} className="bg-white">
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={row.included}
                        onChange={(event) =>
                          updateBusinessRow(row.id, { included: event.target.checked })
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.companyName}
                        onChange={(event) =>
                          updateBusinessRow(row.id, { companyName: event.target.value })
                        }
                        className="h-7 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        value={row.ownershipPercent}
                        onChange={(event) =>
                          updateBusinessRow(row.id, {
                            ownershipPercent: Number(event.target.value),
                          })
                        }
                        className="h-7 w-16 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.businessType}
                        onChange={(event) =>
                          updateBusinessRow(row.id, { businessType: event.target.value })
                        }
                        className="h-7 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        value={row.monthlyDeposits || ""}
                        onChange={(event) =>
                          updateBusinessRow(row.id, {
                            monthlyDeposits: Number(event.target.value),
                          })
                        }
                        className="h-7 w-24 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={row.accountType}
                        onValueChange={(value: "Business" | "Personal") =>
                          updateBusinessRow(row.id, { accountType: value })
                        }
                      >
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.employeeCount}
                        onChange={(event) =>
                          updateBusinessRow(row.id, { employeeCount: event.target.value })
                        }
                        className="h-7 w-16 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.productServiceSold}
                        onChange={(event) =>
                          updateBusinessRow(row.id, { productServiceSold: event.target.value })
                        }
                        className="h-7 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        value={row.expenseFactor}
                        onChange={(event) =>
                          updateBusinessRow(row.id, { expenseFactor: Number(event.target.value) })
                        }
                        className="h-7 w-16 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right font-medium text-green-700">
                      {formatCurrency(row.monthlyBusinessIncome)}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          setAnalysisInput((current) => ({
                            ...current,
                            businessIncomeRows: current.businessIncomeRows.filter(
                              (item) => item.id !== row.id,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() =>
                setAnalysisInput((current) => ({
                  ...current,
                  businessIncomeRows: [...current.businessIncomeRows, createBusinessRow()],
                }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Business Row
            </Button>
            <p className="mt-3 text-[11px] text-gray-600">
              Expense Factor Business Bank Accounts: CPA Letter only required for an expense factor
              &lt; 50%. Personal Bank Accounts: Set Expense Factor at 0%.
            </p>
          </div>
        </section>

        <section className="rounded border border-gray-300 bg-[#f5f5f5]">
          <div className="border-b border-gray-300 bg-[#ddd] px-3 py-2 text-sm font-semibold">
            Asset Catalog - Asset Depletion and No Ratio Calculations
          </div>
          <div className="overflow-x-auto p-3">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="bg-white">
                  {[
                    "Asset Type",
                    "Cash Value",
                    "B/C",
                    "Eligible %",
                    "Eligible Assets",
                    "Asset Name - Account Number - Notes",
                    "",
                  ].map((header) => (
                    <th key={header} className="border border-gray-300 px-2 py-1 text-left font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analysisInput.assets.map((asset) => (
                  <tr key={asset.id} className="bg-white">
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={asset.assetType}
                        onValueChange={(value: AssetCategory) =>
                          updateAsset(asset.id, { assetType: value })
                        }
                      >
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            [
                              "CheckingSavings",
                              "StocksBondsMutualFunds",
                              "IRA401k403b",
                              "Other",
                            ] as AssetCategory[]
                          ).map((type) => (
                            <SelectItem key={type} value={type}>
                              {assetCategoryLabel(type)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        type="number"
                        value={asset.cashValue || ""}
                        onChange={(event) =>
                          updateAsset(asset.id, { cashValue: Number(event.target.value) })
                        }
                        className="h-7 w-28 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Select
                        value={asset.borrowerRole}
                        onValueChange={(value: "B" | "C") =>
                          updateAsset(asset.id, { borrowerRole: value })
                        }
                      >
                        <SelectTrigger className="h-7 w-16 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right">
                      {(asset.eligiblePercent * 100).toFixed(0)}%
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right font-medium">
                      {formatCurrency(asset.eligibleAmount)}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={[asset.assetName, asset.accountNumber, asset.notes]
                          .filter(Boolean)
                          .join(" - ")}
                        onChange={(event) => {
                          const parts = event.target.value.split(" - ")
                          updateAsset(asset.id, {
                            assetName: parts[0] ?? "",
                            accountNumber: parts[1] ?? "",
                            notes: parts.slice(2).join(" - "),
                          })
                        }}
                        className="h-7 text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          setAnalysisInput((current) => ({
                            ...current,
                            assets: current.assets.filter((item) => item.id !== asset.id),
                          }))
                        }
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() =>
                setAnalysisInput((current) => ({
                  ...current,
                  assets: [...current.assets, createAssetRow()],
                }))
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Asset Row
            </Button>
          </div>

          <div className="grid gap-4 border-t border-gray-300 p-4 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Total Eligible Assets Borrower</span>
                <span className="font-medium">{formatCurrency(results.totalEligibleAssetsBorrower)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Total Eligible Assets Co-Borrower</span>
                <span className="font-medium">
                  {formatCurrency(results.totalEligibleAssetsCoBorrower)}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Eligible Assets All Borrowers</span>
                <span>{formatCurrency(results.totalEligibleAssetsAll)}</span>
              </div>
            </div>

            <div className="rounded border border-gray-300 bg-white p-3 text-sm">
              <p className="font-semibold">Borrower Info</p>
              <p className="mt-2">
                Borrower DOB / Age:{" "}
                {primaryBorrower?.dateOfBirth
                  ? `${primaryBorrower.dateOfBirth} | ${primaryBorrower.age ?? "—"}`
                  : "—"}
              </p>
              <p>
                CoBorrower DOB / Age:{" "}
                {coBorrower?.dateOfBirth
                  ? `${coBorrower.dateOfBirth} | ${coBorrower.age ?? "—"}`
                  : "—"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 border-t border-gray-300 p-4 md:grid-cols-2">
            <div className="rounded border border-gray-300 bg-white p-3">
              <p className="mb-3 text-sm font-semibold">Asset Depletion Results</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Residential Program (36 Mo.)</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {formatCurrency(results.borrowerDepletion36 + results.coBorrowerDepletion36)}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Borrower</span>
                  <span>{formatCurrency(results.borrowerDepletion36)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Co-Borrower</span>
                  <span>{formatCurrency(results.coBorrowerDepletion36)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span>84 Mo. Depletion (Income Only)</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {formatCurrency(results.borrowerDepletion84 + results.coBorrowerDepletion84)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="rounded border border-gray-300 bg-white p-3">
              <p className="mb-3 text-sm font-semibold">No Ratio Results</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Reserves Required</span>
                  <span>{formatCurrency(results.reservesRequiredAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <span
                    className={
                      results.noRatioEligible ? "font-semibold text-green-700" : "font-semibold text-red-600"
                    }
                  >
                    {results.noRatioStatus}
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reserve-months" className="text-xs">
                    Enter Number of Months Reserves Required
                  </Label>
                  <Input
                    id="reserve-months"
                    type="number"
                    min={1}
                    value={analysisInput.reserveMonthsRequired}
                    onChange={(event) =>
                      setAnalysisInput((current) => ({
                        ...current,
                        reserveMonthsRequired: Number(event.target.value) || 6,
                      }))
                    }
                    className="h-8"
                  />
                </div>
                <div className="rounded bg-gray-50 p-2">
                  <p className="text-xs text-gray-600">No Ratio Results (required total eligible assets)</p>
                  <p className="text-base font-semibold">{formatCurrency(results.noRatioRequiredAssets)}</p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Formula: Note Amount + (PITIA × Reserve Months)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded border border-gray-300 bg-white p-4">
          <p className="mb-3 text-sm font-semibold">Loan &amp; Income Inputs</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="note-amount" className="text-xs">
                Note Amount
              </Label>
              <Input
                id="note-amount"
                type="number"
                value={analysisInput.loan.noteAmount || ""}
                onChange={(event) =>
                  setAnalysisInput((current) => ({
                    ...current,
                    loan: { ...current.loan, noteAmount: Number(event.target.value) },
                  }))
                }
                className="mt-1 h-8"
              />
            </div>
            <div>
              <Label htmlFor="pitia" className="text-xs">
                PITIA (Monthly)
              </Label>
              <Input
                id="pitia"
                type="number"
                value={analysisInput.loan.pitiaMonthly || ""}
                onChange={(event) =>
                  setAnalysisInput((current) => ({
                    ...current,
                    loan: { ...current.loan, pitiaMonthly: Number(event.target.value) },
                  }))
                }
                className="mt-1 h-8"
              />
            </div>
            <div>
              <Label htmlFor="liabilities" className="text-xs">
                Other Monthly Liabilities
              </Label>
              <Input
                id="liabilities"
                type="number"
                value={analysisInput.loan.totalMonthlyLiabilities || ""}
                onChange={(event) =>
                  setAnalysisInput((current) => ({
                    ...current,
                    loan: {
                      ...current.loan,
                      totalMonthlyLiabilities: Number(event.target.value),
                    },
                  }))
                }
                className="mt-1 h-8"
              />
            </div>
            <div>
              <Label htmlFor="base-income" className="text-xs">
                Base Qualifying Income
              </Label>
              <Input
                id="base-income"
                type="number"
                value={analysisInput.loan.baseQualifyingIncome || ""}
                onChange={(event) =>
                  setAnalysisInput((current) => ({
                    ...current,
                    loan: {
                      ...current.loan,
                      baseQualifyingIncome: Number(event.target.value),
                    },
                  }))
                }
                className="mt-1 h-8"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            Total qualifying income:{" "}
            <span className="font-medium">{formatCurrency(results.totalQualifyingIncome)}</span>{" "}
            (base + bank statement + asset depletion)
          </p>
        </section>
      </div>
    </div>
  )
}
