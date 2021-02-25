// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";

import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
// import BannerBottom from "components/website/banner/BannerBottom";
import TitleCopy from "components/website/title/TitleCopy";
import ItemProductSmall from "components/website/items/ItemProductSmall";
import ItemProductBig from "components/website/items/ItemProductBig";
import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";

import ItemTextInfo from "components/website/items/ItemTextInfo";

import LayoutGrid from "components/website/elements/LayoutGrid";

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton pageName="Sản phẩm">

      <Header active="san-pham"></Header>

      <main id="pProducts">

        <BannerTopStyle2></BannerTopStyle2>

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
          </LayoutGrid>

          <LayoutGrid itemBig={true}>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductBig></ItemProductBig>
          </LayoutGrid>

          <LayoutGrid>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
            <ItemProductSmall></ItemProductSmall>
          </LayoutGrid>

          <LayoutGrid itemBig={true} revert={true}>
            <ItemProductBig></ItemProductBig>
            <ItemProductSmall></ItemProductSmall>
          </LayoutGrid>

        </Container>
      </main>

      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
