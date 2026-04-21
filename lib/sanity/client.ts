import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const isSanityConfigured =
  projectId.length > 0 && /^[a-z0-9-]+$/.test(projectId);

export const sanityClient: SanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : createClient({
      projectId: "placeholder",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: false,
    });

export { isSanityConfigured };
