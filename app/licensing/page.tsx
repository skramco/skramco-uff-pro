import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import { USMap } from "@/components/us-map"

const licensedStatesData = [
  {
    state: "Alabama",
    abbrev: "AL",
    licenseType: "Consumer Credit License",
    licenseNumber: "23184",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Alabama State Banking Department",
    regulatoryLink: "https://banking.alabama.gov",
    active: true,
  },
  {
    state: "Alaska",
    abbrev: "AK",
    licenseType: "Mortgage Loan Originator Company License", // Assuming this is the type based on context
    licenseNumber: "N/A", // Not provided in the text
    tradeNames: "mortgageonehomeloans.com", // Extracted from the provided text
    regulatoryBodyName: "Alaska Department of Commerce, Division of Banking & Securities",
    regulatoryLink: "https://www.commerce.alaska.gov/web/dbs/",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Arizona",
    abbrev: "AZ",
    licenseType: "Mortgage Banker License",
    licenseNumber: "BK-1027005",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Arizona Department of Financial Institutions",
    regulatoryLink: "http://www.azdfi.gov/",
    active: true,
  },
  {
    state: "Arkansas",
    abbrev: "AR",
    licenseType: "Combination Mortgage Banker-Broker-Servicer License",
    licenseNumber: "43004",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Arkansas Securities Department",
    regulatoryLink: "https://securities.arkansas.gov",
    active: true,
  },
  {
    state: "California",
    abbrev: "CA",
    licenseType: "Financing Law License (DFPI)",
    licenseNumber: "603J733",
    tradeNames: "UFF CORP.",
    regulatoryBodyName: "California Department of Financial Protection & Innovation (DFPI)",
    regulatoryLink: "https://dfpi.ca.gov",
    active: true,
  },
  {
    state: "Colorado",
    abbrev: "CO",
    licenseType: "Mortgage Company Registration",
    licenseNumber: "None",
    tradeNames: "UFF Express",
    regulatoryBodyName: "NMLS Consumer Access",
    regulatoryLink: "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/34381",
    active: true,
  },
  {
    state: "Connecticut",
    abbrev: "CT",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "NMLS Consumer Access",
    regulatoryLink: "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/34381",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Delaware",
    abbrev: "DE",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "NMLS Consumer Access",
    regulatoryLink: "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/34381",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Florida",
    abbrev: "FL",
    licenseType: "Mortgage Lender License",
    licenseNumber: "MLD506",
    tradeNames: "UFF Express; UFFC Mortgage",
    regulatoryBodyName: "Florida Office of Financial Regulation",
    regulatoryLink: "https://www.flofr.com",
    active: true,
  },
  {
    state: "Georgia",
    abbrev: "GA",
    licenseType: "Mortgage Lender License",
    licenseNumber: "66436",
    tradeNames: "UFF Express; uffcmortgage.com; uffmortgage.com; uffwest.com",
    regulatoryBodyName: "Georgia Department of Banking and Finance",
    regulatoryLink: "https://dbf.georgia.gov",
    active: true,
  },
  {
    state: "Hawaii",
    abbrev: "HI",
    licenseType: "Mortgage Loan Originator Company License",
    licenseNumber: "HI-34381",
    tradeNames: "None",
    regulatoryBodyName: "Hawaii Department of Financial Institutions",
    regulatoryLink: "https://www.dfi.hawaii.gov",
    active: false, // Explicitly marked as expired in provided data
  },
  {
    state: "Idaho",
    abbrev: "ID",
    licenseType: "Mortgage Broker/Lender License",
    licenseNumber: "MBL-2080034381",
    tradeNames: "UFF; UFF Express; UFF West; UFFC Mortgage; UFFWest Funding; United Fidelity Funding Express",
    regulatoryBodyName: "Idaho Department of Finance",
    regulatoryLink: "https://finance.idaho.gov",
    active: true,
  },
  {
    state: "Illinois",
    abbrev: "IL",
    licenseType: "Residential Mortgage License",
    licenseNumber: "MB.6760568",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Illinois Department of Financial & Professional Regulation (IDFPR)",
    regulatoryLink: "https://idfpr.illinois.gov",
    active: true,
  },
  {
    state: "Indiana",
    abbrev: "IN",
    licenseType: "Mortgage Lending License (DFI)",
    licenseNumber: "11139",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Indiana Department of Financial Institutions",
    regulatoryLink: "https://www.in.gov/dfi",
    active: true,
  },
  {
    state: "Iowa",
    abbrev: "IA",
    licenseType: "Mortgage Banker License",
    licenseNumber: "2008-0093",
    tradeNames: "None",
    regulatoryBodyName: "Iowa Division of Banking",
    regulatoryLink: "https://www.idob.state.ia.us",
    active: true,
  },
  {
    state: "Kansas",
    abbrev: "KS",
    licenseType: "Mortgage Company License",
    licenseNumber: "MC.0025426",
    tradeNames: "UFF Express; UFFC Mortgage; United Fidelity Funding",
    regulatoryBodyName: "Kansas Office of the State Bank Commissioner",
    regulatoryLink: "https://www.osbckansas.org",
    active: true,
  },
  {
    state: "Kentucky",
    abbrev: "KY",
    licenseType: "Mortgage Company License",
    licenseNumber: "MC23287",
    tradeNames: "None",
    regulatoryBodyName: "Kentucky Department of Financial Institutions",
    regulatoryLink: "https://kdfi.ky.gov",
    active: true,
  },
  {
    state: "Louisiana",
    abbrev: "LA",
    licenseType: "Residential Mortgage Lending License",
    licenseNumber: "None",
    tradeNames: "None",
    regulatoryBodyName: "Louisiana Office of Financial Institutions",
    regulatoryLink: "https://www.ofi.la.gov",
    active: true,
  },
  {
    state: "Maine",
    abbrev: "ME",
    licenseType: "Supervised Lender License",
    licenseNumber: "34381",
    tradeNames: "None",
    regulatoryBodyName: "Maine Bureau of Consumer Credit Protection",
    regulatoryLink: "https://www.maine.gov/pfr/consumercredit",
    active: true,
  },
  {
    state: "Maryland",
    abbrev: "MD",
    licenseType: "Mortgage Lender License",
    licenseNumber: "34381",
    tradeNames: "None",
    regulatoryBodyName: "Maryland Commissioner of Financial Regulation",
    regulatoryLink: "https://www.dllr.state.md.us/finance/",
    active: true,
  },
  {
    state: "Massachusetts",
    abbrev: "MA",
    licenseType: "Mortgage Lender License",
    licenseNumber: "ML34381",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Massachusetts Division of Banks",
    regulatoryLink: "https://www.mass.gov/orgs/division-of-banks",
    active: true,
  },
  {
    state: "Michigan",
    abbrev: "MI",
    licenseType: "1st Mortgage Broker/Lender/Servicer Registrant",
    licenseNumber: "FR0020432",
    tradeNames: "None",
    regulatoryBodyName: "Michigan Department of Insurance and Financial Services",
    regulatoryLink: "https://www.michigan.gov/difs",
    active: true,
  },
  {
    state: "Minnesota",
    abbrev: "MN",
    licenseType: "Residential Mortgage Originator License",
    licenseNumber: "MN-MO-40134678",
    tradeNames: "None",
    regulatoryBodyName: "Minnesota Department of Commerce",
    regulatoryLink: "https://mn.gov/commerce",
    active: true,
  },
  {
    state: "Mississippi",
    abbrev: "MS",
    licenseType: "Mortgage Lender License",
    licenseNumber: "34381",
    tradeNames: "None",
    regulatoryBodyName: "Mississippi Department of Banking and Consumer Finance",
    regulatoryLink: "https://www.dbcf.ms.gov",
    active: true,
  },
  {
    state: "Missouri",
    abbrev: "MO",
    licenseType: "Mortgage Company License",
    licenseNumber: "34381",
    tradeNames: "UFF Express; United Fidelity Funding",
    regulatoryBodyName: "Missouri Division of Finance",
    regulatoryLink: "https://finance.mo.gov",
    active: true,
  },
  {
    state: "Montana",
    abbrev: "MT",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "Montana Division of Banking and Financial Institutions",
    regulatoryLink: "https://banking.mt.gov",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Nebraska",
    abbrev: "NE",
    licenseType: "Mortgage Banker License",
    licenseNumber: "2004",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Nebraska Department of Banking and Finance",
    regulatoryLink: "https://ndbf.nebraska.gov",
    active: true,
  },
  {
    state: "Nevada",
    abbrev: "NV",
    licenseType: "Mortgage Company License",
    licenseNumber: "4944",
    tradeNames: "None",
    regulatoryBodyName: "Nevada Division of Mortgage Lending",
    regulatoryLink: "https://mortgage.nv.gov",
    active: true,
  },
  {
    state: "New Hampshire",
    abbrev: "NH",
    licenseType: "Mortgage Banker License",
    licenseNumber: "34381MB",
    tradeNames: "None",
    regulatoryBodyName: "NH Banking Department",
    regulatoryLink: "https://www.nh.gov/banking",
    active: true,
  },
  {
    state: "New Jersey",
    abbrev: "NJ",
    licenseType: "Residential Mortgage Lender License",
    licenseNumber: "None",
    tradeNames: "None",
    regulatoryBodyName: "New Jersey Department of Banking and Insurance",
    regulatoryLink: "https://www.state.nj.us/dobi/index.html",
    active: true,
  },
  {
    state: "New Mexico",
    abbrev: "NM",
    licenseType: "Mortgage Loan Company License",
    licenseNumber: "None",
    tradeNames: "None",
    regulatoryBodyName: "New Mexico Financial Institutions Division",
    regulatoryLink: "https://www.rld.state.nm.us/financialinstitutions/",
    active: true,
  },
  {
    state: "New York",
    abbrev: "NY",
    licenseType: "Mortgage Banker License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "New York Department of Financial Services",
    regulatoryLink: "https://www.dfs.ny.gov",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "North Carolina",
    abbrev: "NC",
    licenseType: "Mortgage Lender License",
    licenseNumber: "L-186719",
    tradeNames: "UFF Express",
    regulatoryBodyName: "North Carolina Commissioner of Banks",
    regulatoryLink: "https://www.nccob.gov",
    active: true,
  },
  {
    state: "North Dakota",
    abbrev: "ND",
    licenseType: "Residential Mortgage Lender",
    licenseNumber: "ML104863",
    tradeNames: "None",
    regulatoryBodyName: "North Dakota Department of Financial Institutions",
    regulatoryLink: "https://www.nd.gov/dfi",
    active: true,
  },
  {
    state: "Ohio",
    abbrev: "OH",
    licenseType: "Residential Mortgage Lending Act Certificate",
    licenseNumber: "RM.850040.000",
    tradeNames: "None",
    regulatoryBodyName: "Ohio Division of Financial Institutions",
    regulatoryLink: "https://www.com.ohio.gov/fi",
    active: true,
  },
  {
    state: "Oklahoma",
    abbrev: "OK",
    licenseType: "Mortgage Lender License",
    licenseNumber: "ML011045",
    tradeNames: "UFFC Mortgage",
    regulatoryBodyName: "Oklahoma Department of Consumer Credit",
    regulatoryLink: "http://www.ok.gov/okdocc",
    active: true,
  },
  {
    state: "Oregon",
    abbrev: "OR",
    licenseType: "Mortgage Lending License",
    licenseNumber: "34381",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Oregon Division of Financial Regulation",
    regulatoryLink: "https://dfr.oregon.gov",
    active: true,
  },
  {
    state: "Pennsylvania",
    abbrev: "PA",
    licenseType: "Mortgage Lender License",
    licenseNumber: "99512",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Pennsylvania Department of Banking and Securities",
    regulatoryLink: "https://www.dobs.pa.gov",
    active: true,
  },
  {
    state: "Rhode Island",
    abbrev: "RI",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "RI Department of Business Regulation – Banking Division",
    regulatoryLink: "https://dbr.ri.gov/banking",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "South Carolina",
    abbrev: "SC",
    licenseType: "Mortgage Lender / Servicer License (BFI)",
    licenseNumber: "MLS - 34381",
    tradeNames: "None",
    regulatoryBodyName: "South Carolina Department of Consumer Affairs",
    regulatoryLink: "https://consumer.sc.gov",
    active: true,
  },
  {
    state: "South Dakota",
    abbrev: "SD",
    licenseType: "Mortgage Lender License",
    licenseNumber: "34381.ML",
    tradeNames: "None",
    regulatoryBodyName: "South Dakota Division of Banking",
    regulatoryLink: "https://banking.sd.gov",
    active: true,
  },
  {
    state: "Tennessee",
    abbrev: "TN",
    licenseType: "Mortgage License",
    licenseNumber: "34381",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Tennessee Department of Financial Institutions",
    regulatoryLink: "https://www.tn.gov/tdfi",
    active: true,
  },
  {
    state: "Texas",
    abbrev: "TX",
    licenseType: "Mortgage Banker Registration (SML)",
    licenseNumber: "None",
    tradeNames: "VFF United Fidelity Funding Corp.",
    regulatoryBodyName: "Texas Office of Consumer Credit Commissioner",
    regulatoryLink: "https://occc.texas.gov",
    active: true,
  },
  {
    state: "Utah",
    abbrev: "UT",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "Utah Division of Real Estate",
    regulatoryLink: "https://realestate.utah.gov",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Vermont",
    abbrev: "VT",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "Vermont Department of Financial Regulation",
    regulatoryLink: "https://dfr.vermont.gov",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Virginia",
    abbrev: "VA",
    licenseType: "Lender License",
    licenseNumber: "MC-7052",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Virginia Bureau of Financial Institutions (within SCC)",
    regulatoryLink: "https://scc.virginia.gov/pages/Financial-Institutions",
    active: true,
  },
  {
    state: "Washington",
    abbrev: "WA",
    licenseType: "Consumer Loan Company License",
    licenseNumber: "CL-34381",
    tradeNames: "UFF West Funding Corp.",
    regulatoryBodyName: "Washington Department of Financial Institutions",
    regulatoryLink: "https://dfi.wa.gov",
    active: true,
  },
  {
    state: "West Virginia",
    abbrev: "WV",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "WV Division of Financial Institutions",
    regulatoryLink: "https://dfi.wv.gov",
    active: false, // Assuming inactive as it was not in the previous active list
  },
  {
    state: "Wisconsin",
    abbrev: "WI",
    licenseType: "Mortgage Banker License",
    licenseNumber: "34381BA",
    tradeNames: "UFF Express",
    regulatoryBodyName: "Wisconsin Department of Financial Institutions",
    regulatoryLink: "https://dfi.wi.gov",
    active: true,
  },
  {
    state: "Wyoming",
    abbrev: "WY",
    licenseType: "Mortgage Lender License", // Assuming common license type
    licenseNumber: "N/A", // Not provided
    tradeNames: "None", // Not provided
    regulatoryBodyName: "Wyoming Division of Banking",
    regulatoryLink: "https://banking.wyo.gov",
    active: false, // Assuming inactive as it was not in the previous active list
  },
]

