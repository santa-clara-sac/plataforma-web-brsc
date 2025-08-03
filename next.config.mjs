import 'dotenv/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    experimental: {
        // Para Clerk + Middleware en entorno de desarrollo con ngrok
        allowedDevOrigins: [process.env.URL_NGROK],
    },
    transpilePackages: ['@clerk/nextjs'], // ✅ necesario para que funcione bien con Middleware y App Router
}

export default nextConfig
