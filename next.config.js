const { hostname } = require("os");

module.exports = {
  reactStrictMode: true,
  contentApiUrlOverride: '/api/tina/gql',
  branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID || "c65f42f8-3b2b-4cc2-b8ec-3272951b2d98",
  token: process.env.TINA_TOKEN || "7445b0f6803e320aa0a6b8058f97fea6b73be2a3",
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
