import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import { useRouter } from "next/router";
import {useState, useEffect, useContext} from "react";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTop from "components/website/banner/BannerTop";
import BannerBottom from "components/website/banner/BannerBottom";
import TitleCopy from "components/website/title/TitleCopy";
import ItemProductSmall from "components/website/items/ItemProductSmall";
import ItemProductBig from "components/website/items/ItemProductBig";
import { Spin } from 'antd';
import { MainContent } from "components/website/contexts/MainContent";
import ItemTextInfo from "components/website/items/ItemTextInfo";
import LayoutGrid from "components/website/elements/LayoutGrid";
import ApiCall from "modules/ApiCall";

export default function Home(props) {

  const router = useRouter();
  const valueContext = useContext(MainContent)
  const [dataBanner, setDataBanner] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataPortfolios, setDataPortfolios] = useState();
 
  const getDataBanner = async() => {
    let res = await ApiCall({
      path: "/categories"
    });
    if (res) {
      setDataBanner(res);
    }
  }

  const getDataProducts = async () =>{
    let res = await ApiCall({
      path: `/products?page=1&limit=7`
    });
    if (res) {
      setDataProducts(res);
    }
  }

  const handleClickProduct = (id) => {
    router.push(`/chi-tiet-san-pham/${id}`);
  }

  useEffect(()=>{
    
      getDataBanner();
      getDataProducts();
      valueContext.getDataPortfolios(setDataPortfolios);

  }, []);

  const handleRouterPortfolio = (id) => {
    router.push(`/cong-trinh/${id}`);
  }

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="/"></Header>
      <main id="pHome">

        {
          dataBanner 
          ? <BannerTop dataList={dataBanner}></BannerTop>
          : <BannerTop></BannerTop>
        }

        <Container>

          <TitleCopy
            name={"Sản phẩm nổi bậc"}
            positionLine={"CENTER"}
          ></TitleCopy>

        </Container>

        <Container>

          <LayoutGrid itemBig={true}>
            {
              dataProducts.data 
              ? dataProducts.data.map((data, index)=>{
                  if(index <=1) {
                    if(index == 1){
                      return <ItemProductBig handleClick={()=>handleClickProduct(data.id)}
                      key={index}
                      dataAPI={data}
                      ></ItemProductBig>
                    }else{
                      return <ItemProductSmall handleClick={()=>handleClickProduct(data.id)}
                        key={index}
                        dataAPI={data}
                      ></ItemProductSmall>
                    }
                    
                  }else{
                    return <></>
                  }
              })
              :<></>
            }
          </LayoutGrid>

          <LayoutGrid>
          {
              dataProducts.data 
              ? dataProducts.data.map((data, index)=>{
                  if(index >1 && index <= 4) {
                    return <ItemProductSmall handleClick={()=>handleClickProduct(data.id)}
                    key={index}
                    dataAPI={data}
                    ></ItemProductSmall>
                  }else{
                    return <></>
                  }
              })
              :<></>
            }
          </LayoutGrid>

          <LayoutGrid itemBig={true} revert={true}>
          {
              dataProducts.data 
              ? dataProducts.data.map((data, index)=>{
                  if(index >4 && index <= 6) {
                    if(index==5){
                      return <ItemProductBig handleClick={()=>handleClickProduct(data.id)}
                      key={index}
                      dataAPI={data}></ItemProductBig>
                    }else{
                      return <ItemProductSmall handleClick={()=>handleClickProduct(data.id)}
                        key={index}
                        dataAPI={data}></ItemProductSmall>
                    }
                  }else{
                    return <></>
                  }
              })
              :<></>
            }
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

          <LayoutGrid className="infoCompany" paddingTop={15}> 

            <ItemTextInfo 
              title={`Mái hiên mái xếp di động Hoàng Thiên Phát`}
              description={`Chúng tôi chuyên sản xuất phân phối và thi công giá sỉ các sản phẩm chuyên ngành về mái hiên, mái xếp, mái che với đội ngũ thi công chuyên nghiệp. Luôn lắng nghe chia sẻ thấu hiểu khách hàng.`}
              index="01"
            ></ItemTextInfo>

            <ItemTextInfo 
              title={`Ngành nghề và dịch vụ`}
              description={`Tất cả các sản phẩm của Hoàng Thiên Phát khi được đưa tới tay người tiêu dùng luôn được kiểm tra kỹ lưỡng từ khâu nguyên liệu đầu vào tới qui trình sản xuất, ứng dụng thực tế luôn nghiêm ngạc.`}
              index="02"></ItemTextInfo>

            <ItemTextInfo title={`Thành tựu và chứng nhận`}
              description={`Mái che Hoàng Thiên Phát có rất nhiều kinh nghiệm và thành tự trong lĩnh vực mái hiên, mái che, thi công bạt xếp mà hiếm có đơn vị nào khác có được. Hoàng Thiên phát đạt chứng nhận nâng cao.`}
              index="03"></ItemTextInfo>
          </LayoutGrid>
          
        </Container>

        <Container>

          <TitleCopy
            name={"Công trình"}
            positionLine={"CENTER"}
          ></TitleCopy>

          {
            dataPortfolios
            ?   <BannerBottom handleRoute={handleRouterPortfolio} data={dataPortfolios.data}></BannerBottom>
            :   <Spin></Spin>
          }

        </Container>
        
      </main>

      <FooterCustom></FooterCustom>

    </MasterPageBasic>
  );
}
