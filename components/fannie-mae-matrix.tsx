"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FannieMaeMatrix() {
  return (
    <div className="space-y-8 p-6">
      {/* Header with Download Button */}
      <div className="border-b pb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fannie Mae Conventional Matrix</h2>
          <p className="text-sm text-gray-600">Conforming Loans - 2025 Guidelines</p>
        </div>
        <Button
          onClick={() => {
            const link = document.createElement("a")
            link.href = "/pdfs/uff-matrix-conventional-fanniemae-2025.pdf"
            link.download = "UFF_Matrix_Conventional_FannieMae_2025.pdf"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }}
          className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Loan Terms */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Available Terms</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Fixed-Rate Terms:</strong> 10-year, 15-year, 20-year, 25-year, 30-year
          </li>
          <li>
            <strong>ARM Terms:</strong> 5/6 SOFR, 7/6 SOFR, 10/6 SOFR (conversion to fixed-rate option available)
          </li>
          <li>
            <strong>IO Terms:</strong> Not available (Fannie Mae does not offer interest-only options for conventional
            loans)
          </li>
        </ul>
      </div>

      {/* Standard Conventional Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard Conventional Loans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Occupancy</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Units</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />({">"}75% LTV)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />
                  (≤75% LTV)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Reserves
                  <br />
                  (Months)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Max DTI
                  <br />
                  (Manual UW)
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">640</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97%</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">640</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">640</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">700</td>
                <td className="border border-gray-300 px-4 py-2">660</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">640</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">640</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">2 (per property)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">640</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">2 (per property)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">2 (per property)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">2-8 (based on # properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">2-8 (based on # properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">2-8 (based on # properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">6-8 (based on # properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">6-8 (based on # properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">70%</td>
                <td className="border border-gray-300 px-4 py-2">70%</td>
                <td className="border border-gray-300 px-4 py-2">6-8 (based on # properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p>
            <strong>Notes:</strong> High-balance loans cap at 95% LTV for primary 1-unit. DU approval required; manual
            UW has stricter DTI. Reserves increase for multiple properties (e.g., +2 months per additional
            investment/second home).
          </p>
          <p className="mt-2">
            <strong>Source:</strong> Fannie Mae Eligibility Matrix (July 2025)
          </p>
        </div>
      </div>

      {/* HomeReady Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Fannie Mae HomeReady Matrix</h3>
        <p className="text-sm text-gray-600 mb-4">
          For low- to moderate-income borrowers (≤80% AMI). Allows reduced MI, flexible down payment sources, and can
          combine with Community Seconds. DU approval required.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Occupancy</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Units</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />({">"}80% LTV)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />
                  (≤80% LTV)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Reserves
                  <br />
                  (Months)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Max DTI
                  <br />
                  (Manual)
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">105% (w/ Seconds)</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">105% (w/ Seconds)</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2" colSpan={9}>
                  Not Eligible
                </td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2" colSpan={9}>
                  Not Eligible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* HomeStyle Renovation Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Fannie Mae HomeStyle Renovation Matrix</h3>
        <p className="text-sm text-gray-600 mb-4">
          Financing purchase/refi + repairs (up to 75% as-completed value). Contingency 10-20%. LTV/CLTV based on
          as-completed. DU required.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-purple-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Occupancy</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Units</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />({">"}75% LTV)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />
                  (≤75% LTV)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Reserves
                  <br />
                  (Months)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max DTI</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">105%</td>
                <td className="border border-gray-300 px-4 py-2">0-2</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">700</td>
                <td className="border border-gray-300 px-4 py-2">660</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">95%</td>
                <td className="border border-gray-300 px-4 py-2">0-2</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Limited Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">660</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">0-2</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">6</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Limited CO</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">2 (per property)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">2 (per property)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Limited CO</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">2-8 (per properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Limited CO</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">6-8 (per properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">75%</td>
                <td className="border border-gray-300 px-4 py-2">2-8 (per properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">2-4</td>
                <td className="border border-gray-300 px-4 py-2">FRM/ARM</td>
                <td className="border border-gray-300 px-4 py-2">720</td>
                <td className="border border-gray-300 px-4 py-2">680</td>
                <td className="border border-gray-300 px-4 py-2">70%</td>
                <td className="border border-gray-300 px-4 py-2">70%</td>
                <td className="border border-gray-300 px-4 py-2">6-8 (per properties)</td>
                <td className="border border-gray-300 px-4 py-2">45%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p>
            <strong>Notes:</strong> {">"}95% LTV requires homeownership education for first-time buyers. Renovation max
            75% after-repair value; consultant for structural/{">"}$50k. Completion in 6 months. High-balance caps at
            95%.
          </p>
          <p className="mt-2">
            <strong>Sources:</strong> Fannie Mae Eligibility Matrix (2025), Selling Guide B5-3.2-02 (2025)
          </p>
        </div>
      </div>

      {/* Footer/Disclaimer */}
      <div className="border-t pt-6 text-xs text-gray-500">
        <p className="mb-2">
          <strong>United Fidelity Funding Corp. NMLS #34381.</strong> Equal Housing Lender.
        </p>
        <p>
          This matrix is provided for informational purposes only and does not constitute a commitment to lend or an
          offer to extend credit. All loan approvals are subject to credit review, underwriting guidelines, program
          eligibility, interest rates, and terms, which are subject to change without notice based on applicant
          qualifications, market conditions, and regulatory requirements. Rates, fees, and programs may vary by state.
          Not all products or options are available in all states. Consult a licensed loan officer for details.
        </p>
        <p className="mt-2">
          Licensed as a residential mortgage lender in almost every state. For state-specific licensing information,
          visit www.nmlsconsumeraccess.org.
        </p>
        <p className="mt-2">© 2025 United Fidelity Funding Corp. All rights reserved.</p>
      </div>
    </div>
  )
}
