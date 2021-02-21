// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTop from "components/website/banner/BannerTop";
import TitleCopy from "components/website/title/TitleCopy";
import ItemProductSmall from "components/website/items/ItemProductSmall";
import LayoutGrid from "components/website/elements/LayoutGrid";
export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="/"></Header>
      <main id="pHome">
        
        <BannerTop></BannerTop>

        <Container>

          <TitleCopy
            name={"Sản phẩm nổi bậc"}
            positionLine={"CENTER"}
          ></TitleCopy>

        </Container>

        <Container>
          <LayoutGrid>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
          </LayoutGrid>
        </Container>
        
      </main>

      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
