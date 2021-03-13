// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";

import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";
import LayoutGrid from "components/website/elements/LayoutGrid";

import {useContext, useEffect, useState, } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import { Spin } from 'antd';
const fetchData = [
    {
        title: "Mái che di động",
        srcImg: "/images/demo/banner-top-style-2.jpg",
        description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    }
  ]

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
export default function ProductDetail(props) {
    // const router = useRouter();
    const valueContext = useContext(MainContent);
    const [data, setData] = useState();

    useEffect(() => {
        if(valueContext){
            valueContext.getDataProduct(setData, props.query.slug);
        }
    }, []);

    useEffect(()=>{
        if(data){
            console.log("data API, " , data);
        }
    },[data])

    return (
        <MasterPageBasic hidePrevButton pageName="Chi tiết sản phẩm">

            <Header active="san-pham"></Header>

            <main id="pProductDetail">

                <BannerTopStyle2 data={fetchData}></BannerTopStyle2>


                <Container>

                    <LayoutGrid column={1} paddingTop={80}>
                        {
                            data 
                            ? <ItemProductBigStyle2 dataAPI={data}></ItemProductBigStyle2>
                            : <Spin></Spin>
                        }
                        
                    </LayoutGrid>

                    

                </Container>
            </main>

            <FooterCustom></FooterCustom>

        </MasterPageBasic>
    );
}
