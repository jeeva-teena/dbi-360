const { hostname } = require("os");

module.exports = {
  reactStrictMode: true,
  env: {
    KV_REST_API_URL: "https://unified-possum-54857.upstash.io",
    KV_REST_API_TOKEN:
      "AdZJAAIncDE0NTk3NzJiNTJiZmY0MzEwYjc4M2E2ZWEyOTUwOWRlZHAxNTQ4NTc",
    NEXTAUTH_SECRET: "4f52dccf94c0dc1d1d42515477790c34",
    TINA_PUBLIC_IS_LOCAL: false,
    TINA_CLIENT_ID: "c65f42f8-3b2b-4cc2-b8ec-3272951b2d98",
    TINA_TOKEN: "7445b0f6803e320aa0a6b8058f97fea6b73be2a3",
    contentApiUrlOverride: "/api/tina/gql",
    branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // images:{
  //   remotePatterns:[
  //     {
  //       protocol:'https',
  //       hostname:'assets.vercel.com',
  //     }
  //   ]
  // },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
