/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvzqgboffydqeqzeiysx.supabase.co",
        pathname: "/storage/v1/object/public/marketing-assets/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/why-uff",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/loan-products",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/loan-products/investor-matrix",
        destination: "/loan-products/non-qm-core",
        permanent: true,
      },
      {
        source: "/get-approved",
        destination: "https://go.uff.pro/signup",
        statusCode: 301,
      },
      {
        source: "/price",
        destination: "https://go.uff.pro",
        statusCode: 301,
      },
      {
        source: "/announcements",
        destination: "/industry-news",
        statusCode: 301,
      },
      {
        source: "/team",
        destination: "/contact",
        statusCode: 301,
      },
      {
        source: "/turn-times",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/products/conventional",
        destination: "/loan-products/conventional",
        statusCode: 301,
      },
      {
        source: "/products/fha",
        destination: "/loan-products/fha",
        statusCode: 301,
      },
      {
        source: "/products/va",
        destination: "/loan-products/va",
        statusCode: 301,
      },
      {
        source: "/products/usda",
        destination: "/loan-products/usda",
        statusCode: 301,
      },
      {
        source: "/products/non-qm",
        destination: "/loan-products/non-qm",
        statusCode: 301,
      },
      {
        source: "/products/investor",
        destination: "/loan-products/investor",
        statusCode: 301,
      },
      {
        source: "/products/hfa",
        destination: "/loan-products/hfa",
        statusCode: 301,
      },
      {
        source: "/guides/uff-nonqm-dscr-cheat-sheet.html",
        destination: "/resources/cheat-sheets/non-qm",
        statusCode: 301,
      },
      {
        source: "/resources/non-qm-dscr-cheat-sheet",
        destination: "/resources/cheat-sheets/non-qm",
        statusCode: 301,
      },
      {
        source: "/non-qm/core/blended-income",
        destination: "/calculators/non-qm/core/blended-income",
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig