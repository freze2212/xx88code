/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    URL: process.env.URL,
    GOOGLE_CAPCHAT: process.env.GOOGLE_CAPCHAT,
  },
}

module.exports = nextConfig
