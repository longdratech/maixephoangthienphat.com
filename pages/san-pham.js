// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";

import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
// import BannerBottom from "components/website/banner/BannerBottom";
// import TitleCopy from "components/website/title/TitleCopy";
import ItemProductSmall from "components/website/items/ItemProductSmall";
import ItemProductBig from "components/website/items/ItemProductBig";
// import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";
// import ItemTextInfo from "components/website/items/ItemTextInfo";
import LayoutGrid from "components/website/elements/LayoutGrid";
import ApiCall from "modules/ApiCall";
import { Pagination } from "antd";
import Loading from "components/website/loading/Loading";

const fetchData = [
  {
      title: "Tất cả sản phẩm",
      srcImg: "/images/demo/banner-top-style-2.jpg",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]


export default function Home(props) {

  const router = useRouter();

  const limitDefault = 30;
  const totalList = 10;

  const [currentPage, setCurrentPage] = useState();
  const [total, setTotal] = useState();
  const [dataProducts, setDataProducts] = useState([]);

  const [statusLoading, setStatusLoading] = useState(true);

  const onChangePage = (page)=>{
    setCurrentPage(page);
  }

  const handleClickProduct = (id) => {

    router.push(`/chi-tiet-san-pham/${id}`);

  }

  const getDataProducts = async (page=1) =>{
    let res = await ApiCall({
      path: `/products?page=${page}&limit=${limitDefault}`
    });
    if (res) {
      setDataProducts(res);
      setCurrentPage(res.page)
      setTotal(res.totalCount);
      setStatusLoading(false);
    }
  }

  useEffect(()=>{

    getDataProducts();
  
  }, []);

  useEffect(()=>{
    if(currentPage){
      getDataProducts(currentPage);
    }
}, [currentPage])

  return (
    <MasterPageBasic hidePrevButton pageName="Sản phẩm">
      <Header active="san-pham"></Header>
      <main id="pProducts">
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>
        {/* <Container>
          <TitleCopy
            name={"Sản phẩm nổi bậc"}
            positionLine={"CENTER"}
          ></TitleCopy>
        </Container> */}
        <Container>

        <LayoutGrid itemBig={true} paddingTop={70}>
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

        <LayoutGrid itemBig={false} >
          {
              dataProducts.data 
              ? dataProducts.data.map((data, index)=>{
                  if(index > 1 && index <= 4) {
                   
                      return <ItemProductSmall handleClick={()=>handleClickProduct(data.id)}
                        key={index}
                        dataAPI={data}></ItemProductSmall>
                        
                  }else{
                    return <></>
                  }
              })
              :<></>
          }
        </LayoutGrid>

        <LayoutGrid itemBig={true}>
          {
              dataProducts.data 
              ? dataProducts.data.map((data, index)=>{
                if(index > 4 && index <=6) {
                  if(index == 6){
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
                  if(index > 6) {
                    return <ItemProductSmall handleClick={()=>handleClickProduct(data.id)}
                      key={index}
                      dataAPI={data} >
                    </ItemProductSmall>
                  }else{
                    return <></>
                  }
              })
              :<></>
            }
        </LayoutGrid>


        </Container>
        <Container className="center">
          <Pagination
                onChange={onChangePage}
                defaultPageSize={limitDefault}
                current={ currentPage || 1}
                defaultCurrent={1}
                total={total || totalList }
              />
        </Container>
      </main>

      <FooterCustom></FooterCustom>

      <Loading status={statusLoading}></Loading>
    </MasterPageBasic>
  );
}
