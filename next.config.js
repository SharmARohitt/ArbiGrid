/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove deprecated experimental.appDir option
  transpilePackages: ['@rainbow-me/rainbowkit'],
}

export default nextConfig
