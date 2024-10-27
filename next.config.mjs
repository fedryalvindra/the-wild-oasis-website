/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uqnmnwzncetkeupcdqzs.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // completey exported as static assets that we can deploy anywhere
  // output: "export",
};

export default nextConfig;
