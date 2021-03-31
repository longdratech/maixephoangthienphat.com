import asset from "plugins/assets/asset";
import React from "react";
import Slider from "react-slick";
import Container from "components/website/elements/Container";
import { useRouter } from "next/router";

const fetchData = [
    {
        title: "Mái che di động 1",
        srcImg : "/images/demo/banner-01.jpg",
        description : "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    },
    {
        title: "Mái che di động 2",
        srcImg : "/images/demo/banner-01.jpg",
        description : "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    },
]

function BannerTop({
    dataList
}) {

    const router = useRouter();

    const handleRoute = (value) => {
        console.log("value : ", value);
        router.push(`/category/${value.id}`)
    }
  
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
            dataList
                ? <Slider {...settings}>
                        {
                            dataList.map((data, index) => {
                                return (
                                    <div key={index} className="itemCarousel">
                                        <img src= {data.image} />
                                    
                                            <div className="infoItemCopy">
                                            
                                            <h3>{data.title}</h3>
                                            <p>
                                                {data.description}
                                            </p>
                                            <span onClick={()=>handleRoute(data)} className="btn">Xem tất cả</span>
                                            
                                        </div>
                                    
                                        
                                    </div>
                                )
                            })
                        }
                    </Slider>
                :   <Slider {...settings}>
                        {
                            fetchData.map((data, index) => {
                                return (
                                    <div key={index} className="itemCarousel">
                                        <img src= {data.srcImg} />
                                    
                                            <div className="infoItemCopy">
                                            
                                            <h3>{data.title}</h3>
                                            <p>
                                                {data.description}
                                            </p>
                                            <span className="btn">Xem tất cả</span>
                                            
                                        </div>
                                    
                                        
                                    </div>
                                )
                            })
                        }
                    </Slider>
        }

        <style jsx>{`
            .itemCarousel{
                position: relative;
                img{
                    width: 100%;
                    height: 83vh;
                    object-fit: cover;
                    max-height: 560px;
                    min-height: 300px;
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
                box-shadow: 0 20px 25px rgba(253, 118, 105,0.2);
                transition: all 0.5s ease-in-out;
                &:hover{
                    box-shadow: 0 20px 25px rgba(253, 118, 105,0.5);
                }
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
                max-width: 450px;
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

export default BannerTop;
