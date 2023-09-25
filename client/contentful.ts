import config from "@/lib/config";
import { createClient } from "contentful-management";

const client = createClient({
  accessToken: config.CONTENTFUL_CMA_KEY as string,
});

export default client;
