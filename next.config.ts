import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.clerk.com", "res.cloudinary.com"], // Add the external image domain here
  },
};



export default nextConfig;
