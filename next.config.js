const { hostname } = require("os");

module.exports = {
  reactStrictMode: true,
  env: {
    contentApiUrlOverride: "/api/tina/gql",
    branch: process.env.VERCEL_GIT_COMMIT_REF || "",
    clientId: process.env.TINA_CLIENT_ID || "",
    token: process.env.TINA_TOKEN || "",
    KV_REST_API_URL : process.env.KV_REST_API_URL || "",
    TINA_PUBLIC_IS_LOCAL: false,
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
