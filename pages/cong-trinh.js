// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import LayoutGrid from "components/website/elements/LayoutGrid";
import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";
import { Pagination } from "antd";
import { useState } from "react";
const fetchData = [
  {
      title: "Công trình",
      srcImg: "/images/demo/banner-top-style-2.jpg",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]

export default function Home(props) {
  // const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const limitDefault = 10;
  const totalList = 200;


  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return (
        <div>
          <p name="prev-white-fill" />
        </div>
      );
    }
    if (type === "next") {
      return (
        <div>
          <p name="next-white-fill" />
        </div>
      );
    }
    return originalElement;
  }

  const onChangePage = (page)=>{
    console.log("Page : ", page);
    setCurrentPage(page);
  }



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
        <Container className="center">
          <Pagination
                // size="small"
                // itemRender={itemRender}
                onChange={onChangePage}
                defaultPageSize={limitDefault}
                current={currentPage}
                defaultCurrent={1}
                total={totalList}
              />
        </Container>
      </main>
      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
