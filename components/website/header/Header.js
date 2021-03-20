
import MenuList from "components/website/menu/MenuList";
import Container from "components/website/elements/Container";
import MenuCustom from "components/website/menu/CustomMenu";
import { useState, useEffect, useRef } from "react";
import useScroll from "components/website/hooks-custom/useScroll";
import renderHTML from 'react-render-html';
const fb =`<!-- Load Facebook SDK for JavaScript -->
<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      xfbml            : true,
      version          : 'v10.0'
    });
  };

  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!-- Your Chat Plugin code -->
<div class="fb-customerchat"
  attribution="setup_tool"
  page_id="118299907006711"
theme_color="#08093f"
logged_in_greeting="Hi! How can we help you?"
logged_out_greeting="Hi! How can we help you?">
</div>
<div class="zalo-chat-widget" data-oaid="579745863508352884" data-welcome-message="Rất vui khi được hỗ trợ bạn!" data-autopopup="0" data-width="350" data-height="420"></div>
<script src="https://sp.zalo.me/plugins/sdk.js"></script>
`
export default function Header({active}){

    const { scrollX, scrollY, scrollDirection } = useScroll();
    const [fixed, setFixed] = useState(false);

    useEffect(() => {
        // console.log("scrollY", scrollY);
        // console.log("scrollDirection", scrollDirection);
        if (scrollY && scrollY >= 250) {
          setFixed(true);
        } else {
          setFixed(false);
        }
      }, [scrollY, scrollDirection]);
    return<>
    <header className={fixed === true ? "fixed" : ""}>
        <Container>
          <MenuList classActive={active}></MenuList>
          <MenuCustom></MenuCustom>
        </Container>
        {
          renderHTML(fb)
        }
      </header>
    
    </>
}