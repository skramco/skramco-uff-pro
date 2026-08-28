export const portalScreens = [
  {
    src: "/images/pro-portal-my-pipeline.png",
    label: "Pipeline",
    alt: "PRO Portal Pipeline: origination, submitted, funded, and Piper alerts",
  },
  {
    src: "/images/pro-portal-overview.png",
    label: "Overview",
    alt: "PRO Portal loan Overview: checklist, snapshot, and Piper",
  },
  {
    src: "/images/pro-portal-loan-file.png",
    label: "Loan File",
    alt: "PRO Portal Loan File: transaction details and deal stats",
  },
  {
    src: "/images/pro-portal-pricing.png",
    label: "Pricing",
    alt: "PRO Portal Pricing: product run, Piper pick, and rate ladder",
  },
] as const

export function portalScreenByLabel(label: string) {
  return portalScreens.find((shot) => shot.label === label)
}
