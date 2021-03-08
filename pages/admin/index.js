import LayoutPage from "components/admin/LayoutPage";
import PageHeader from "components/dashkit/PageHeader";
import { useRouter } from "next/router";
import { withAuth } from "plugins/next-auth/admin";
import {MainContent} from "components/website/contexts/MainContent";
import {useContext, useEffect, useState} from "react"
import Navbar from "components/website/navbar/Navbar";
import {Button} from "antd"
import Product from "components/website/content-page-admin/Products";
import Category from "components/website/content-page-admin/Category";
import ProductCreate from "components/website/content-page-admin/ProductCreate";
import UploadImages from  "components/website/content-page-admin/UploadImages";
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
    }

}

const AdminIndex = ({ user }) => {

    const valueContext =  useContext(MainContent);
    const router = useRouter();
    const [title, setTitle] = useState("Dashboard");
    const [slug, setSlug] = useState("profile");
    const [idProduct , setIdProduct] = useState()
    

    const handleClickMenu = (e) => {
        // console.log("DATA CLICK : ", e);
        // console.log("SLUG : ", e.item.props.value);
        if(e){
            e.item.props.title ?  setTitle(e.item.props.title) : setTitle("Dashboard");
        }
        if(e){
            e.item.props.value ?  setSlug(e.item.props.value) : setSlug("profile");
        }
       
    }

    useEffect(()=>{
        setIdProduct()
    },[])

    const handleRepairProduct = (id) => {
        console.log("repair ID", id);
        // setIdProduct(id)
    }

    const handleChooseImg = (value) => {
        console.log("Click Img", value);
    }

    const handleContain = ( slug )=>{

        switch (slug) {
            case routingContent.PRODUCTS.LITS:
                return <Product routeProductID={handleRepairProduct}></Product>

            case routingContent.PRODUCTS.CREATE:
                return <ProductCreate id={idProduct}></ProductCreate>

            case routingContent.PORTFOLIO.LITS:
                return <Category></Category>

            case routingContent.PORTFOLIO.CREATE:
                return <Category></Category>
            
            case routingContent.IMAGES.CREATE: 
                return <UploadImages showBtnChoose={true} handleClickOutSite={handleChooseImg}></UploadImages>

            case routingContent.CATEGORIES.LITS:
                return <Category></Category>

            case routingContent.CATEGORIES.CREATE:
                return <Category></Category>

            default:
                return <></>;
        }
    } 

    useEffect(() => {

        if(valueContext.token || localStorage.getItem("token")){}
        else{router.push("/admin/login")}

    }, [valueContext.token])
    
    const header = (
        <PageHeader pretitle="admin" title={title} separator={true}>
            <div className="topHeaderAdmin">
                <p>Thông số tổng quát.</p>
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
   
    return <LayoutPage header={header} user={user} token={valueContext.token}>
           
            <div className="contentPage">
                <Navbar handleClick={handleClickMenu}></Navbar>
                {
                    handleContain(slug)
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

// export default withAuth(AdminIndex);