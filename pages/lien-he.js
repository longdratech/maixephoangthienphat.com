// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";

const fetchData = [
  {
      title: "Liên hệ",
      srcImg: "/images/demo/banner-top-style-2.png",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton pageName="Liên hệ">
      <Header active="lien-he"></Header>
      <main id="pContact">
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>
        <Container>
          <h2>Hello world!</h2>
        </Container>
      </main>

      <FooterCustom></FooterCustom>
      
    </MasterPageBasic>
  );
}
