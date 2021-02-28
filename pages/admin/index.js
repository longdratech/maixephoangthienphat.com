import LayoutPage from "components/admin/LayoutPage";
import PageHeader from "components/dashkit/PageHeader";
import { useRouter } from "next/router";
import { withAuth } from "plugins/next-auth/admin";
import {MainContent} from "components/website/contexts/MainContent";
import {useContext, useEffect} from "react"

const AdminIndex = ({ user }) => {

    const valueContext =  useContext(MainContent);
    const router = useRouter();

    useEffect(() => {
        if(valueContext.token){
            
        }else{
            router.push("/admin/login");
        }
    }, [])
    
    const header = (
        <PageHeader pretitle="admin" title="Dashboard" separator={true}>
            Thông số tổng quát.
        </PageHeader>
    );
    if(valueContext.token){
        return <LayoutPage header={header} user={user} token={valueContext.token}></LayoutPage>;
    }else{
        return <></>
    }
    
};

export default AdminIndex;
// export default withAuth(AdminIndex);