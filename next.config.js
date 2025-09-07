/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  distDir: "build",
  images: {
    domains: ['gaicgetnnwptxbqooywd.supabase.co'],
  },
};

module.exports = nextConfig;
