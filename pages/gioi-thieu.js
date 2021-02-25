// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
// import Header from "components/website/elements/Header";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
const fetchData = [
  {
      title: "Giới thiệu",
      srcImg: "/images/demo/banner-top-style-2.png",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]

export default function Introduce(props) {
  // const router = useRouter();
  
  return (
    <MasterPageBasic hidePrevButton pageName="Giới thiệu">
      <Header active="gioi-thieu"></Header>
      <main id="pIntroduce">
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>
        <Container>
          <h2>Hello world!</h2>
        </Container>
      </main>

      <FooterCustom></FooterCustom>
     
      
    </MasterPageBasic>
  );
}
