import Head from "next/head";
import CONFIG from "web.config";
import {useRouter} from "next/router";
import {NextSeo} from 'next-seo';
import asset from "plugins/assets/asset";
// import Compose from "components/diginext/context/Compose";

import renderHTML from 'react-render-html';

const fb = `<!-- Load Facebook SDK for JavaScript -->
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
  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!-- Your Chat Plugin code -->
<div class="fb-customerchat"
  attribution="setup_tool"
  page_id="105430074207722"
logged_in_greeting="Xin chào, tôi có thể giúp gì cho bạn?"
logged_out_greeting="Xin chào, tôi có thể giúp gì cho bạn?">
</div>
`

const ga = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZH743344J2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZH743344J2');
</script>
`
const BlankMasterPage = ({pageName, children}) => {
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
                <meta name="description" content={CONFIG.site.description}/>
                <link rel="shortcut icon" href={`${CONFIG.getBasePath()}/favicon.ico`}/>
                <meta property="og:title" content={CONFIG.site.title}/>
                <meta property="og:description" content={CONFIG.site.description}/>
                <meta property="og:url" content={CONFIG.getBasePath() + router.asPath}/>
                <meta property="og:image" content={`${CONFIG.getBasePath()}/share.png`}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="fb:app_id" content={CONFIG.NEXT_PUBLIC_FB_APP_ID}/>

                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <link href={asset("/dashkit/fonts/cerebrisans/cerebrisans.css")} rel="stylesheet"/>
                <script src="https://sp.zalo.me/plugins/sdk.js"/>
                <div style={{bottom: "50px !important"}} class="zalo-chat-widget" data-oaid="579745863508352884"
                     data-welcome-message="Rất vui khi được hỗ trợ bạn!"
                     data-autopopup="0" data-width="350" data-height="420"/>
                {
                    renderHTML(fb)
                }
                {
                    renderHTML(ga)
                }
            </Head>
            {children}
        </>
    );
};

export default BlankMasterPage;
