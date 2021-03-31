// import { useQuery } from "@apollo/client";
import asset from "plugins/assets/asset";
import React from "react";
import Slider from "react-slick";
import TitleCopy from "components/website/title/TitleCopy";
import Container from "components/website/elements/Container";

const fetchData = [
    {
        title: "Mái che di động",
        srcImg: "/images/demo/banner-top-style-2.jpg",
        description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    }
]

function BannerTopStyle2({ data }) {

    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        // centerMode: true,
        // centerPadding: 0,
        speed: 1000,
        autoplay: false,
        autoplaySpeed: 3000,
        // fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,

    };

    return <div className="carouselCustom bannerTopStyle2">
        {
            data
                ? <Slider {...settings}>
                    {
                        data.map((value, index) => {
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src={value.image ? value.image : asset(fetchData[0].srcImg)}/>
                                    <div className="infoItemCopy">
                                        <TitleCopy
                                            name={value.title}
                                            positionLine={"CENTER"}
                                            color="#fff"
                                            fontSize={40}
                                        ></TitleCopy>

                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
                : <></>
        }

        <style jsx>{`
            .itemCarousel{
                position: relative;
                img{
                    width: 100%;
                    height: 30vh;
                    object-fit: cover;
                    max-height: 560px;
                    min-height: 300px;
                }
                &::after{
                    content: "";
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    background-color: rgba(0,0,0,0.4);
                }
            }
            img{
                display:block;
                width:100%;
            }
            .btn{
                padding: 10px 30px;
                border-radius: 20px;
                background-color: #FD7669;
                display: flex;
                cursor: pointer;
                color: #fff;
            }
            .infoItemCopy{
                padding: 30px 30px;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                h3{
                    font-size: 32px;
                    font-family: "Montserrat-SemiBold";
                    color: #fff;
                }
                p{
                    padding: 20px 0;
                }
                .btn{
                    margin-left: auto;
                    margin-right: auto;
                }
            }
            @media only screen and (max-width : 768px){
                .infoItemCopy{
                    width: 100%;
                }
            }
            @media only screen and (max-width : 599px){

                .itemCarousel{
                    img{
                        height: 60vh;
                    }
                }

                .infoItemCopy{
                    width: 85%;
                    left: 50%;
                    transform: translate(-50%,0);
                    padding: 20px 20px;

                    h3{
                        font-size: 24px;
                    }
                }

            }
        `}</style>
    </div>
}

export default BannerTopStyle2;
