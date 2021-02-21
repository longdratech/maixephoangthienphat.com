// import { useQuery } from "@apollo/client";
import asset from "plugins/assets/asset";
import React from "react";
import Slider from "react-slick";
// import { Loading } from "src/component/Loading/Loading";
import Container from "components/website/elements/Container";

const fetchData = [
    {
        title: "Mái che di động 1",
        srcImg : "/images/demo/banner-01.png",
        description : "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    },
    {
        title: "Mái che di động 2",
        srcImg : "/images/demo/banner-01.png",
        description : "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    },
]

function BannerTop() {
  
    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        // centerMode: true,
        // centerPadding: 0,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        // fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,

    };
    
    return <div className="carouselCustom bannerTop">
        {
            fetchData
                ? <Slider {...settings}>
                    {
                        fetchData.map((image, index) => {
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {asset(image.srcImg)} />
                                   
                                        <div className="infoItemCopy">
                                        
                                        <h3>{image.title}</h3>
                                        <p>
                                                {image.description}
                                        </p>
                                        <span className="btn">Xem tất cả</span>
                                        
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
                    height: 83vh;
                    object-fit: cover;
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
                background-color: #fff;
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 10%;
                left: 8%;
                h3{
                    font-size: 32px;
                    font-family: "Montserrat-SemiBold";
                    color: #103C55;
                }
                p{
                    padding: 20px 0;
                }
                .btn{
                    margin-left: auto;
                    margin-right: auto;
                }
            }
        `}</style>
    </div>
}

export default BannerTop;
