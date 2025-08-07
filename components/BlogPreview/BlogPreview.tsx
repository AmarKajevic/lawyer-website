// components/BlogPreview.tsx
import { gql } from "@apollo/client";
import Image from "next/image";
import client from "../../client";

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

const GET_LATEST_POSTS = gql`
  query LatestPosts {
    posts(first: 2) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  } | null;
};

export default async function BlogPreview() {
  const { data } = await client.query({ query: GET_LATEST_POSTS });
  const posts: Post[]  = data?.posts?.nodes || [];

   return (
    <div className="col-span-1">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Najnoviji blogovi</h3>
      
      <div className="flex gap-6">
        {posts.map((post) => (
          <div key={post.id} className="w-64 space-y-2">
            {post.featuredImage?.node.sourceUrl && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={300}
                height={160}
                className="w-full h-24 object-cover rounded"
              />
            )}
            <h4 className="text-sm font-semibold">{post.title}</h4>
            <p className="text-xs text-gray-600">
              {stripHtml(post.excerpt).slice(0, 40)}...
            </p>
            <a
              href={`/blog/${post.slug}`}
              className="text-gray-600 hover:underline text-sm"
            >
              Pročitaj više →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
