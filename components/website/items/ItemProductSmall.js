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

export default function ItemProductSmall({
    // name,
    // description,
    // price,
    // listImg,
    dataAPI,
    handleClick,
}){

    const router = useRouter();

    const handleClickTitle = (e) =>{
        if(handleClick){
            handleClick();
        }else{
            router.push("/chi-tiet-san-pham/"+fetchData.id);
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
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1200,
        autoplay: false,
        // autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        nextArrow: <SampleNextArrow 
            style={{zIndex: 99, left:"0px", backgroundColor: "red"}}
        />,
        prevArrow: <SamplePrevArrow />
    };

    return <div className="itemProductSmall">
        {
            dataAPI 
            ?  <Slider {...settings}>
                    {
                        dataAPI.images.map((value, index) => {
                            // console.log(value)
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {value} />
                                </div>
                            )
                        })
                    }
                </Slider>
                :<Slider {...settings}>
                    {
                        fetchData.srcImgs.map((value, index) => {
                            // console.log(value)
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {asset(value)} />
                                </div>
                            )
                        })
                    }
                </Slider>
        }
        {dataAPI && dataAPI.isHotDeal == true ?  <span className="priceSale">Giá sốc</span> : <></>}
        <div className="infoItemProductSmall">

            <h4 onClick={handleClickTitle}>{dataAPI ?  dataAPI.title :fetchData.title}</h4>
            <span>{dataAPI ?  dataAPI.price+"đ": fetchData.price}</span>
            <p>
                Bảo hành: { dataAPI ?  dataAPI.guarantee +" tháng" : `12 tháng`} 
            </p>

            <div className="infoTracking">
                <svg xmlns="http://www.w3.org/2000/svg" width="18.604" height="10.344" viewBox="0 0 17.604 10.344">
                    <g id="view_icon" data-name="view icon" transform="translate(5128 -1531.985)">
                        <path id="Path_32" data-name="Path 32" d="M17.493,97.691c-.157-.2-3.9-4.856-8.691-4.856S.269,97.493.112,97.691a.5.5,0,0,0,0,.632c.157.2,3.9,4.856,8.691,4.856s8.533-4.658,8.691-4.856A.5.5,0,0,0,17.493,97.691ZM8.8,102.109c-3.525,0-6.579-3.092-7.483-4.1.9-1.012,3.95-4.1,7.483-4.1s6.578,3.091,7.483,4.1C15.382,99.019,12.335,102.109,8.8,102.109Z" transform="translate(-5128 1439.15)" fill="#707070"/>
                        <path id="Path_33" data-name="Path 33" d="M157.929,154.725a2.832,2.832,0,1,0,3.207,2.807A3.031,3.031,0,0,0,157.929,154.725Zm0,4.678a1.888,1.888,0,1,1,2.138-1.871A2.02,2.02,0,0,1,157.929,159.4Z" transform="translate(-5277.127 1379.625)" fill="#707070"/>
                    </g>
                </svg>
                <p>{ dataAPI ?  dataAPI.views : `1.000`}</p>
                <span>
                    Đã bán: { dataAPI ?  dataAPI.sold : `1.000`}
                </span>
            </div>

        </div>

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

            .itemProductSmall{
                /* width: 30vw; */
                position: relative;
                overflow: hidden;
                background-color: #fff;
                border-radius: 20px;
                transition: 0.3s;
                cursor: pointer;
                -webkit-box-shadow: 0 10px 6px -6px #7777771f;
                -moz-box-shadow: 0 10px 6px -6px #7777771f;
                box-shadow: 0 10px 6px -6px #7777771f;
                &:hover{
                    -webkit-box-shadow: 0 10px 6px -6px #77777785;
                    -moz-box-shadow: 0 10px 6px -6px #77777785;
                    box-shadow: 0 10px 6px -6px #77777785;
                }
            }
            .itemProductSmall:hover .itemCarousel img{
                transform: scale(1.2);
            }
            .itemCarousel{
                /* width: 30vw; */
                overflow: hidden;
                border-radius: 20px;
                img{
                    transition: 0.3s;
                    width: 100%;
                    height: 26vh;
                    object-fit: cover;
                }
            }
            .infoItemProductSmall{
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                flex-wrap: wrap;
                padding: 20px 10px;

                h4{
                    font-family: "Montserrat-SemiBold";
                    font-size: 16px;
                    color: #103C55;
                    flex: 1;
                }
                span{
                    font-family: "Montserrat-SemiBold";
                    font-size: 16px;
                    color: #103C55;
                }
                p{
                    width: 100%;
                    padding: 10px 0;
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
        `}</style>
    </div>
}