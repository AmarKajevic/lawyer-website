
import { notFound } from "next/navigation";
import { getPage } from "../../../utils/getPage";
import { BlockRenderer } from "../../../components/BlockRenderer/BlockRenderer";
import {getSeo} from "../../../utils/getSeo";


// interface PageParams {
//   slug: string[];
// }

// interface SeoData {
//   title: string;
//   metaDesc: string;
// }

// interface PageProps {
//   params: PageParams;
// }

export default async function Page({ params }:
  {params: Promise<{slug: string[]}> }) {
    const{slug} = await params;
  // Use await to get the slug parameter properly
  const slugPath = Array.isArray(slug)
  ? slug.join("/")
  : typeof slug === "string"
  ? slug
  : "";

  console.log("SLUG:", slugPath);

  // Fetch the page data
  const data = await getPage(slugPath);
  console.log("Page data", data);

  if (!data) {
    notFound();
  }

  return <BlockRenderer blocks={data.blocks} />;
}


export async function generateMetadata({ params }:
  {params: Promise<{slug: string[]}> }) {
    const{slug} = await params; {
  const slugPath = await (slug)
  const uri = slugPath ? `/${slugPath.join("/")}` : "/";

  const seo = await getSeo(uri);

  return {
    title: seo?.title || "Default Title",
    description: seo?.metaDesc || "Default description",
  };
}
}


 
