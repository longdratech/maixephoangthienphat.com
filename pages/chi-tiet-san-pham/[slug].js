// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";

import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import ItemProductBigStyle2 from "components/website/items/ItemProductBigStyle2";
import LayoutGrid from "components/website/elements/LayoutGrid";

import {useContext, useEffect, useState, } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import { Spin, Tabs } from 'antd';
import TitleCopy from "components/website/title/TitleCopy";
import ItemProductSmall from "components/website/items/ItemProductSmall";
import Loading from "components/website/loading/Loading";

const { TabPane } = Tabs;

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

    const router = useRouter();
    const valueContext = useContext(MainContent);
    const [data, setData] = useState();
    const [dataAll, setDataAll] = useState();
    const [dataRender, setDataRender] = useState();
    const [statusLoading, setStatusLoading] = useState(true);

    const handleRouter = (id) => {
        router.push(`/chi-tiet-san-pham/${id}`);
    }

    const filterDataRender = (id, list) => {
        return list.filter((value, index) => {
            return value.id !== id;
        })
    }

    useEffect(() => {
        if(valueContext){
            valueContext.getDataProduct(setData, props.query.slug);
        }
    }, []);

    useEffect(()=>{
        if(dataAll && data){
            console.log("data API, " , data);
            setDataRender(filterDataRender(data.id, dataAll.data));
            setStatusLoading(false);
        }
    },[dataAll, data]);

    useEffect(()=>{
        valueContext.getDataProduct(setData, props.query.slug);
        valueContext.getDataProducts(setDataAll);
        // setStatusLoading(true);
    }, [props.query.slug]);

    function callback(key) {
        console.log(key);
      }

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

                <Container className="ContentInfoProduct">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab={"Mô tả"} key="1">
                            <div className="Description tabsContentInfoProduct">
                                {
                                    data && data.description
                                    ? data.description
                                    : "Chưa có thông tin" 
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="Thông số kỹ thuật" key="2">
                            <div className="Specifications tabsContentInfoProduct">
                                {
                                    data && data.specifications
                                    ? data.specifications
                                    : "Chưa có thông tin" 
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="Hình ảnh thực tế" key="3">
                            <div className="tabsContentInfoProduct">
                            {
                                data && data.images
                                ? data.images.map((value)=>{
                                    return <div className="contentImages">
                                        <img src={value}/>
                                    </div> 
                                })
                                : "Chưa có thông tin" 
                            }
                            </div>
                            
                        </TabPane>
                    </Tabs>
                </Container>

                <Container>

                    <TitleCopy
                        name={"Các sản phẩm khác"}
                        positionLine={"CENTER"}
                    ></TitleCopy>

                </Container>

                <Container>
                    <LayoutGrid column={3}>
                        {
                            dataRender 
                            ? dataRender.map((data, index)=>{
                                
                                    return <ItemProductSmall handleClick={()=>handleRouter(data.id)}
                                    key={index}
                                    dataAPI={data} >
                                    </ItemProductSmall>
                                
                            })
                            :<></>
                        }
                    </LayoutGrid>
                </Container>

                
            </main>

            <FooterCustom></FooterCustom>
            <Loading status={statusLoading}></Loading>
        </MasterPageBasic>
    );
}
