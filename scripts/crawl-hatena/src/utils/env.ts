import * as envVar from "env-var";

const HATENA_ID = envVar.get("HATENA_ID").required().asString();
const HATENA_PASS = envVar.get("HATENA_PASS").required().asString();
const HATENA_DOMAIN = envVar.get("HATENA_DOMAIN").required().asString();

export const env = {
  HATENA_ID,
  HATENA_PASS,
  HATENA_DOMAIN,
};
