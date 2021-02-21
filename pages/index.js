// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
// import Header from "components/website/elements/Header";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTop from "components/website/banner/BannerTop"; 
// import DashkitButton from "components/dashkit/Buttons";
// import { BS } from "components/diginext/elements/Splitters";

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="/"></Header>
      <main id="pHome">
        <Container>
        
        </Container>
        <BannerTop></BannerTop>
      </main>
      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
