import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
import FooterCustom from "components/website/footer/FooterCustom";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";

import ItemProductSmall from "components/website/items/ItemProductSmall";
import ItemProductBig from "components/website/items/ItemProductBig";
import LayoutGrid from "components/website/elements/LayoutGrid";

import { Pagination } from "antd";
import Loading from "components/website/loading/Loading";
import ApiCall from "modules/ApiCall";

export async function getServerSideProps(context) {
  
    const params = context.params;
    const query = context.query;
    const slug = context.params.slug;
   
      return {
        props: {
          params,
          query,
          slug,
        },
      };
}
  

const fetchData = [
    {
        title: "Kết quả tìm kiếm",
        srcImg: "/images/demo/banner-top-style-2.jpg",
        description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    }
]

const limitDefault = 5;
const totalList = 5;



export default function HomeCategory(props) {

  const router = useRouter();
  const [dataProducts, setDataProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [total, setTotal] = useState();
  const [statusLoading, setStatusLoading] = useState(true);

  const onChangePage = (page)=>{
    setCurrentPage(page);
  }

  const getDataProducts = async (name, page=1) =>{
    let res = await ApiCall({
      path: `/products/?page=${page}&limit=${limitDefault}&search=${name}`
    });
    if (res) {
        setTotal(res.totalCount)
        setDataProducts(res);
        setCurrentPage(res.page);
        setStatusLoading(false);
    }
  }

  const handleClickProduct = (id) => {

    router.push(`/chi-tiet-san-pham/${id}`);

  }

  useEffect(()=>{
    getDataProducts(router.query.slug);
  }, []);

  useEffect(()=>{
    getDataProducts(router.query.slug);
  },[router.query.slug])

  useEffect(()=>{
      if(currentPage){
        getDataProducts(router.query.slug, currentPage);
      }
  }, [currentPage])

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="san-pham"></Header>
      <main id="pHome">
        
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>

        <Container>

          <LayoutGrid paddingTop={50} paddingBottom={50}>
            {
              dataProducts.data && dataProducts.data.length !== 0 
              ? dataProducts.data.map((data, index)=>{
                return <ItemProductSmall
                    key={index}
                    dataAPI={data}
                    handleClick={()=>handleClickProduct(data.id)}
                ></ItemProductSmall>
              })
              :<p style={{textAlign:"center", width:"100%"}}>Không tìm thấy sản phẩm phù hợp</p>
            }
          </LayoutGrid>
          
        </Container>

        <Container className="center">
          <Pagination
                onChange={onChangePage}
                defaultPageSize={limitDefault}
                current={currentPage || 1}
                defaultCurrent={1}
                total={total ||totalList }
              />
        </Container>
      </main>

      <FooterCustom></FooterCustom>

      <Loading status={statusLoading}></Loading>

    </MasterPageBasic>
  );
}
