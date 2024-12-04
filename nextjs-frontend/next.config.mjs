/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/nextjs-djninex-store.appspot.com/**',
      },
    ]
  }
};

export default nextConfig;
