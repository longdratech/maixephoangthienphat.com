// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import LayoutGrid from "components/website/elements/LayoutGrid";
import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";

const fetchData = [
  {
      title: "Công trình",
      srcImg: "/images/demo/banner-top-style-2.jpg",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton pageName="Công trình">
      <Header active="cong-trinh"></Header>
      <main id="pConstructions">
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>


        <Container>

          <LayoutGrid column={1} paddingTop={80}>
            <ItemProductBigStyle2></ItemProductBigStyle2>
            <ItemProductBigStyle2></ItemProductBigStyle2>
            <ItemProductBigStyle2></ItemProductBigStyle2>
            <ItemProductBigStyle2></ItemProductBigStyle2>
            <ItemProductBigStyle2></ItemProductBigStyle2>
          </LayoutGrid>



        </Container>
      </main>
      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
