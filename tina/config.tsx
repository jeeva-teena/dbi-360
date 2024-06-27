import { defineConfig } from "tinacms";

import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";

const config = defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId:
    process.env.TINA_CLIENT_ID || "c65f42f8-3b2b-4cc2-b8ec-3272951b2d98",
  token: process.env.TINA_TOKEN || "7445b0f6803e320aa0a6b8058f97fea6b73be2a3",
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections: [Post, Global, Author, Page],
  },
});

export default config;