export default function LicensingPage() {
  // Filter active states for the count in the overview section
  const activeLicensedStates = licensedStatesData.filter((state) => state.active)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-600 text-white">Regulatory Compliance</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Licensing & Compliance</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              United Fidelity Funding Corp is licensed and regulated in multiple states, ensuring compliance with all
              applicable mortgage lending laws and regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle>Licensed in {activeLicensedStates.length} States</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We maintain active licenses across {activeLicensedStates.length} states, providing comprehensive
                    coverage for our broker partners.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle>Fully Compliant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    All licenses are current and in good standing with respective state regulatory authorities.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle>Nationwide Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our licensing footprint covers the majority of the U.S. mortgage market, serving brokers coast to
                    coast.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">NMLS Consumer Access</h2>
              <p className="text-xl text-gray-600 mb-4">
                United Fidelity Funding Corp is registered with the Nationwide Multistate Licensing System (NMLS).
              </p>
              <p className="text-lg font-semibold text-red-600 mb-6">NMLS ID: #34381</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/34381" target="_blank" rel="noopener noreferrer">
                  View NMLS Record <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* US Map Visualization */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Licensed States</h2>
            <p className="text-xl text-gray-600">
              We are licensed to originate mortgage loans in the following {activeLicensedStates.length} states
            </p>
          </div>

          {/* Interactive US Map */}
          <USMap />

          {/* State Grid */}
          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Licensing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {licensedStatesData.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.state}</CardTitle>
                      {item.active ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-1">{item.licenseType}</p>
                    {item.licenseNumber && item.licenseNumber !== "None" && (
                      <p className="text-sm text-gray-700 font-medium mb-1">License #: {item.licenseNumber}</p>
                    )}
                    {item.tradeNames && item.tradeNames !== "None" && (
                      <p className="text-sm text-gray-500 mb-3">Trade Names: {item.tradeNames}</p>
                    )}
                    {item.active && (
                      <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Licensed & Compliant</span>
                      </div>
                    )}
                    {item.regulatoryLink && (
                      <Link
                        href={item.regulatoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        {item.regulatoryBodyName} <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
              <p className="text-xl text-gray-600">
                We maintain the highest standards of regulatory compliance and consumer protection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Federal Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Truth in Lending Act (TILA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Real Estate Settlement Procedures Act (RESPA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Equal Credit Opportunity Act (ECOA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Fair Credit Reporting Act (FCRA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Dodd-Frank Act / Ability-to-Repay Rule
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>State Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      State licensing requirements met
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Regular regulatory examinations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Surety bonds and net worth requirements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Continuing education compliance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Annual license renewals current
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Questions About Our Licensing?</h2>
            <p className="text-xl mb-8 text-red-100">
              Our compliance team is available to answer any questions about our licensing and regulatory status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Link href="/contact">Contact Compliance Team</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
              >
                <Link href="https://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer">
                  View NMLS Database
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
