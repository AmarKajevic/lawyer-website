import { gql } from "@apollo/client";
import client from "../client";
import { cleanAndTransformBlocks } from "./CleanAndTransformBlocks";

export const getPage = async (uri: string = "/") => {
  console.log("GraphQL query for uri:", uri);
  const { data } = await client.query({
    query: gql`
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
  });

  if (!data?.nodeByUri) return null;

  const blocks = data.nodeByUri.blocks ?? []; 

  return {
    blocks: cleanAndTransformBlocks(blocks),
    properties: data.properties?.nodes ?? [],
  };
};

