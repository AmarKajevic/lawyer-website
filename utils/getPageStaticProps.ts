import { gql } from "@apollo/client";
import client from "../client";
import { cleanAndTransformBlocks } from "./CleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";



export const getPageStaticProps = async (params?: { slug?: string[] }) => {
    const uri = params?.slug ? "/" + params.slug.join("/") : "/";
    const { data } = await client.query({
    
        query: gql`
          query PageQuery($uri: String!) {
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
              acfOptionsMainMenu {
              mainMenu {
                callToActionButton {
                  destination {
                    ... on Page {
                      id
                      uri
                    }
                  }
                  label
                }
                menuItems {
                  items {
                    destination {
                      ... on Page {
                        id
                        uri
                      }
                    }
                    label
                    subitems {
                      destination {
                        ... on Page {
                          id
                          uri
                        }
                      }
                      label
                    }
                  }
                  menuItem {
                    destination {
                      ... on Page {
                        id
                        uri
                      }
                    }
                    label
                  }
                }
              }
            }
          }
        `,
        variables:{
            uri,
        }
      });
      
      
      const blocks = cleanAndTransformBlocks( data.nodeByUri.blocks);
      const menuItems = mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems);
      const callToActionLabel = data.acfOptionsMainMenu.mainMenu.callToActionButton.label;
      const callToActionDestination = data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri;
      
    return {
        blocks,
        menuItems,
        callToActionLabel,
        callToActionDestination,
      };
    };

export default getPageStaticProps;