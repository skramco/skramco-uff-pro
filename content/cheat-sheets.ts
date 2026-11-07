export const cheatSheets = [
  { href: "/resources/cheat-sheets/du-vs-lpa", label: "DU vs LPA" },
  { href: "/resources/cheat-sheets/non-qm", label: "Non-QM" },
  { href: "/resources/cheat-sheets/dscr", label: "DSCR" },
] as const

export type CheatSheetHref = (typeof cheatSheets)[number]["href"]
