/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // For Local Server
    API_PROD_URL: "https://ekartos-admin-5suogzujk-sujon3537s-projects.vercel.app/api/",

    //  API_PROD_URL: "https://fastkart-admin-json.vercel.app/api/",

    // API_PROD_URL: "http://admin.bdhaat.com.bd/api/",

    // API_PROD_URL: "https://laravel.pixelstrap.net/fastkart/api",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en/dashboard",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/en/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1:8000",
      },
      {
        protocol: "https",
        hostname: "fastkart-admin-json.vercel.app",
      },
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net",
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
