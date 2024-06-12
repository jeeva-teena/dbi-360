import {
  TinaNodeBackend,
  LocalBackendAuthProvider,
} from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

import { client } from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          client : client ,
          secret: process.env.NEXTAUTH_SECRET,
        }),
      }),
      client ,
});

export default (req, res) => {
  const { MY_ENV_VAR } = process.env;
  res.status(200).json({ envVar: MY_ENV_VAR });
  // Modify the request here if you need to
  return handler(req, res);
};
