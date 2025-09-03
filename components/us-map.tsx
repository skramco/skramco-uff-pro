"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"

// Updated licensedStates to reflect the active states from the new data
const licensedStates = new Set([
  "AL",
  "AZ",
  "AR",
  "CA",
  "CO",
  "FL",
  "GA",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "SC",
  "SD",
  "TN",
  "TX",
  "VA",
  "WA",
  "WI",
])

const stateNames: { [key: string]: string } = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
}

export function USMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const width = 960
    const height = 600
    const path = d3.geoPath()

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas/states-albers-10m.json").then((us: any) => {
      const states = topojson.feature(us, us.objects.states)

      svg
        .selectAll("path")
        .data(states.features)
        .join("path")
        .attr("d", path)
        .attr("fill", (d: any) => {
          const id = d.id
          const abbrev = idToStateAbbrev[id]
          return licensedStates.has(abbrev) ? "#e10404" : "#e5e7eb" // Changed to red
        })
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 0.5)
        .attr("class", "cursor-pointer transition-all duration-200 hover:fill-red-400") // Hover also changed to red
        .on("click", (event: any, d: any) => {
          const id = d.id
          const abbrev = idToStateAbbrev[id]
          setSelected(abbrev || null)
        })
    })
  }, [])

  // Mapping from FIPS state code to USPS abbreviation
  const idToStateAbbrev: { [key: string]: string } = {
    "01": "AL",
    "02": "AK",
    "04": "AZ",
    "05": "AR",
    "06": "CA",
    "08": "CO",
    "09": "CT",
    "10": "DE",
    "11": "DC",
    "12": "FL",
    "13": "GA",
    "15": "HI",
    "16": "ID",
    "17": "IL",
    "18": "IN",
    "19": "IA",
    "20": "KS",
    "21": "KY",
    "22": "LA",
    "23": "ME",
    "24": "MD",
    "25": "MA",
    "26": "MI",
    "27": "MN",
    "28": "MS",
    "29": "MO",
    "30": "MT",
    "31": "NE",
    "32": "NV",
    "33": "NH",
    "34": "NJ",
    "35": "NM",
    "36": "NY",
    "37": "NC",
    "38": "ND",
    "39": "OH",
    "40": "OK",
    "41": "OR",
    "42": "PA",
    "44": "RI",
    "45": "SC",
    "46": "SD",
    "47": "TN",
    "48": "TX",
    "49": "UT",
    "50": "VT",
    "51": "VA",
    "53": "WA",
    "54": "WV",
    "55": "WI",
    "56": "WY",
  }

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold mb-4">Licensed States</h2>
      <svg ref={svgRef} width={960} height={600}></svg>
      {selected && (
        <div
          className={`mt-4 p-3 rounded-lg text-center ${licensedStates.has(selected) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {licensedStates.has(selected) ? (
            <p className="font-semibold text-lg">🎉 Great news! We are licensed in {stateNames[selected]}!</p>
          ) : (
            <p className="font-semibold text-lg">🚧 Currently, we are not licensed in {stateNames[selected]}.</p>
          )}
          <p className="text-sm mt-1">
            Selected: {stateNames[selected]} ({selected})
          </p>
        </div>
      )}
    </div>
  )
}

export default USMap
