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
const SERVER = "http://103.90.226.237:3000";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ConfigLive.consoleHandle();
    return () => {};
  }, []);

  useEffect(() => {
    if (typeof io !== "undefined" && io) {
      let socket = io.connect(SERVER);

      socket.on("connect", () => {
        console.log("socket", socket);

        socket.emit("events", { views: 1 });

        socket.emit("Identity", 0, (response) => {
          console.log("RES Identity: ", response);
        });
        socket.on("events", function (data) {
          console.log("Events, ", data);
        });

        socket.on("exception", function (data) {
          console.log("Events, ", data);
        });

        socket.on("disconnect", function () {
          console.log("disconnect");
        });
      });
    }
  }, []);

  return (
    <MainContent>
      <Component {...pageProps} />
      {/* <div>
        Web đang bảo trì.. Chúng tôi sẽ cập nhật trong thời gian sớm nhất. Xin
        cảm ơn
      </div> */}
    </MainContent>
  );
}

export default MyApp;
