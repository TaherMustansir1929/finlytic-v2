import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

const app_url = process.env.NEXT_PUBLIC_APP_URL;
if (!app_url) {
  throw new Error("NEXT_PUBLIC_APP_URL is not defined");
}

export const client = hc<AppType>(app_url);
