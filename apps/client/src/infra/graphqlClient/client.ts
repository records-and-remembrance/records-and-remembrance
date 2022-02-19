import { createClient } from "urql";
import { env } from "../../utils/env";

export const client = createClient({
  url: env.CONTENTFUL_API_URL,
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}` },
    };
  },
});
