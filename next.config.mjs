/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, { dev }) {
    // Use default Next.js configuration for devtool
    if (dev) {
      // Leave out any manual changes to devtool here
    }

    return config;
  },

  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  // Uncomment and configure these sections if needed
  // async redirects() {
  //   return [
  //     {
  //       source: "/old-path",
  //       destination: "/new-path",
  //       permanent: true,
  //     },
  //   ];
  // },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //   ];
  // },

  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Custom-Header",
  //           value: "my-value",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
