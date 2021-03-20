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
import { Pagination } from "antd";
import ApiCall from "modules/ApiCall";

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
const limitDefault = 3;
const totalList = 3;

export default function ProductDetail(props) {

    const router = useRouter();
    const valueContext = useContext(MainContent);
    const [data, setData] = useState();
    const [dataAll, setDataAll] = useState();
    const [dataRender, setDataRender] = useState();
    const [statusLoading, setStatusLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState();
    const [total, setTotal] = useState();

    const handleRouter = (id) => {
        router.push(`/chi-tiet-san-pham/${id}`);
    }

    const filterDataRender = (id, list) => {
        const newListRender = []
        list.filter((_value, index) => {
            if(_value.id !== id){
                newListRender.push(_value);
            }
        });
        console.log("List Render: ", newListRender)
        return newListRender;
    }

    // useEffect(() => {
    //     if(valueContext){
    //         valueContext.getDataProduct(setData, props.query.slug);
    //     }
    // }, []);

    const getDataProducts = async (name, page=1) =>{
        let res = await ApiCall({
          path: `/products/?page=${page}&limit=${limitDefault}&category=${name}`
        });
        if (res) {
            console.log("ress all", res);
            setTotal(res.totalCount)
            setDataAll(res);
            setCurrentPage(res.page);
        }
    }

    const onChangePage = (page)=>{
        setStatusLoading(true)
        setCurrentPage(page);
    }

    useEffect(()=>{
        
        if(dataAll && data){
            setDataRender(filterDataRender(data.id, dataAll.data));
            setStatusLoading(false);
        }
        if(data && !dataAll){
            getDataProducts(data.category);
        }
    },[dataAll, data]);

    useEffect(()=>{
        valueContext.getDataProduct(setData, props.query.slug);
        setStatusLoading(true);
    }, [props.query.slug]);


    useEffect(()=>{
        if(currentPage){
            getDataProducts(data.category, currentPage);
        }
    }, [currentPage])

    function callback(key) {
        console.log(key);
      }

    return (
        <MasterPageBasic hidePrevButton pageName="Chi tiết sản phẩm">

            <Header active="san-pham"></Header>

            <main id="pProductDetail">

                {
                    data
                    ? <BannerTopStyle2 data={
                        [{
                            title: data.category,
                            srcImg: "/images/demo/banner-top-style-2.jpg",
                            description: ""
                        }]
                     }> </BannerTopStyle2>
                    :<></>
                }
                
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
                                ? data.images.map((value, index)=>{
                                    return <div key={index} className="contentImages">
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
                            dataAll && dataAll.data.length !== 0
                            ? dataAll.data.map((data, index)=>{
                                
                                    return <ItemProductSmall handleClick={()=>handleRouter(data.id)}
                                    key={index}
                                    dataAPI={data} >
                                    </ItemProductSmall>
                                
                            })
                            :<h3>Không còn sản phẩm khác.</h3>
                        }
                    </LayoutGrid>
                </Container>
                <Container className="center">
                    <Pagination
                            onChange={onChangePage}
                            defaultPageSize={limitDefault}
                            current={currentPage || 1}
                            defaultCurrent={1}
                            total={total || 1 }
                        />
                </Container>
            </main>

            <FooterCustom></FooterCustom>
            <Loading status={statusLoading}></Loading>
        </MasterPageBasic>
    );
}
