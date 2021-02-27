
import CONFIG from "web.config";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
// import { assertInputObjectType } from "graphql";
import asset from "plugins/assets/asset";
import useScroll from "components/website/hooks-custom/useScroll";
import Search from "components/website/search/Search";
export default function menuCustomList({
  classActive,
}) {
  const node = useRef();
  // const refSearch = useRef();
  const router = useRouter();

  const { scrollX, scrollY, scrollDirection } = useScroll();
  const [fixed, setFixed] = useState(false);
  // const baseUrlShare = CONFIG.NEXT_PUBLIC_BASE_URL;

  useEffect(()=>{
    console.log(router);
  },[])

  useEffect(() => {
    // console.log("scrollY", scrollY);
    // console.log("scrollDirection", scrollDirection);
    if(scrollY && scrollY >= 250){
      console.log("FIXED !!!")
      setFixed(true);
    }else{
      setFixed(false);
    }
  }, [ scrollY, scrollDirection] );

  return (
    <div className={ fixed === true ? "menuCustomList fixed": "menuCustomList" }>
      <div ref={node}>
        <a onClick={() => router.push("/")} className="logoDesktop">
          <img src={asset("/images/logo.jpg")}/>
        </a>
        <a onClick={() => router.push("/")} className={`${classActive == "/" || classActive === "" ? "active" : "" }`}>
          <span role="img" aria-label="Trang chủ"></span>
                Trang chủ
            </a>
        <a onClick={() => router.push("/gioi-thieu")} className={`${classActive == "gioi-thieu" ? "active" : "" }`}>
          <span role="img" aria-label="Giới thiệu"></span>
                Giới thiệu
            </a>
        <a onClick={() => router.push("/san-pham")} className={`${classActive == "san-pham" ? "active" : "" }`}>
          <span role="img" aria-label="Sản phẩm"></span>
                Sản phẩm
            </a>
        <a onClick={() => router.push("/dich-vu")} className={`${classActive == "dich-vu" ? "active" : "" }`}>
          <span role="img" aria-label="Dịch vụ"></span>
                Dịch vụ
            </a>
        <a onClick={() => router.push("/cong-trinh")} className={`${classActive == "cong-trinh" ? "active" : "" }`}>
          <span role="img" aria-label="Công trình"></span>
                Công trình
            </a>
        <a onClick={() => router.push("/lien-he")} className={`${classActive == "lien-he" ? "active" : "" }`}>
          <span role="img" aria-label="Liên hệ"></span>
                Liên hệ
            </a>
        
        {/* <a href="tel:0972205133" className="hotlineTop">
          <h3>
            <span>Hotline: </span>
            <b>0972205133</b>
          </h3>
          
        </a> */}
        <Search></Search>
      </div>
      <style jsx>{`
        
        .menuCustomList.fixed{
            position: fixed;
            z-index:9;
            width:100%;
            background-color: #fff;
            right: 0;
            top: 0;
            padding: 5px 0;
            transition: 0.4s;
        }
        .menuCustomList.fixed{
              -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0) inset;
                -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0) inset;
                      box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0) inset;
        }
        .menuCustomList{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            /* background-color: #a5c9ca; */
            padding:20px 0;
            color: #000;
            transition: 0.3s;
            >div{
              display: flex;
            }
            
            a{
                font-family: "Montserrat-SemiBold";
                color: #103C55;
                padding: 5px 6px;
                padding-bottom: 10px;
                font-size: 1vw;
                margin: 0 10px;
                margin-bottom: 10px;
                font-weight: 600;
                /* text-transform: uppercase; */
                display: flex;
                align-items: flex-end;
                cursor: pointer;
                transition: 0.3s;
                &:hover{
                  transition: 0.2s;
                  /* color: #ed1c24; */
                }
                img {
                  width: 100px;
                }
                position: relative;
              &::after{
                content: "";
                position: absolute;
                width: 0;
                bottom: 5%;
                height: 0;
                background-color: #ff1600;
                transition: 0.3s;
              }
            }

            a:hover{
              &::after{
                content: "";
                position: absolute;
                width: 20%;
                bottom: 5%;
                height: 2px;
                background-color: #ff1600;
              }
            }

            a.active{
              transition: 0.3s;
              &::after{
                transition: 0.3s;
                content: "";
                position: absolute;
                width: 20%;
                bottom: 5%;
                height: 2px;
                background-color: #ff1600;
              }
            }

            a:first-child::after{
              display: none !important;
              margin-bottom: 0;
            }
            a:first-child{
              margin-left: 0;
              padding-left: 0;
            }
        }
        .logoDesktop{
          img{
            display: block;
            width: 170px;
          }
        }
        .hotlineTop{
          /* margin: 0 !important; */
          h3{
            color: #fff;
            display: flex;
            background-color: #131773;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            padding: 5px 10px;
            font-size: 1vw;
            transition: 0.2s;
            &:hover{
              color: #ed1c24;
            }
            span{
              font-size: 1vw;
              margin-right: 2px;
              /* color: #ed1c24; */
            }
            b{
            }
          }
        }
        @media screen and (min-width : 1919px){
          .menuCustomList{
            a{
              font-size: 18px;
            }
          }
          .hotlineTop{
            h3{
              font-size: 18px;
              span{
                /* font-size: 10px; */
              }
              b{
              }
            }
          }
        }
        @media screen and (min-width : 1023px){
          .menuCustomList{
            display: flex;
            justify-content: flex-start;
            width: 100%;
            div{
              width:80%;
              /* justify-content: space-evenly; */
            }
          }
        }
      `}</style>
    </div>
  )
}
