import Head from "next/head";
import CONFIG from "web.config";
import {useRouter} from "next/router";
import {NextSeo} from 'next-seo';
import asset from "plugins/assets/asset";
// import Compose from "components/diginext/context/Compose";
import {useEffect} from "react";
import  {io}  from "socket.io-client";
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

const amplitudeScript = `
<script type="text/javascript">
  (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
  ;r.type="text/javascript"
  ;r.integrity="sha384-girahbTbYZ9tT03PWWj0mEVgyxtZoyDF9KVZdL+R53PP5wCY0PiVUKq0jeRlMx9M"
  ;r.crossOrigin="anonymous";r.async=true
  ;r.src="https://cdn.amplitude.com/libs/amplitude-7.2.1-min.gz.js"
  ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
  console.log("[Amplitude] Error: could not load SDK")}}
  ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
  ;function s(e,t){e.prototype[t]=function(){
  this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
  var o=function(){this._q=[];return this}
  ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
  ;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
  ;return this}
  ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
  ;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
  ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId", "enableTracking", "setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
  ;function v(e){function t(t){e[t]=function(){
  e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
  for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
  e=(!e||e.length===0?"$default_instance":e).toLowerCase()
  ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
  ;e.amplitude=n})(window,document);

  amplitude.getInstance().init("66c1b87792f80cf93c5b64040c89011c");
</script>
`
const BlankMasterPage = ({pageName, children}) => {

    const router = useRouter();
    var socket ;
    
    useEffect(() => {
      if( typeof(window) != undefined && amplitude) {
        amplitude.getInstance().logEvent('USER_ONLINE');
       
      }
      // socket = io.connect("192.168.1.31:3000/");
      // console.log(" socket " , socket)
    }, []);

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
                <script src="/socket.io/socket.io.js"></script>

                <div style={{bottom: "50px !important"}} class="zalo-chat-widget" data-oaid="664405381284161454"
                     data-welcome-message="Rất vui khi được hỗ trợ bạn!"
                     data-autopopup="0" data-width="350" data-height="420"/>
                {
                    renderHTML(fb)
                }
                {
                    renderHTML(ga)
                }
                {
                  renderHTML(amplitudeScript)
                }
            </Head>
            {children}
        </>
    );
};

export default BlankMasterPage;
