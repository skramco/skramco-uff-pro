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
        source: "/loan-products/investor-matrix",
        destination: "/loan-products/non-qm-core",
        permanent: true,
      },
    ]
  },
 
}

export default nextConfig