/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "community-volunteering.s3.amazonaws.com",
                pathname: "/**", // Permite todas las rutas bajo este dominio
            },
        ],
    },
};

export default nextConfig;
