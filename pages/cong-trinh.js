// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
// import Header from "components/website/elements/Header";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="cong-trinh"></Header>
      <main id="pConstructions">
        <Container>
          <h2>Hello world!</h2>
        </Container>
      </main>
      <FooterCustom></FooterCustom>
      
    </MasterPageBasic>
  );
}
