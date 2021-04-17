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
import Loading from "components/website/loading/Loading";
import React, { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import renderHTML from "react-render-html";

const fetchData = [
    {
        title: "Giới thiệu",
        srcImg: "/images/demo/banner-top-style-2.jpg",
        description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    }
]

export default function Introduce(props) {

    // const router = useRouter();

    const {
        getDataIntroduction, 
        statusLoading, 
        setStatusLoading} = useContext(MainContent);

    const [dataContent, setDataContent] = useState();
    const [dataRender, setDataRender] = useState();

    useEffect(()=>{
        if(dataContent){
            setDataRender(
                dataContent.filter(value => value.id.toString() == "7")
            )
            setStatusLoading(false);
        }
    },[dataContent]);


    useEffect(() => {
        getDataIntroduction(setDataContent)
        setStatusLoading(false);
    }, []);

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
                    {
                        dataRender && dataRender[0]
                        ? renderHTML(dataRender[0].content)
                        : <React.Fragment>
                        </React.Fragment>
                    }
                </Container>
            </main>

            <FooterCustom></FooterCustom>

            <Loading status={statusLoading}></Loading>
        </MasterPageBasic>
    );
}
