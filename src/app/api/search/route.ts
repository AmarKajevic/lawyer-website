// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { gql } from '@apollo/client';
import client from '../../../../client'; // putanja ka client-u

export async function GET(req: NextRequest) {
  try {
    const { data } = await client.query({
      query: gql`
        query AllPropertiesQuery {
          properties {
            nodes {
              databaseId
              title
              uri
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              propertyFeatures {
                saznaj {
                  ... on Page {
                    id
                  }
                }
                title
              }
            }
          }
        }
      `,
    });

    return NextResponse.json({ properties: data.properties.nodes });
  } catch (e) {
    console.error('GraphQL Error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
