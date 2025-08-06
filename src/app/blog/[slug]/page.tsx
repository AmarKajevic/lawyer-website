import { gql } from "@apollo/client"
import client from "../../../../client";
import { notFound } from "next/navigation";
import { getSeo } from "../../../../utils/getSeo";

const GET_POST_BY_SLUG = gql`
     query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
      title
      content
      date
    }
  }
`

export default async function page({params} :
 {params: Promise<{slug: string[]}> }) {
    const{slug} = await params;
    const {data} = await client.query({
        query: GET_POST_BY_SLUG,
        variables : {slug: (await params).slug}
    });
    const post = data?.post;
    if(!post) return notFound();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{new Date(post.date).toLocaleDateString()}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const slugPath = Array.isArray(slug) ? slug : [slug];
  const uri = slugPath.length ? `/${slugPath.join("/")}` : "/";

  const seo = await getSeo(uri);

  return {
    title: seo?.title || "Default Title",
    description: seo?.metaDesc || "Default description",
  };
}

