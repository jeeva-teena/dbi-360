import { LocalAuthProvider } from "tinacms";
import { UsernamePasswordAuthJSProvider, TinaUserCollection } from "tinacms-authjs/dist/tinacms";
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
require("ts-node").register();
module.exports = require("./config.tsx");

