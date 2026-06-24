import { createClient } from "tinacms/dist/client";
import { queries } from "../../tina/__generated__/types";

/**
 * Server-side Tina CMS client.
 * In dev: uses local Tina server (localhost:4001)
 * In production: uses Tina Cloud API
 */
const TINA_CLOUD_URL = `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ""}/github/main`;
const isDev = process.env.NODE_ENV === "development";

export const tinaClient = createClient({
  url: process.env.NEXT_PUBLIC_TINA_API_URL || (isDev ? "http://localhost:4001/graphql" : TINA_CLOUD_URL),
  token: process.env.TINA_TOKEN || "",
  queries,
});

export type TinaProject = {
  expId: string;
  title_zh: string;
  title_en: string;
  status: string;
  description_zh?: string | null;
  description_en?: string | null;
  href?: string | null;
};

export type TinaLog = {
  dateLabel: string;
  fullDate?: string | null;
  title_zh: string;
  title_en: string;
  description_zh?: string | null;
  description_en?: string | null;
  details?: Array<{
    text_zh?: string | null;
    text_en?: string | null;
  } | null> | null;
};

/** Fetch all projects from Tina CMS */
export async function getProjects(): Promise<TinaProject[]> {
  const data = await tinaClient.queries.projectConnection();
  const edges = data?.data?.projectConnection?.edges || [];
  return edges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node != null) as TinaProject[];
}

/** Fetch all logs from Tina CMS */
export async function getLogs(): Promise<(TinaLog & { id: string })[]> {
  const data = await tinaClient.queries.logConnection();
  const edges = data?.data?.logConnection?.edges || [];
  return edges
    .map((edge) => {
      const node = edge?.node;
      if (!node) return null;
      // Extract ID from filename (e.g., "system-init.json" → "system-init")
      const filename = (node as any)._sys?.filename || "";
      const id = filename.replace(/\.json$/, "");
      return { ...node, id } as TinaLog & { id: string };
    })
    .filter((node): node is NonNullable<typeof node> => node != null);
}

/** Fetch a single log by its ID (filename without extension) */
export async function getLogById(id: string): Promise<(TinaLog & { id: string }) | null> {
  try {
    const data = await tinaClient.queries.log({ relativePath: `${id}.json` });
    const node = data?.data?.log;
    if (!node) return null;
    return { ...node, id } as TinaLog & { id: string };
  } catch {
    return null;
  }
}
