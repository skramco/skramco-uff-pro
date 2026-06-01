/**
 * Client-safe feature flags (NEXT_PUBLIC_* inlined at build time).
 * Set in Netlify → Site configuration → Environment variables.
 */

/** Non-QM Income Analysis tool at /non-qm-income-analysis — off in production unless enabled. */
export function isNonQmIncomeAnalysisEnabled(): boolean {
  return process.env.NEXT_PUBLIC_FEATURE_NON_QM_INCOME_ANALYSIS === "true"
}
