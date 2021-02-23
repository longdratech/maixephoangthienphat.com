// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="lien-he"></Header>
      <main id="pContact">
        <BannerTopStyle2></BannerTopStyle2>
        <Container>
          <h2>Hello world!</h2>
        </Container>
      </main>

      <FooterCustom></FooterCustom>
      
    </MasterPageBasic>
  );
}
