/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
        source: "/products/:slug",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/guides/uff-nonqm-dscr-cheat-sheet.html",
        destination: "/resources/non-qm-dscr-cheat-sheet",
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig