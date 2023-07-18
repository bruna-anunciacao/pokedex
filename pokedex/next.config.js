/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://pokeapi.co/api/:path*',
        },
      ];
    },
    images: {
        domains: ["raw.githubusercontent.com"]
    }
  };
  
