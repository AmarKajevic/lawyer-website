import { BlockRenderer } from "../../components/BlockRenderer/BlockRenderer";
import getPageStaticProps from "../../utils/getPageStaticProps";
import { getSeo } from "../../utils/getSeo";

const Home = async () => {
  const {
    blocks,
  } = await getPageStaticProps(); 

  return <BlockRenderer blocks={blocks} />;
};
export async function generateMetadata() {
  const seo = await getSeo("/");

  return {
    title: seo?.title || "Default Title",
    description: seo?.metaDesc || "Default description",
  };
}

export default Home;
