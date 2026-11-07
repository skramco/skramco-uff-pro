export type NonQmMatrixStatus = "live"

export type NonQmMatrixListing = {
  id: string
  name: string
  summary: string
  href: string
  status: NonQmMatrixStatus
}

/** Non-QM investor matrices shown on /products/non-qm. Add a row here as each investor group goes live. */
export const NON_QM_MATRICES: NonQmMatrixListing[] = [
  {
    id: "non-qm-core",
    name: "Non-QM Core",
    summary: "DSCR and Full Doc — investment property programs",
    href: "/loan-products/non-qm-core",
    status: "live",
  },
]
