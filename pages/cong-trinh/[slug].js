// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
import { useRouter } from "next/router";
import Header from "components/website/header/Header";
import FooterCustom from "components/website/footer/FooterCustom";
import Container from "components/website/elements/Container";

import BannerTopStyle2 from "components/website/banner/BannerTopStyle2";
import ItemPortfolios from "components/website/items/ItemPortfolios";
import LayoutGrid from "components/website/elements/LayoutGrid";

import { useContext, useEffect, useState, } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import { Spin } from 'antd';

import TitleCopy from "components/website/title/TitleCopy";
import BannerBottom from "components/website/banner/BannerBottom";
import Loading from "components/website/loading/Loading";

import renderHTML from 'react-render-html';

const fetchData = [
    {
        title: "Công trình",
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

export default function PortfoliosDetail(props) {

    const router = useRouter();
    const valueContext = useContext(MainContent);
    const [data, setData] = useState();
    const [dataAll, setDataAll] = useState();
    const [dataRender, setDataRender] = useState();
    const [statusLoading, setStatusLoading] = useState(true);

    useEffect(() => {
        if (valueContext) {
            valueContext.getDataPortfolio(setData, props.query.slug);
            valueContext.getDataPortfolios(setDataAll);
        }
    }, []);

    useEffect(()=>{
        valueContext.getDataPortfolio(setData, props.query.slug);
        valueContext.getDataPortfolios(setDataAll);
    }, [props.query.slug])

    useEffect(() => {
        if (dataAll && data) {
            setDataRender(findDataRender(data.id, dataAll.data));
            setStatusLoading(false);
        }
    }, [dataAll, data]);

    const handleRouterPortfolio = (id) => {
        router.push(`/cong-trinh/${id}`);
    }

    const findDataRender = (id, list) => {
        return list.filter((value, index) => {
            return value.id != id;
        })
    }

    return (
        <MasterPageBasic hidePrevButton pageName="Chi tiết công trình">
            <Header active="cong-trinh"></Header>
            <main id="pProductDetail">
                <BannerTopStyle2 data={fetchData}></BannerTopStyle2>
                <Container className="containerPortfoliosDetail">
                    {
                        data && data.title 
                        ? <div className="contentPortfoliosDetail">
                            <h2>{data.title}</h2>
                            {renderHTML(data.content)}
                            {/* <div className="contentImages"></div> */}
                            {/* <img src={data.images[0]}/> */}
                            {/* <p>{data.description}</p> */}
                            <p className="link">
                                <a href={data.link} target="_blank">Link sản phẩm >></a>
                            </p>
                        </div>
                        :<>Chưa có thông tin về công trình này</>
                    }

                    <h3>

                    </h3>

                    {/* <LayoutGrid column={1} paddingTop={80}>

                        {
                            data
                                ? <ItemPortfolios dataAPI={data}></ItemPortfolios>
                                : <Spin></Spin>
                        }

                    </LayoutGrid> */}
                </Container>
                <Container>

                    <TitleCopy
                        name={"Các công trình khác"}
                        positionLine={"CENTER"}
                    ></TitleCopy>

                    {
                        dataRender
                            ? <BannerBottom handleRoute={handleRouterPortfolio} data={dataRender}></BannerBottom>
                            : <Spin></Spin>
                    }

                </Container>
            </main>
            <FooterCustom></FooterCustom>
            <Loading status={statusLoading}></Loading>
        </MasterPageBasic>
    );
}
