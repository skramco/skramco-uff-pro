/**
 * Broker-site email chrome. Footer/header only link to pages that exist in
 * ProWebsiteUFF (app/page.tsx routes). Do not link /privacy or /terms — those
 * hrefs are in the site footer but the pages are not implemented.
 */

const BRAND_RED = "#E10404";
const INK = "#1f292e";
const MUTED = "#6b7280";
const CANVAS = "#f5f6f8";
const CARD = "#ffffff";
const HAIRLINE = "#e8ebee";
const FOOTER_BG = "#f8f9fa";
const FONT = "Arial, Helvetica, sans-serif";

const SITE = "https://uff.pro";
const LOGO = "https://uff.loans/UFF_Logo_Main_2026.png";
const NMLS_URL =
  "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/34381";

export const PRO_SITE_FOOTER_LINKS = [
  { href: SITE, label: "Home" },
  { href: `${SITE}/contact`, label: "Contact" },
  { href: "https://go.uff.pro/signup", label: "Create your account" },
  { href: `${SITE}/licensing`, label: "Licensing" },
  { href: `${SITE}/pro-portal`, label: "PRO Portal" },
] as const;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function detailRows(rows: Array<[string, string]>): string {
  return rows
    .filter(([, value]) => Boolean(value && value !== "N/A"))
    .map(
      ([label, value], i, arr) =>
        `<tr>
          <td style="padding:10px 0;${i < arr.length - 1 ? `border-bottom:1px solid ${HAIRLINE};` : ""}font-family:${FONT};font-size:14px;color:${MUTED};">${escapeHtml(label)}</td>
          <td style="padding:10px 0;${i < arr.length - 1 ? `border-bottom:1px solid ${HAIRLINE};` : ""}font-family:${FONT};font-size:14px;color:${INK};font-weight:600;text-align:right;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
}

export function wrapUffBrokerEmail(opts: {
  heading: string;
  preheader: string;
  kicker?: string;
  bodyHtml: string;
}): string {
  const year = new Date().getFullYear();
  const kicker = opts.kicker || "UFF WHOLESALE";
  const links = PRO_SITE_FOOTER_LINKS.map(
    (link) =>
      `<a href="${link.href}" style="color:${MUTED};text-decoration:none;">${escapeHtml(link.label)}</a>`,
  ).join("&nbsp; · &nbsp;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:${CANVAS};font-family:${FONT};">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CANVAS};">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:${CARD};border:1px solid ${HAIRLINE};">
          <tr>
            <td style="padding:28px 40px 20px;background-color:${CARD};">
              <a href="${SITE}" style="text-decoration:none;">
                <img src="${LOGO}" width="160" alt="United Fidelity Funding" style="display:block;border:0;max-width:160px;height:auto;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="background-color:${BRAND_RED};height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:36px 40px 40px;">
              <p style="margin:0 0 8px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">${escapeHtml(kicker)}</p>
              <h1 style="margin:0 0 16px;font-family:${FONT};font-size:22px;line-height:1.25;font-weight:700;color:${INK};">${escapeHtml(opts.heading)}</h1>
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:${FOOTER_BG};border-top:1px solid ${HAIRLINE};padding:24px 40px 32px;text-align:center;">
              <p style="margin:0 0 16px;font-family:${FONT};font-size:13px;color:${MUTED};">
                ${links}
                &nbsp; · &nbsp;
                <a href="${NMLS_URL}" style="color:${MUTED};text-decoration:none;">NMLS Consumer Access</a>
              </p>
              <p style="margin:0;font-family:${FONT};font-size:11px;line-height:1.6;color:${MUTED};">
                United Fidelity Funding Corp. · NMLS #34381 · Equal Housing Lender<br />
                1300 NW Briarcliff Pkwy #275, Kansas City, MO 64150<br />
                Licensed in 39 states. &copy; ${year} United Fidelity Funding Corp. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
