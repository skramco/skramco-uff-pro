import { NextResponse } from "next/server"
import { isNonQmIncomeAnalysisEnabled } from "@/lib/feature-flags"
import { parseMismoXml } from "@/lib/mismo-parser"
import { convertMismoWithVesta, getVestaMismoConfig } from "@/lib/vesta-mismo-client"
import { mapVestaResponseToAnalysis } from "@/lib/vesta-loan-mapper"
import type { MismoParseResponse } from "@/types/non-qm-income-analysis"

export const runtime = "nodejs"

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export async function POST(request: Request) {
  if (!isNonQmIncomeAnalysisEnabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  try {
    const contentType = request.headers.get("content-type") ?? ""
    let xmlContent = ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const file = formData.get("file")

      if (!(file instanceof File)) {
        return NextResponse.json({ error: "A MISMO 3.4 XML file is required." }, { status: 400 })
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json({ error: "File exceeds the 10 MB upload limit." }, { status: 400 })
      }

      xmlContent = await file.text()
    } else if (contentType.includes("application/xml") || contentType.includes("text/xml")) {
      xmlContent = await request.text()
    } else {
      const body = await request.json()
      xmlContent = body.xml ?? body.content ?? ""
    }

    if (!xmlContent.trim()) {
      return NextResponse.json({ error: "MISMO XML content is empty." }, { status: 400 })
    }

    if (!xmlContent.includes("<") || !xmlContent.toLowerCase().includes("message")) {
      return NextResponse.json(
        { error: "Invalid MISMO file. Expected a MISMO 3.4 XML document." },
        { status: 400 },
      )
    }

    const localAnalysis = parseMismoXml(xmlContent)
    let source: MismoParseResponse["source"] = "local"
    let raw: Record<string, unknown> | undefined
    let analysis = localAnalysis

    const vestaConfig = getVestaMismoConfig()
    if (vestaConfig) {
      try {
        const vestaResponse = await convertMismoWithVesta(xmlContent)
        analysis = mapVestaResponseToAnalysis(vestaResponse, localAnalysis)
        source = "external"
        raw =
          vestaResponse && typeof vestaResponse === "object"
            ? (vestaResponse as Record<string, unknown>)
            : { data: vestaResponse }
      } catch (externalError) {
        console.warn("Vesta MISMO conversion failed, using local parser:", externalError)
        if (process.env.MISMO_CONVERSION_REQUIRE_EXTERNAL === "true") {
          throw externalError
        }
      }
    }

    const response: MismoParseResponse = {
      source,
      raw,
      analysis,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("MISMO parse error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to parse MISMO file.",
      },
      { status: 500 },
    )
  }
}
