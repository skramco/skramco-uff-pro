const DEFAULT_VESTA_API_URL = "https://uff.beta.vesta.com/api/v1/loans/convert-mismo"
const DEFAULT_VESTA_API_VERSION = "26.2"

export interface VestaMismoConfig {
  apiUrl: string
  apiToken: string
  apiVersion: string
}

export function getVestaMismoConfig(): VestaMismoConfig | null {
  const apiToken = process.env.MISMO_CONVERSION_API_KEY ?? process.env.VESTA_API_TOKEN
  const apiUrl =
    process.env.MISMO_CONVERSION_API_URL ??
    process.env.VESTA_API_URL ??
    DEFAULT_VESTA_API_URL
  const apiVersion =
    process.env.MISMO_CONVERSION_API_VERSION ??
    process.env.VESTA_API_VERSION ??
    DEFAULT_VESTA_API_VERSION

  if (!apiToken) return null

  return { apiUrl, apiToken, apiVersion }
}

export async function convertMismoWithVesta(xmlContent: string): Promise<unknown> {
  const config = getVestaMismoConfig()
  if (!config) {
    throw new Error("MISMO conversion API token is not configured.")
  }

  const response = await fetch(config.apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Token ${config.apiToken}`,
      "X-Api-Version": config.apiVersion,
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    body: xmlContent,
  })

  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(
      `Vesta MISMO conversion failed (${response.status}): ${responseText.slice(0, 500)}`,
    )
  }

  try {
    return JSON.parse(responseText) as unknown
  } catch {
    throw new Error("Vesta MISMO conversion returned a non-JSON response.")
  }
}
