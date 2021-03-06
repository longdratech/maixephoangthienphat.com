import LayoutPage from "components/admin/LayoutPage";
import PageHeader from "components/dashkit/PageHeader";
import { useRouter } from "next/router";
import { withAuth } from "plugins/next-auth/admin";
import {MainContent} from "components/website/contexts/MainContent";
import {useContext, useEffect} from "react"
import Navbar from "components/website/navbar/Navbar";
const AdminIndex = ({ user }) => {

    const valueContext =  useContext(MainContent);
    const router = useRouter();

    useEffect(() => {

        if(valueContext.token || localStorage.getItem("token")){
                console.log("TOKEN", localStorage.getItem("token"))
        }else{
            router.push("/admin/login");
        }

    }, [])
    
    const header = (
        <PageHeader pretitle="admin" title="Dashboard" separator={true}>
            Thông số tổng quát.
        </PageHeader>
    );
   
    return <LayoutPage header={header} user={user} token={valueContext.token}>
            <div className="navbar">
                    <Navbar></Navbar>
            </div>
    </LayoutPage>;
};

export default AdminIndex;

// export default withAuth(AdminIndex);