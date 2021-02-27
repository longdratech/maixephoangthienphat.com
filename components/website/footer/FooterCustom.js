import asset from "plugins/assets/asset";
import Container from "components/website/elements/Container";
import {useRouter} from "next/router"
export default function FooterCustom () {
  const router = useRouter();
    return <footer>
      <Container>
        {/* <a href="tel:0972205133" className="icon-call">
          <img src={asset("/images/icon-phone-call.png")} />
          <h5 className="text">
            Hotline : <b>097 220 5133</b>
          </h5>
        </a> */}
        <div className="contentFooter">
          <div className="logoInfo">
            <a onClick={()=>router.push("/")} target="_blank" className="logoFooter">
                <img src={asset("/images/logo.jpg")} />
                <h5 >Chất lượng đến tùng chi tiết</h5>
            </a>
            <div className="listConnect">
              <a href="#" target="_blank">
                <img src={asset("/images/icon-youtube.png")} />
              </a>
              <a href="#" target="_blank">
                <img src={asset("/images/icon-zalo.png")} />
              </a>
              <a href="#" target="_blank">
                <img src={asset("/images/icon-fb.png")} />
              </a>
              <a href="#" target="_blank">
                <img src={asset("/images/icon-inst.png")} />
              </a>
            </div>
          </div>
          <div className="listInfoFooter">
            <div className="itemInfo">
              <h4>Hoàng Thiên Phát</h4>
              <p>Chủ đầu tư: Trần Tiến Hải</p>
              <p>Ngân hàng: MB bank</p>
              <p>Số tài khoản: 0970134839999</p>
            </div>
            <div className="itemInfo">
              <h4>Trụ sở chính</h4>
              <p>Địa chỉ: 168 Chòm sao, <br /> Hưng Định Thuận An, Bình Dương</p>
              
            </div>
            <div className="itemInfo">
              <h4>Liên kết</h4>
              <p><a href="https://www.maixephoangthienphat.com" target="_blank">www.maixephoangthienphat.com</a></p>
              <p><a href="https://www.maixephoangthienphat.net" target="_blank">www.maixephoangthienphat.net</a></p>
              
            </div>
            <div className="itemInfo">
              <h4>Hỗ trợ</h4>
              <p>maixephoangthienphat@gmail.com</p>
              <p>Hotline: 0879.200.700</p>
              
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="endFooter">
            <h5>Copyright © 2021 - Hoàng Thiên Phát. All Rights Reserved.</h5>
            <a href="https://kmasoft.vn/" target="_blank">
              <img src={asset("/images/icon-cm.png")} />
              <h5>KMASoft</h5>
            </a>
        </div>
      </Container>
    
    <style jsx>{`
      footer{
        margin-top: 60px;
        border-top: solid 1px rgba(0,0,0,0.1);
      }
      .contentFooter{
        display: flex;
        padding-top: 25px;
      }

      .listInfoFooter{
        display: flex;
        flex: 1;
        justify-content: flex-end;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        .itemInfo{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 0 8px;

          h4{
            font-family: "Montserrat-SemiBold";
            font-size: 16px;
            color: #2A2A2A;
            position: relative;
            padding-bottom: 15px;
            margin-bottom: 15px;
            &::after{
                transition: 0.3s;
                content: "";
                position: absolute;
                width: 45px;
                top: 100%;
                left: 0;
                height: 2px;
                background-color: #ff1600;
              }
          }
          p{
            font-size: 14px;
            padding: 5px 0;
            color: #2A2A2A;
            a{
              color: #2A2A2A;
            }
          }
        }
      }
        
      .logoInfo{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .logoFooter{
          img{
            width: 100px;
          }
          h5{
            padding: 15px 0;
            font-size: 14px;
          }
          
        }
        .listConnect{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img{
            width: 30px;
            margin-right: 10px;
            transition: .3s;
            &:hover{
              transform: scale(1.1);
            }
          }
        }
      }


      .endFooter{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        border-top: 2px solid rgba(112,112,112,0.1);
        padding: 10px 0;
        margin-top: 10px;
        h5{
          flex: 1;
        }
        a{
          display: flex;
          flex-direction: row;
          align-items: center;
          img{
            width: 29px;
          }
          h5{
            padding-left: 20px;
          }
        }
      }


      .icon-call {
        .text {
          opacity: 0;
          right: 0%;
          position: absolute;
          width: 190px;
          font-family: Montserrat-Black;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 3px 5px;
          border-radius: 2px;
          text-align: center;
          b {
            color: #ed1c24;
            font-weight: bold;
            font-size: 16px;
          }
        }
        cursor: pointer;
        position: fixed;
        bottom: 120px;
        right: 32px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        border-color: #00aff2;
        background-color: rgba(0, 175, 242, 0.9);
        animation: play 2s ease infinite;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        img {
          z-index: 2;
          animation: playCall 2s ease infinite;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          -ms-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      }
      .icon-call:hover {
        background-color: rgba(117, 235, 80, 1);
        animation: playHover 2s ease infinite;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      .icon-call:hover .text {
        right: 140%;
        transition: 0.5s;
        opacity: 1;
      }
      @keyframes play {
        0% {
          transform: scale(1);
        }
        15% {
          box-shadow: 0 0 0 5px rgba(0, 175, 242, 0.4);
        }
        25% {
          box-shadow: 0 0 0 10px rgba(0, 175, 242, 0.4),
            0 0 0 20px rgba(0, 175, 242, 0.2);
        }
        25% {
          box-shadow: 0 0 0 15px rgba(0, 175, 242, 0.4),
            0 0 0 30px rgba(0, 175, 242, 0.2);
        }
      }

      @keyframes playHover {
        0% {
          transform: scale(1);
        }
        15% {
          box-shadow: 0 0 0 5px rgba(117, 235, 80, 0.4);
        }
        25% {
          box-shadow: 0 0 0 10px rgba(117, 235, 80, 0.4),
            0 0 0 20px rgba(117, 235, 80, 0.2);
        }
        25% {
          box-shadow: 0 0 0 15px rgba(117, 235, 80, 0.4),
            0 0 0 30px rgba(117, 235, 80, 0.2);
        }
      }
      @keyframes playCall {
        0% {
          transform: rotate(30deg);
        }
        10% {
          transform: rotate(0deg);
        }
        20% {
          transform: rotate(30deg);
        }
        30% {
          transform: rotate(0deg);
        }
        40% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(0deg);
        }
        70% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
      @media screen and (max-width: 768px) {
        .listInfoFooter{
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }
      @media screen and (max-width: 599px) {
        .contentFooter{
          flex-wrap: wrap;
          flex-direction: column;
        }
        .logoFooter{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .logoInfo .listConnect{
          justify-content: center;
          align-items: center;
        }
        .logoInfo{
          flex: 1;
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .icon-call {
          width: 40px;
          height: 40px;
          right: 32px;
        }
        .listInfoFooter{
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }

    `}</style>
  </footer>  
}