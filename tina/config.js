require("ts-node").register();
module.exports = require("./config.tsx");
import { LocalAuthProvider } from "tinacms";
import { UsernamePasswordAuthJSProvider, TinaUserCollection } from "tinacms-authjs/dist/tinacms";
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const authProvider = isLocal
? LocalAuthProvider()
: UsernamePasswordAuthJSProvider({
    database: new TinaUserCollection(),
    secret: process.env.NEXTAUTH_SECRET,
  })
  