import LayoutPage from "components/admin/LayoutPage";
import PageHeader from "components/dashkit/PageHeader";
import { useRouter } from "next/router";
import {MainContent} from "components/website/contexts/MainContent";
import {useContext, useEffect, useState} from "react"
import Navbar from "components/website/navbar/Navbar";
import {Button} from "antd"
import Product from "components/website/content-page-admin/Products";
import Category from "components/website/content-page-admin/Category";
import ProductCreate from "components/website/content-page-admin/ProductCreate";
import CategoryCreate from "components/website/content-page-admin/CategoryCreate";
import UploadImages from  "components/website/content-page-admin/UploadImages";
import Portfolios from "components/website/content-page-admin/Portfolios";
import PortfoliosCreate from "components/website/content-page-admin/PortfoliosCreate";
import Socials from "components/website/content-page-admin/Socials";
import SocialsCreate from "components/website/content-page-admin/SocialsCreate";
import ChangePassword from "components/website/content-page-admin/ChangePassword";
import TrackingUser from "components/website/content-page-admin/TrackingUser";
// import Countdown from "react-countdown";

const routingContent = {

    PROFILE :  "profile",

    PRODUCTS : {
        CREATE :  "product-create",
        LITS :  "product-list",
    },

    PORTFOLIO  : {
        CREATE : "portfolio-create",
        LITS : "portfolio-list",
    },

    CATEGORIES : {
        CREATE :  "category-create",
        LITS :  "category-list",
    },

    IMAGES : {
        CREATE : "image-create"
    },

    SOCIALS  : {
        CREATE : "socials-create",
        LITS : "socials-list",
    },
    PASSWORD: {
        CHANGE : "change-password",
    }

}
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition


const AdminIndex = ({ user }) => {

    const valueContext =  useContext(MainContent);
    const router = useRouter();
    const [title, setTitle] = useState("Dashboard");
    const [slug, setSlug] = useState("profile");
    const [idProduct , setIdProduct] = useState();

    const handleClickMenu = (e) => {
        // console.log("DATA CLICK : ", e);
        // console.log("SLUG : ", e.item.props.value);
        if(e){
            e.item.props.title ?  setTitle(e.item.props.title) : setTitle("Dashboard");
            e.item.props.value ?  setSlug(e.item.props.value) : setSlug("profile");
        }
       
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            valueContext.logout();
          return <Completionist />;
        } else {
          // Render a countdown
          if(localStorage){
            localStorage.setItem("total_seconds", hours*3600 + minutes*60 + seconds);
          }
          return (
            <span>
              {hours}:{minutes}:{seconds}
            </span>
          );
        }
      };

    const handleRepairProduct = (id) => {
        console.log("repair ID", id);
    }

    const handleRepairPortfolio = (id) => {
        console.log("repair ID", id);
    }

    const handleChooseImg = (value) => {
        console.log("Click Img", value);
    }

    const handleContainer = ( slug )=>{

        switch (slug) {
            case routingContent.PRODUCTS.LITS:
                return <Product routeProductID={handleRepairProduct}></Product>

            case routingContent.PRODUCTS.CREATE:
                return <ProductCreate id={idProduct}></ProductCreate>

            case routingContent.PORTFOLIO.LITS:
                return <Portfolios routePortfolioID={handleRepairPortfolio} ></Portfolios>

            case routingContent.PORTFOLIO.CREATE:
                return <PortfoliosCreate id={""}></PortfoliosCreate>
            
            case routingContent.IMAGES.CREATE: 
                return <UploadImages showBtnChoose={true} handleClickOutSite={handleChooseImg}></UploadImages>

            case routingContent.CATEGORIES.LITS:
                return <Category ></Category>

            case routingContent.CATEGORIES.CREATE:
                return <CategoryCreate id={null}></CategoryCreate>

            case routingContent.SOCIALS.CREATE:
                return <SocialsCreate ></SocialsCreate>

            case routingContent.SOCIALS.LITS:
                return <Socials></Socials>
            
            case routingContent.PASSWORD.CHANGE:
                    return <ChangePassword></ChangePassword>
            default:
                return <TrackingUser></TrackingUser>;
        }
    } 

    useEffect(() => {

        if(valueContext.token || localStorage.getItem("token")){}
        else{router.push("/admin/login")}

    }, [valueContext.token]);
    
    const header = (
        <PageHeader pretitle="admin" title={title} separator={true}>
            <div className="topHeaderAdmin">
                <p>Thông số tổng quát.</p>
                {/* {
                    valueContext.timeline 
                    ?   <Countdown date={Date.now() + parseInt(valueContext.timeline) } renderer={renderer} />
                    :<></>
                } */}
                <Button type="primary" danger onClick={valueContext? valueContext.logout : null}> Logout </Button>
            </div>
            <style jsx>{`
                .topHeaderAdmin{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                }
            `}</style>
        </PageHeader>
    );
   
    return <LayoutPage header={header} token={valueContext.token} >
           
            <div className="contentPage">
                <Navbar handleClick={handleClickMenu}></Navbar>
                {
                    handleContainer(slug)
                }
            </div>

            <style jsx>{`
                .contentPage{
                    display: flex;
                    width: 100%;
                }
            `}</style>

           
    </LayoutPage>;
};

export default AdminIndex;