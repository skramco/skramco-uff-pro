export type PortalFeature = {
  id: string
  name: string
  outcome: string
  icon: PortalFeatureIcon
}

export type PortalFeatureIcon =
  | "signup"
  | "pipeline"
  | "pricer"
  | "loan-pricing"
  | "lock"
  | "new-loan"
  | "overview"
  | "loan-file"
  | "documents"
  | "conditions"
  | "coc"
  | "post-lock"
  | "status"
  | "fees"
  | "action-queue"
  | "chat"
  | "company"
  | "comp"

export type PortalFeatureGroup = {
  id: string
  label: string
  title: string
  intro: string
  features: PortalFeature[]
}

/** Broker-facing PRO Portal capabilities, mapped from the live broker workspace. */
export const portalFeatureGroups: PortalFeatureGroup[] = [
  {
    id: "access",
    label: "PRO Portal",
    title: "The loan lives here. Not in your inbox.",
    intro:
      "Price and lock, then originate, upload, underwrite, clear conditions, request a COC, and take post-lock actions through funding. Piper is on the file the whole way.",
    features: [
      {
        id: "signup",
        icon: "signup",
        name: "Create your account",
        outcome: "Register once and land in PRO Portal. Start a file the same session.",
      },
      {
        id: "pipeline",
        icon: "pipeline",
        name: "My Pipeline",
        outcome:
          "Origination, submitted, funded, and eligible comp in one view. Filter, search, and open the file that needs you.",
      },
    ],
  },
  {
    id: "price-lock",
    label: "Price and lock",
    title: "Price the scenario. Lock when the number works.",
    intro:
      "Live product runs inside the file, not a rate sheet PDF as the workflow. Compare, pick Piper's rate, and lock from the same screen.",
    features: [
      {
        id: "pricer",
        icon: "pricer",
        name: "Quick Pricer",
        outcome:
          "Price a scenario before a loan exists. Family, term, lock, and comp filters. Run pricing and compare.",
      },
      {
        id: "loan-pricing",
        icon: "loan-pricing",
        name: "Loan Pricing",
        outcome:
          "Same engine on the file: Piper's Pick, rate ladder, price adjustments, and lock from the selected rate.",
      },
      {
        id: "lock",
        icon: "lock",
        name: "Lock",
        outcome: "Lock from the pricing run. Piper watches expiration and whether the lock still covers the close.",
      },
    ],
  },
  {
    id: "file",
    label: "Work the file",
    title: "Originate, underwrite, and fund on one loan.",
    intro:
      "Documents, conditions, COCs, post-lock, and live status stay with the file. You do not chase the deal in a side email thread.",
    features: [
      {
        id: "new-loan",
        icon: "new-loan",
        name: "New loan",
        outcome: "Start the application, save, and resume. Register the file when the scenario is ready.",
      },
      {
        id: "overview",
        icon: "overview",
        name: "Overview",
        outcome:
          "Needs-attention alerts and a milestone checklist from created through funded. Jump to the tab that clears the alert.",
      },
      {
        id: "loan-file",
        icon: "loan-file",
        name: "Loan File",
        outcome: "Transaction details, deal stats, and the data UFF needs at submit.",
      },
      {
        id: "documents",
        icon: "documents",
        name: "Documents",
        outcome: "Upload, track, and keep the package with the loan instead of a side email thread.",
      },
      {
        id: "conditions",
        icon: "conditions",
        name: "Conditions",
        outcome:
          "Underwriting conditions post to the loan as they are issued. See what is open, attach the package, and clear them here.",
      },
      {
        id: "coc",
        icon: "coc",
        name: "Change of circumstance",
        outcome:
          "Submit a TRID-compliant COC on the loan for lender review. Keep the change with the file, not in a side inbox.",
      },
      {
        id: "post-lock",
        icon: "post-lock",
        name: "Post-lock actions",
        outcome: "After the lock is confirmed: extension, reprice, relock, or a program change from the same loan.",
      },
      {
        id: "status",
        icon: "status",
        name: "Live status",
        outcome:
          "Loan stage and needs-attention sit on Overview. Email follows lock, documents, and COC movement. Piper flags what is stalling.",
      },
      {
        id: "fees",
        icon: "fees",
        name: "Fees",
        outcome: "Fee worksheet on the same file you priced and locked.",
      },
    ],
  },
  {
    id: "piper",
    label: "Piper on the file",
    title: "Piper tells you the next step you own.",
    intro:
      "UFF's AI Pipeline Assistant. File-aware. Role-aware. Built for mortgage brokers, not a generic chatbot.",
    features: [
      {
        id: "action-queue",
        icon: "action-queue",
        name: "Action cards",
        outcome:
          "Lock risk, LE send-by, NOI and counteroffer windows, stalled appraisals, and data issues ranked by urgency.",
      },
      {
        id: "chat",
        icon: "chat",
        name: "Ask or tell her",
        outcome:
          "Ask what to do next, or tell her to draft a borrower or team update. Quick actions sit under the chat.",
      },
    ],
  },
  {
    id: "shop",
    label: "Run the shop",
    title: "Company tools when you manage more than a pipeline.",
    intro: "Broker Admin for the company profile, users, and compensation without leaving PRO Portal.",
    features: [
      {
        id: "company",
        icon: "company",
        name: "Company",
        outcome: "Company profile and users for the brokerage.",
      },
      {
        id: "comp",
        icon: "comp",
        name: "Compensation",
        outcome: "Comp plans and requests without leaving the portal.",
      },
    ],
  },
]
