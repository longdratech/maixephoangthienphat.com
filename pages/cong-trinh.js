// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";
import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import LayoutGrid from "components/website/elements/LayoutGrid";
// import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import ItemPortfolios from "components/website/items/ItemPortfolios";
import { useRouter } from "next/router";
import ApiCall from "modules/ApiCall";
import Loading from "components/website/loading/Loading";

const fetchData = [
  {
      title: "Công trình",
      srcImg: "/images/demo/banner-top-style-2.jpg",
      description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
  }
]

export default function Home(props) {

  const router = useRouter();

  const limitDefault = 10;
  const totalList = 10;

  const [currentPage, setCurrentPage] = useState();
  const [total, setTotal] = useState();
  const [dataPortfolios, setDataPortfolios] = useState([]);
  const [statusLoading, setStatusLoading] = useState(true);

  const onChangePage = (page)=>{
    setCurrentPage(page);
  }

  const handleClickPortfolios = (id) => {

    router.push(`/cong-trinh/${id}`);

  }

  const getDataPortfolios = async (page=1) =>{
    let res = await ApiCall({
      path: `/portfolios?page=${page}&limit=${limitDefault}`
    });
    if (res) {
      setDataPortfolios(res);
      setCurrentPage(res.page)
      setTotal(res.totalCount);
      setStatusLoading(false);
    }
  }

  useEffect(()=>{

    getDataPortfolios();
  
  }, []);

  useEffect(()=>{
    if(currentPage){
      getDataPortfolios(currentPage);
    }
}, [currentPage]);

// useEffect(()=>{
//   if(dataPortfolios){
    
//   }
// }, [dataPortfolios])



  return (
    <MasterPageBasic hidePrevButton pageName="Công trình">
      <Header active="cong-trinh"></Header>
      <main id="pConstructions">
        <BannerTopStyle2 data={fetchData}></BannerTopStyle2>

        <Container>

          <LayoutGrid column={1} paddingTop={80}>
            {
                dataPortfolios.data 
                ? dataPortfolios.data.map((data, index)=>{
                   
                      return <ItemPortfolios handleClick={()=>handleClickPortfolios(data.id)}
                        key={index}
                        dataAPI={data} >
                      </ItemPortfolios>
                   
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
