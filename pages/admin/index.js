import LayoutPage from "components/admin/LayoutPage";
import PageHeader from "components/dashkit/PageHeader";
import { useRouter } from "next/router";
import { withAuth } from "plugins/next-auth/admin";
import {MainContent} from "components/website/contexts/MainContent";
import {useContext, useEffect} from "react"
import Navbar from "components/website/navbar/Navbar";
import {Button} from "antd"

import Product from "components/website/content-page-admin/Products";


const AdminIndex = ({ user }) => {

    const valueContext =  useContext(MainContent);
    const router = useRouter();

    const handleClickMenu = (e) => {
        console.log("DATA CLICK : ", e);
        console.log("SLUG : ", e.item.props.value)
    }

    useEffect(() => {

        if(valueContext.token || localStorage.getItem("token")){
                console.log("TOKEN", localStorage.getItem("token"))
        }else{
            router.push("/admin/login");
        }

    }, [valueContext.token])
    
    const header = (
        <PageHeader pretitle="admin" title="Dashboard" separator={true}>
            
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
                <Product></Product>
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