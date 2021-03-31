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
import {useState, useEffect} from "react";
import Loading from "components/website/loading/Loading";

const fetchData = [
    {
        title: "Giới thiệu",
        srcImg: "/images/demo/banner-top-style-2.jpg",
        description: "Mái che  di động, nắng mưa nay đã không còn là nỗi lo."
    }
]

export default function Introduce(props) {
    // const router = useRouter();
    const [statusLoading, setStatusLoading] = useState(false);
    useEffect(() => {
        if (fetchData) {
            setStatusLoading(false)
        }
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

                    <p>{`Ngày nay bên cạnh các sản phẩm mái kéo được ưa chuộng. 
                    Hiện nay người dùng cũng thích lắp đặt những loại mái xếp hay mái hiên.
                    Không chỉ vì thành phố bị hạn hẹp về diện tích mà ở những vùng quê cũng dần thích lắp đặt.
                    Đặc biệt là các công trình có tính tối ưu về lợi ích. Mọi người thường thích lắp đặt `}</p>
                    <h1># / Mái Hiên, Mái Xếp Sản Phẩm được Tin Dùng Rộng Dãi</h1>
                    <p>{`Mái xếp di động Hoàng Thiên Phát, mái xếp Hoàng Thiên Phát là một trong những công ty uy tín 
                    bậc nhất về lắp đặt và sửa chữa mái hiên tại miền nam và các tỉnh phụ cận như miền tây nam bộ và miền đông nam bộ. 
                    Đã hoạt động và làm việc trong ngành thời gian dài.`}</p>

                    <p>{` Trong đó có đến 70% đơn đặt hàng là yêu cầu cung cấp mái xếp di động với nhiều mẫu mã và 
                    chủng loại khác nhau. có nhiều khách hàng chia sẻ rằng kể từ khi lắp mái hiên ,
                     mái xếp và mái che di động việc sinh hoạt gia đình được mở rộng không gian hơn. `}</p>

                    <p><img src={asset("/images/demo/banner-03.jpg")}/></p>

                    <h1># / Mái Hiên Mở Rộng Không Gian Sống Hữu ích</h1>

                    <p>{`Thay vì trước đây phải ra ngoài. 
                    Thì bây giờ cuối tuần bạn bè người thân có thể tập trung lại ngồi nhâm nhi vài ly trà hay tách cafe. 
                    Làm vài món ăn lai rai. 
                    Con cái được vui chơi không sợ trời nắng của buổi trưa hay sương lạnh và buổi sáng. ]`}</p>

                    <p>{`Càng thắt chặt hơn tình cảm của mọi người trong gia đình. 
                    cuộc sống thật hạnh phúc ấm áp và vô cùng ý nghĩa. mặc dù  Trụ sơ chính của công ty mái hiên,
                     mái xếp hòa phát đặt tại  Tp. Bình dương nhưng công ty không chỉ lắp đặt mái hiên trên địa bàn khu vực miền nam. 
                     Mà chúng tôi còn cung ứng và nhận lắp đặt thi công nhiều công trình ở các tỉnh lân cận…`}</p>

                </Container>
            </main>

            <FooterCustom></FooterCustom>

            <Loading status={statusLoading}></Loading>
        </MasterPageBasic>
    );
}
