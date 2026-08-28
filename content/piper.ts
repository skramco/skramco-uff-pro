export type PiperStage = {
  stage: string
  title: string
  brokerMove: string
  piperDoes: string
}

/**
 * Wholesale broker journey. Grounded in Piper's real PRO Portal behavior
 * (pipeline action queue, loan-file rules, pricing pick, and chat).
 */
export const piperStages: PiperStage[] = [
  {
    stage: "Origination",
    title: "Price the scenario",
    brokerMove: "Run Quick Pricer or price inside the loan. Lock from the run when the number works.",
    piperDoes:
      "Ranks every eligible product and puts Piper's Pick on top: rate, price, P&I, and why it wins. Ask what-ifs such as a higher FICO or pricing it as a refinance.",
  },
  {
    stage: "Submit",
    title: "Send a complete file",
    brokerMove: "Finish the loan file, upload borrower documents, and submit to UFF.",
    piperDoes:
      "Flags missing data and the Loan Estimate send-by date before TRID is late. Tells you the next step you own versus what UFF Setup reviews after intake.",
  },
  {
    stage: "In process",
    title: "Keep the file moving",
    brokerMove: "Work the pipeline. Respond to UFF when Setup or underwriting needs a borrower item.",
    piperDoes:
      "Watches lock expiration, lock coverage versus closing, stalled appraisals, Notice of Incompleteness, and counteroffer windows. Critical items surface as action cards, not a status hunt.",
  },
  {
    stage: "Underwriting",
    title: "Clear what is still open",
    brokerMove: "Upload condition docs and chase the items only you can get from the borrower.",
    piperDoes:
      "Tracks open conditions against the closing date. Ask what clears the last conditions fastest, or tell her to draft the borrower update.",
  },
  {
    stage: "CTC to funded",
    title: "Protect the close",
    brokerMove: "Confirm CD timing, lock coverage, and any last borrower signatures.",
    piperDoes:
      "Calls out closing risk while conditions are still open, and whether the lock still covers the estimated close. The next step is always yours or UFF's, never a generic checklist.",
  },
]

export const piperPrompts = [
  "Which locks are at risk?",
  "What's stalled and why?",
  "What clears the last conditions fastest?",
  "When will this be CTC?",
  "Draft an update for the borrower",
]

export type PiperAction = {
  urgency: string
  title: string
  detail: string
}

/** Pipeline action cards Piper actually raises. Not a generic chatbot demo. */
export const piperActions: PiperAction[] = [
  {
    urgency: "Critical",
    title: "LE send-by has passed",
    detail: "No initial LE delivery recorded. Send or confirm it, then update the disclosure dates.",
  },
  {
    urgency: "Watch",
    title: "Lock may not cover close",
    detail: "She compares lock expiration to the estimated closing date before you lose the rate.",
  },
  {
    urgency: "Stalled",
    title: "Appraisal has not moved",
    detail: "The file is waiting. It shows up as an action card, not a status hunt in the pipeline.",
  },
]
