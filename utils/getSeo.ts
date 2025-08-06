import { gql } from "@apollo/client";
import client from "../client";


export const getSeo = async (uri: string = "/") => {
  try {
    const { data } = await client.query({
      query: gql`
        query SeoQuery($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {
              id
              seo {
                title
                metaDesc
              }
            }
            ... on Property {
              id
              seo {
                title
                metaDesc
              }
            }
                ... on Post {
                id
                seo {
                    title
                    metaDesc
                }
                }
          }
        }
      `,
      variables: { uri },
    });

    if (!data?.nodeByUri?.seo) return null;

    return data.nodeByUri.seo;
  } catch (error: any) {
    console.error("GraphQL SEO error:", error?.message ?? error);
    return null; // Nemoj vraćati ceo error objekat!
  }
};


