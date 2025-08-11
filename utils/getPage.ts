import { cleanAndTransformBlocks } from "./CleanAndTransformBlocks";

export const getPage = async (uri: string = "/") => {
  const params = {
    query: `
      query GetPage($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks(postTemplate: false)
          }
          ... on Property {
            id
            blocks(postTemplate: false)
          }
        }
        properties {
          nodes {
            title
            uri
          }
        }
      }
    `,
    variables: { uri },
  };

  const fetchWithTimeout = (url: string, options: RequestInit, timeoutMs = 10000) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { ...options, signal: controller.signal })
      .finally(() => clearTimeout(timeout));
  };

  let response;
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      response = await fetchWithTimeout(process.env.WP_GRAPHQL_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }, 10000);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data, errors } = await response.json();

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
      }

      if (!data?.nodeByUri) {
        return null;
      }

      const blocks = data.nodeByUri.blocks ?? [];

      return {
        blocks: cleanAndTransformBlocks(blocks),
        properties: data.properties?.nodes ?? [],
      };

    } catch (err: any) {
      attempts++;
      if (attempts >= maxAttempts) {
        console.error(`getPage failed after ${attempts} attempts`, err);
        throw err;
      }
      console.warn(`getPage attempt ${attempts} failed, retrying...`, err.message || err);
    }
  }
};
