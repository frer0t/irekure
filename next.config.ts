import type { NextConfig } from "next";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: [
              baseURL,
              "https://irekure.frerot.dev",
              "https://irekure.vercel.app",
            ].join(", "),
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minaloc.gov.rw",
        port: "",
        pathname: "/_assets/**",
      },
    ],
  },
};

export default nextConfig;
