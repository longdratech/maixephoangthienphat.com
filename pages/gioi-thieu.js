// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
// import Header from "components/website/elements/Header";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import TitleCopy from "components/website/title/TitleCopy";
import asset from "plugins/assets/asset";

const fetchData = [
  {
      title: "Giới thiệu",
      srcImg: "/images/demo/banner-top-style-2.jpg",
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
        <Container className="listContact">
          <TitleCopy
              name={"Sản xuất mái hiên - mái xếp Hoàng Thiên Phát"}
              positionLine={"LEFT"}
              className="noneLine"
            >
              

            </TitleCopy>
        </Container>
        <Container className="contentIntroduce">

              <p>{`Ngày nay bên cạnh các sản phẩm mái kéo được ưa chuộng. Hiện nay người dùng cũng thích
                lắp đặt những loại mái xếp hay mái hiên. Không chỉ vì thành phố bị hạn hẹp về diện tích mà ở 
                những vùng quê cũng dần thích lắp đặt. Đặc biệt là các công trình có tính tối ưu về lợi ích. 
                Mọi người thường thích lắp đặt mái hiên di động  cho khuôn viên trước sân nhà 
                hoặc ở khu vực nhà để xe.  Công ty , mái xếp hòa phát là một trong những công ty uy tín bậc 
                nhất về lắp đặt và sửa chữa mái hiên tại miền nam và các tỉnh phụ cận như miền tây nam bộ 
                và miền đông nam bộ. Đã hoạt động và làm việc trong ngành thời gian dài.`}</p>

              <p>{`Ngày nay bên cạnh các sản phẩm mái kéo được ưa chuộng. Hiện nay người dùng cũng thích
                lắp đặt những loại mái xếp hay mái hiên. Không chỉ vì thành phố bị hạn hẹp về diện tích mà ở 
                những vùng quê cũng dần thích lắp đặt. Đặc biệt là các công trình có tính tối ưu về lợi ích. 
                Mọi người thường thích lắp đặt mái hiên di động  cho khuôn viên trước sân nhà 
                hoặc ở khu vực nhà để xe.  Công ty , mái xếp hòa phát là một trong những công ty uy tín bậc 
                nhất về lắp đặt và sửa chữa mái hiên tại miền nam và các tỉnh phụ cận như miền tây nam bộ 
                và miền đông nam bộ. Đã hoạt động và làm việc trong ngành thời gian dài.`}</p>

              <p>{`Ngày nay bên cạnh các sản phẩm mái kéo được ưa chuộng. Hiện nay người dùng cũng thích
                lắp đặt những loại mái xếp hay mái hiên. Không chỉ vì thành phố bị hạn hẹp về diện tích mà ở 
                những vùng quê cũng dần thích lắp đặt. Đặc biệt là các công trình có tính tối ưu về lợi ích. 
                Mọi người thường thích lắp đặt mái hiên di động  cho khuôn viên trước sân nhà 
                hoặc ở khu vực nhà để xe.  Công ty , mái xếp hòa phát là một trong những công ty uy tín bậc 
                nhất về lắp đặt và sửa chữa mái hiên tại miền nam và các tỉnh phụ cận như miền tây nam bộ 
                và miền đông nam bộ. Đã hoạt động và làm việc trong ngành thời gian dài.`}</p>

              <p><img src={asset("/images/demo/banner-03.jpg")}/></p>

              <p>{`Ngày nay bên cạnh các sản phẩm mái kéo được ưa chuộng. Hiện nay người dùng cũng thích
                lắp đặt những loại mái xếp hay mái hiên. Không chỉ vì thành phố bị hạn hẹp về diện tích mà ở 
                những vùng quê cũng dần thích lắp đặt. Đặc biệt là các công trình có tính tối ưu về lợi ích. 
                Mọi người thường thích lắp đặt mái hiên di động  cho khuôn viên trước sân nhà 
                hoặc ở khu vực nhà để xe.  Công ty , mái xếp hòa phát là một trong những công ty uy tín bậc 
                nhất về lắp đặt và sửa chữa mái hiên tại miền nam và các tỉnh phụ cận như miền tây nam bộ 
                và miền đông nam bộ. Đã hoạt động và làm việc trong ngành thời gian dài.`}</p>

              <p>{``}</p>

        </Container>
      </main>

      <FooterCustom></FooterCustom>
     
      
    </MasterPageBasic>
  );
}
