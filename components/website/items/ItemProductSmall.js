import asset from "plugins/assets/asset";
import Slider from "react-slick";
const fetchData = 
    {
        title: "Mái che di động 1",
        srcImgs : ["/images/demo/banner-01.png","/images/demo/banner-01.png", "/images/demo/banner-02.jpg"],
        description : "Mái che  di động, nắng mưa nay đã không còn là nỗi lo.",
        price : "1.300.000 đ",
    }


export default function ItemProductSmall({
    name,
    description,
    price
}){

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
          />
        );
      }
      
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
          />
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        autoplaySpeed: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return <div className="itemProductSmall">
        {
            fetchData.srcImgs
                ? <Slider {...settings}>
                    {
                        fetchData.srcImgs.map((value, index) => {
                            console.log(value)
                            return (
                                <div key={index} className="itemCarousel">
                                    <img src= {asset(value)} />
                                </div>
                            )
                        })
                    }
                </Slider>
                : <></>
        }
        <div className="infoItemProductSmall">

            <h4>{fetchData.title}</h4>
            <span>{fetchData.price}</span>
            <p>
                {`Bảo hành: 12 tháng`}
            </p>

            <div className="infoTracking">
                <svg xmlns="http://www.w3.org/2000/svg" width="18.604" height="10.344" viewBox="0 0 17.604 10.344">
                    <g id="view_icon" data-name="view icon" transform="translate(5128 -1531.985)">
                        <path id="Path_32" data-name="Path 32" d="M17.493,97.691c-.157-.2-3.9-4.856-8.691-4.856S.269,97.493.112,97.691a.5.5,0,0,0,0,.632c.157.2,3.9,4.856,8.691,4.856s8.533-4.658,8.691-4.856A.5.5,0,0,0,17.493,97.691ZM8.8,102.109c-3.525,0-6.579-3.092-7.483-4.1.9-1.012,3.95-4.1,7.483-4.1s6.578,3.091,7.483,4.1C15.382,99.019,12.335,102.109,8.8,102.109Z" transform="translate(-5128 1439.15)" fill="#707070"/>
                        <path id="Path_33" data-name="Path 33" d="M157.929,154.725a2.832,2.832,0,1,0,3.207,2.807A3.031,3.031,0,0,0,157.929,154.725Zm0,4.678a1.888,1.888,0,1,1,2.138-1.871A2.02,2.02,0,0,1,157.929,159.4Z" transform="translate(-5277.127 1379.625)" fill="#707070"/>
                    </g>
                </svg>
                <p>{`1.000`}</p>
                <span>
                    Đã bán: 100
                </span>
            </div>

        </div>

        <style jsx>{`

            .itemProductSmall{
                /* width: 30vw; */
                overflow: hidden;
                background-color: #fff;
                border-radius: 20px;
            }
            .itemCarousel{
                /* width: 30vw; */
                overflow: hidden;
                border-radius: 20px;
                img{
                    width: 100%;
                    height: 30vh;
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
                    padding: 20px 0;
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