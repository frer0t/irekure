import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "irekure.rw",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "irekure-assets.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "minaloc.gov.rw",
        port: "",
        pathname: "/_assets/**",
      },
      {
        protocol: "https",
        hostname: "moh.gov.rw",
        port: "",
        pathname: "/logos/**",
      },
      {
        protocol: "https",
        hostname: "rdb.rw",
        port: "",
        pathname: "/logos/**",
      },
      {
        protocol: "https",
        hostname: "www.gov.rw",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.minijust.gov.rw",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
