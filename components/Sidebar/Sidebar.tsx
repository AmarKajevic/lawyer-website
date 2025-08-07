import { gql } from "@apollo/client";

import client from "../../client";
import Image from "next/image";

const GET_POST_TITLES = gql`
  query GetPostTitles {
    posts(first: 10) {
      nodes {
        id
        title
        slug
        date
         featuredImage {
            node {
            sourceUrl
            }
        }
      }
    }
  }
`;

export default async function Sidebar() {
    const { data } = await client.query({
    query: GET_POST_TITLES,
  });
  const posts = data?.posts?.nodes || [];
  const date = data.post;
  return (
     <aside className="hidden lg:block w-[300px] sticky mt-5 top-10 mb-5 h-fit p-4 bg-white-400 rounded-md shadow-xl">
      <h2 className="text-lg font-bold mb-4">Najnoviji blogovi</h2>
      <ul className="space-y-4">
          {posts.map((post: any) => (
            <li
              key={post.id}
              className="border-b border-gray-400 pb-2 flex gap-3"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover rounded"
                    sizes="8px"
                    loading="eager"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <a
                  href={`/blog/${post.slug}`}
                  className="text-black hover:underline text-sm font-medium"
                >
                  {post.title}
                </a>
                <p className="text-gray-500 text-xs">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>

      
    </aside>
  
  )
}