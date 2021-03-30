import "antd/dist/antd.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "styles/global.scss";
import "styles/common.scss";
import "styles/responsive.scss";
import "quill/dist/quill.snow.css";
import { ConfigLive } from "plugins/utils/ConfigLive";
import { useEffect } from "react";
import MainContent from "../components/website/contexts/MainContent";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ConfigLive.consoleHandle();
    return () => {};
  }, []);

  return  <MainContent> 
    {/*<Component {...pageProps} /> */}
    <div >Web đang bảo trì.. Chúng tôi sẽ cập nhật trong thời gian sớm nhất. Xin cảm ơn</div>
  </MainContent>;
}

export default MyApp;
