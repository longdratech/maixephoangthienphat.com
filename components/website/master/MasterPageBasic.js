import Head from "next/head";
import CONFIG from "web.config";
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';
import asset from "plugins/assets/asset";
// import Compose from "components/diginext/context/Compose";

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
theme_color="#008fe5"
logged_in_greeting="Hi! How can we help you?"
logged_out_greeting="Hi! How can we help you?">
</div>
`
const BlankMasterPage = ({ pageName, children }) => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        nofollow={CONFIG.environment != "production"}
        noindex={CONFIG.environment != "production"}
      />
      <Head>

        <title>
          {CONFIG.site.title} | {pageName || "Trang chủ"}
        </title>

        <meta name="description" content={CONFIG.site.description}></meta>

        <link rel="shortcut icon" href={`${CONFIG.getBasePath()}/favicon.ico`} />

        <meta property="og:title" content={CONFIG.site.title} />
        <meta property="og:description" content={CONFIG.site.description} />
        <meta property="og:url" content={CONFIG.getBasePath() + router.asPath} />
        <meta property="og:image" content={`${CONFIG.getBasePath()}/share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="fb:app_id" content={CONFIG.NEXT_PUBLIC_FB_APP_ID} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href={asset("/dashkit/fonts/cerebrisans/cerebrisans.css")} rel="stylesheet" />
        <script src="https://sp.zalo.me/plugins/sdk.js"></script>
        <div style={{bottom:"50px !important"}} class="zalo-chat-widget" data-oaid="579745863508352884" 
        data-welcome-message="Rất vui khi được hỗ trợ bạn!" 
        data-autopopup="0" data-width="350" data-height="420"></div>
        {
          renderHTML(fb)
        }
      </Head>
      {children}
    </>
  );
};

export default BlankMasterPage;
