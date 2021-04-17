import asset from "plugins/assets/asset";
import Slider from "react-slick";
import { useRouter } from "next/router"
const fetchData = 
    {
        id:"123",
        title: "Mái che di động 1",
        srcImgs : ["/images/demo/banner-01.jpg", "/images/demo/banner-02.jpg"],
        description : "Mái che  di động, nắng mưa nay đã không còn là nỗi lo.",
        price : "1.300.000 đ",
    }


export default function ItemPortfolios({
   
    dataAPI,
    handleClick,

}){

    const router = useRouter();

    const handleClickTitle = (e) =>{
       
        if(handleClick){
            handleClick();
        }
    }

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
        dots: true,
        infinite: true,
        arrows: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return <div className="ItemPortfolios">
        {
            dataAPI 
            ?  <Slider {...settings}>
                    {
                        dataAPI.images.map((value, index) => {
                            // console.log(value)
                            return (
                                <div key={index} className="itemCarousel"  onClick={handleClickTitle}>
                                    <img src= {value} />
                                </div>
                            )
                        })
                    }
                </Slider>
            :<Slider {...settings}>
                    {
                        fetchData.srcImgs.map((value, index) => {
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {asset(value)} />
                                </div>
                            )
                        })
                    }
            </Slider>
        }

        {
            dataAPI && dataAPI.status !== "DEPLOYED" 
            ? <span className="priceSale">Đang triển khai</span> 
            : <span className="priceSale success">Đã hoàn thành</span> 
        }
       
        <div className="infoItemProductBigStyle2"  onClick={handleClickTitle}>

            <h4>{dataAPI ?  dataAPI.title :fetchData.title}</h4>

            <p>
                { dataAPI ?  dataAPI.description : ""}
            </p>

        </div>

        
        <style jsx>{` 
            .priceSale{
                position: absolute;
                top: 0;
                right: 10px;
                /* border-top-right-radius: 20px; */
                padding: 8px 20px;
                background-color: #ff1600;
                font-family: "Montserrat-SemiBold";
                color: #fff;
                border-radius: 5px;
                z-index: 5;
                right: 0;
            }
            .priceSale.success{
                background-color: #75f300;
            }
            
            .ItemPortfolios{
                overflow: hidden;
                border-radius: 20px;
                position: relative;
                transition: 0.3s;
                cursor: pointer;
            }
            .ItemPortfolios:hover .itemCarousel img{
               
            }
            .itemCarousel{
                overflow: hidden;
                border-radius: 20px;
                z-index: 2;
                border: solid 1px rgba(0,0,0,0.1);
                img{
                    transition: 0.3s;
                    width: 35%;
                    max-height: 250px;
                    height: 100%;
                    border-radius: 20px;
                    object-fit: cover;
                }
                
            }
            .infoItemProductBigStyle2{
                display: block;
                height: 94%;
                padding: 20px 15px;
                position: absolute;
                width: 55%;
                top: 50%;
                left: 40%;
                transform: translate(0, -50%);
                background-color: #fff;
                border-radius: 20px;
                h4{
                    font-family: "Montserrat-SemiBold";
                    font-size: 24px;
                    color: #103C55;
                    flex: 1;
                    padding-bottom: 20px;
                    width: 80%;
                }
                span{
                    font-family: "Montserrat-SemiBold";
                    /* font-size: 16px; */
                    /* color: #707070; */
                }
                p{
                    font-size: 14px;
                    width: 100%;
                    padding: 5px 0;
                }

                .infoTracking{
                    width: 100%;
                    border-top: 1px solid rgba(112,112,112,0.1);
                    display: flex;
                    flex-direction: row;
                    padding: 0px 0;
                    padding-top: 10px;
                    margin-top: 10px;
                    align-items: center;
                    p{
                        padding-left: 10px;
                        flex: 1;
                    }
                    span{
                        font-family: "Montserrat-Regular";
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.85)

                    }
                }
            }

            @media only screen and (max-width : 1024px){
                .priceSale{
                    right: 0;
                }
                .infoItemProductBigStyle2{
                    position: relative;
                    width: 100%;
                    left: 0;
                    top: unset;
                    transform: unset;
                }
                .ItemPortfolios{
                    -webkit-box-shadow: 0 10px 6px -6px #7777771f;
                    -moz-box-shadow: 0 10px 6px -6px #7777771f;
                    box-shadow: 0 10px 6px -6px #7777771f;
                    &:hover{
                        -webkit-box-shadow: 0 10px 6px -6px #77777785;
                        -moz-box-shadow: 0 10px 6px -6px #77777785;
                        box-shadow: 0 10px 6px -6px #77777785;
                    }
                    
                }
                .itemCarousel{
                    img{
                        max-height: 26vh;
                        width: 100%;
                        height: 100%;
                        border-radius: 20px;
                        object-fit: cover;
                    }
                }
            }
        `}</style>
    </div>
}