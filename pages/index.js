// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTop from "components/website/banner/BannerTop";
// import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import BannerBottom from "components/website/banner/BannerBottom";
import TitleCopy from "components/website/title/TitleCopy";

import ItemProductSmall from "components/website/items/ItemProductSmall";
import ItemProductBig from "components/website/items/ItemProductBig";
import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";

import ItemTextInfo from "components/website/items/ItemTextInfo";
import LayoutGrid from "components/website/elements/LayoutGrid";

const fetchDataBannerBottom = 
    {
        title: "Thi công mái hiên tại Bình Quới",
        srcImgs : ["/images/demo/banner-bottom.jpg", "/images/demo/banner-02.jpg"],
        description : "Thi công mái hiên di động tại Đà Nẵng Thi công mái hiên di động tại Đà Nẵng đã và đang đáp ứng nhu cầu đông đảo cho người sử dụng trên địa bàn khi muốn gia tăng diện tích",
        price : "1.300.000 đ",
    }

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

        <Container>

          <TitleCopy
              name={"Mái che di động Hoàng Thiên Phát"}
              positionLine={"LEFT"}
              className="titleCompany"
            >
              <h4>Chất lượng đến từng chi tiết. Giá cả cạnh tranh</h4>
            </TitleCopy>

          <LayoutGrid className="infoCompany"> 

            <ItemTextInfo 
              title={`Mái hiên mái xếp di động Hoàng Thiên Phát`}
              description={`Chúng tôi chuyên sản xuất phân phối và thi công giá sỉ các sản phẩm chuyên ngành về mái hiên, mái xếp, mái che với đội ngũ thi công chuyên nghiệp. Luôn lắng nghe chia sẻ thấu hiểu khách hàng`}
              index="01"
            ></ItemTextInfo>

            <ItemTextInfo 
              title={`Mái hiên mái xếp di động Hoàng Thiên Phát`}
              description={`Chúng tôi chuyên sản xuất phân phối và thi công giá sỉ các sản phẩm chuyên ngành về mái hiên, mái xếp, mái che với đội ngũ thi công chuyên nghiệp. Luôn lắng nghe chia sẻ thấu hiểu khách hàng`}
              index="02"></ItemTextInfo>

            <ItemTextInfo title={`Mái hiên mái xếp di động Hoàng Thiên Phát`}
              description={`Chúng tôi chuyên sản xuất phân phối và thi công giá sỉ các sản phẩm chuyên ngành về mái hiên, mái xếp, mái che với đội ngũ thi công chuyên nghiệp. Luôn lắng nghe chia sẻ thấu hiểu khách hàng`}
              index="03"></ItemTextInfo>
          </LayoutGrid>
          

        </Container>

        {/* <Container>

          <TitleCopy
            name={"Công trình"}
            positionLine={"CENTER"}
          ></TitleCopy>

          <ItemProductBigStyle2></ItemProductBigStyle2>

        </Container> */}

        <Container>

          <TitleCopy
            name={"Công trình"}
            positionLine={"CENTER"}
          ></TitleCopy>

          <BannerBottom
            data={fetchDataBannerBottom}
          ></BannerBottom>

        </Container>
        
      </main>

      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
