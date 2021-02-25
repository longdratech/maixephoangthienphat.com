// import CONFIG from "web.config";
import asset from "plugins/assets/asset";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
// import Header from "components/website/elements/Header";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import ItemServices from "components/website/items/ItemServices";
import LayoutGrid from "components/website/elements/LayoutGrid";

const fetchData = [
  {
      title: "Dịch vụ",
      srcImg: "/images/demo/banner-top-style-2.png",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]

const fetchServices = [
  {
    title: "Tư vấn",
    srcImg:asset("/images/demo/icon-tu-van.png"),
    description: "Chúng tôi đang giúp tìm các giải pháp để tạo các sản phẩm phù hợp với nhu cầu của bạn"
  },
  {
    title: "Khảo sát",
    srcImg:asset("/images/demo/icon-khao-sat.png"),
    description: "Chúng tôi đang giúp tìm các giải pháp để tạo các sản phẩm phù hợp với nhu cầu của bạn"
  },
  {
    title: "Cung cấp vật tư",
    srcImg:asset("/images/demo/icon-cung-cap-vat-tu.png"),
    description: "Chúng tôi đang giúp tìm các giải pháp để tạo các sản phẩm phù hợp với nhu cầu của bạn"
  },
  {
    title: "Thi công",
    srcImg:asset("/images/demo/icon-thi-cong.png"),
    description: "Chúng tôi đang giúp tìm các giải pháp để tạo các sản phẩm phù hợp với nhu cầu của bạn"
  },
]

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton pageName="Dịch vụ">
      <Header active="dich-vu"></Header>
      <main id="pServices">
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>
        <Container>
          <LayoutGrid gridGap={50} paddingTop={50} className="containerServices">
            {
              fetchServices.map((value, index)=>{
                return(
                <ItemServices 
                  key={index}
                  title={value.title}
                  srcImg={value.srcImg}
                  description={value.description}
                ></ItemServices>
                )
              })
            }
            
          </LayoutGrid>
          
        </Container>
      </main>
     
      <FooterCustom></FooterCustom>
      
    </MasterPageBasic>
  );
}
