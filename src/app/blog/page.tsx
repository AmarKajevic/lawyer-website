import { gql } from "@apollo/client"
import client from "../../../client"
import Image from "next/image";



function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}
const GET_BLOG_SEO = gql`
  query BlogSeo {
    nodeByUri(uri: "/blog") {
      ... on Page {
        seo {
          title
          metaDesc
        }
      }
    }
  }
`;

export async function generateMetadata() {
  // Probaj prvo iz WP da povuces SEO za /blog, ako postoji
  try {
    const { data } = await client.query({
      query: GET_BLOG_SEO,
    });
    const seo = data?.nodeByUri?.seo;
    if (seo) {
      return {
        title: seo.title || "Blog",
        description: seo.metaDesc || "Najnoviji blog postovi",
      };
    }
  } catch (error) {
    // ako WP nema SEO za /blog, ili error, ne brini
    console.log(error);
  }

  // Default SEO za blog listing ako WP ne vrati nista
  return {
    title: "Blog",
    description: "Najnoviji blog postovi na našem sajtu.",
  };
}
const GET_ALL_POSTS = gql`
    query AllPosts {
    posts {
        nodes {
        title
        id
        slug
        excerpt
        date
        featuredImage {
            node {
            sourceUrl
            }
        }
        }
    }
    }
`


export default async function BlogPage() {
    const {data} = await client.query({query: GET_ALL_POSTS})
    const posts = data?.posts?.nodes || [];
 return (
  <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Najnoviji blog postovi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded p-4">
            {post.featuredImage?.node.sourceUrl && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">
              {stripHtml(post.excerpt).slice(0, 150)}...
            </p>
            <a
              href={`/blog/${post.slug}`}
              className="text-gray-600 hover:underline mt-4 block"
            >
              Pročitaj više →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}