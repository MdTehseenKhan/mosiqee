/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "is1-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com"
    ]
  }
}

export default nextConfig
