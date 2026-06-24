import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '87f9812b3281ddbb250df6289baf56261d321daa', queries,  });
export default client;
  