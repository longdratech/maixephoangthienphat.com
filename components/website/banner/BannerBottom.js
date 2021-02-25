import asset from "plugins/assets/asset";
import Slider from "react-slick";
const fetchData = 
    {
        title: "Thi công mái hiên tại Bình Quới",
        srcImgs : ["/images/demo/banner-01.png", "/images/demo/banner-02.jpg"],
        description : "Thi công mái hiên di động tại Đà Nẵng Thi công mái hiên di động tại Đà Nẵng đã và đang đáp ứng nhu cầu đông đảo cho người sử dụng trên địa bàn khi muốn gia tăng diện tích",
        price : "1.300.000 đ",
    }


export default function BannerBottom({
    name="",
    description="",
    price,
    srcImgs,
    data,
}){

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12.288" height="10.636" viewBox="0 0 12.288 10.636">
            <path id="Path" d="M12.076,4.81,7.444.21a.727.727,0,0,0-1.024,0,.715.715,0,0,0,0,1.016L9.817,4.6H.724a.719.719,0,1,0,0,1.437H9.817L6.421,9.41a.715.715,0,0,0,0,1.016.727.727,0,0,0,1.024,0l4.632-4.6A.715.715,0,0,0,12.076,4.81Z" fill="#2a2a2a"/>
            </svg>
        </div>
        );
      }
      
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12.288" height="10.636" viewBox="0 0 12.288 10.636">
                <path id="Path" d="M12.076,5.826l-4.632,4.6a.727.727,0,0,1-1.024,0,.715.715,0,0,1,0-1.016l3.4-3.373H.724a.719.719,0,1,1,0-1.437H9.817l-3.4-3.373a.715.715,0,0,1,0-1.016.727.727,0,0,1,1.024,0l4.632,4.6A.715.715,0,0,1,12.076,5.826Z" transform="translate(12.288 10.636) rotate(180)" fill="#2a2a2a"/>
            </svg>


        </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1200,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return <div className="itemBannerBottom">
        {
            fetchData.srcImgs
                ? <Slider {...settings}>
                    {
                        data 
                        ?data.srcImgs.map((value, index) => {
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {asset(value)} />
                                    <div className="infoItemBannerBottom">
                                        <h4>{fetchData.title}</h4>
                                        <p className="descriptionItemBannerBottom">
                                            {fetchData.description}
                                        </p>

                                    </div>
                                </div>
                            )
                        })
                        :fetchData.srcImgs.map((value, index) => {
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {asset(value)} />
                                    <div className="infoItemBannerBottom">
                                        <h4>{fetchData.title}</h4>
                                        <p className="descriptionItemBannerBottom">
                                            {fetchData.description}
                                        </p>

                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
                : <></>
        }
        {/* <span className="priceSale">Giá sốc</span> */}

        

        <style jsx>{`
            .priceSale{
                position: absolute;
                top: 15px;
                left: 15px;
                padding: 8px 10px;
                background-color: #ff1600;
                font-family: "Montserrat-SemiBold";
                color: #fff;
                border-radius: 5px;
            }
            
            .itemBannerBottom{
                position: relative;
                transition: 0.3s;
                cursor: pointer;
            }
            .itemBannerBottom:hover .itemCarousel img{
                transform: scale(1.1);
            }
            .itemCarousel{
                overflow: hidden;
                height: 40vh;
                img{
                    transition: 0.3s;
                    width: 100%;
                    /* max-height: 50vh; */
                    height: 100%;
                    object-fit: cover;
                    
                }
                &::after{
                    content: "";
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: -3px;
                    z-index: 1;
                    background-color: rgba(0,0,0,0.5);
                }
            }
            .infoItemBannerBottom{
                z-index: 2;
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
                padding: 20px 15px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%,0);
                color: #fff;
               
                h4{
                    font-family: "Montserrat-SemiBold";
                    font-size: 32px;
                    color: #fff;
                    flex: 1;
                    text-align: center;
                }
                span{
                    font-family: "Montserrat-SemiBold";
                    font-size: 16px;
                    color: #fff;
                }
                p{
                    width: 100%;
                    padding: 10px 0;
                    color: #fff;
                    text-align: center;
                }

            }

            @media only screen and (max-width : 1024px){
                .infoItemBannerBottom{
                    width: 90%;
                    h4{
                        font-size: 24px;
                    }
                    p{
                        font-size: 14px;
                    }
                }
                
                .itemCarousel{
                        img{
                            height: 100%;
                            object-fit: cover;
                        }
                    }
            }
            @media only screen and (max-width : 599px){
                .infoItemBannerBottom{
                    h4{
                        font-size: 20px;
                    }
                    p{
                        font-size: 10px;
                    }
                }
            }
        `}</style>
    </div>
}