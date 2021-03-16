import {useState, useEffect} from "react"
export const MainContent = React.createContext();
import { useRouter } from "next/router"
import ApiCall from "modules/ApiCall";
import Axios from "axios";
import { method } from "lodash";
export default function MainContentProvider( {children}){


    const [dataUser, setDataUser] =  useState();
    const [token, setToken] =  useState();
    const router =  useRouter();
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(()=>{
        if(localStorage){
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
    }, [token]);
    useEffect(()=>{
        if(localStorage){
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
    }, []);

    const logout = () => {
        if(localStorage){
            if(localStorage.getItem("token")){
                setToken();
                localStorage.removeItem("token");
                router.push("/admin/login");
            }
        }
    }   

    const getDataProducts = async (FunctionnCb, page=1, limit=50) =>{
        let res = await ApiCall({
          path: `/products?page=${page}&limit=${limit}`
        });
        if (res.data) {
            await FunctionnCb(res);
        }
    }

    // get product[id]
    const getDataProduct = async (FunctionnCb, id ="") =>{
        let res = await ApiCall({
          path: `/products/${id}`
        });
        
        if (res) {
            if(res.error){
                console.log("error ",res.error);
                FunctionnCb();
            }else{
                await FunctionnCb(res);
            }
           
        }
    }
    // repair product[id]
    const patchDataProduct = async (FunctionnCb, id ="", data) =>{
        let res = await ApiCall({
          path: `/products/${id}`,
          method: "PATCH",
          token: token,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    const deleteDataProduct = async (FunctionnCb, id) =>{
        let res = await ApiCall({
            token: token,
            path: `/products/${id}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    const postDataProduct = async (FunctionnCb, data) =>{
        let res = await ApiCall({
            token: token,
            path: `/products`,
            method: "POST",
            data: data
        });
        if (res) {
            await FunctionnCb();
        }
    }

    // get all portfolios
    const getDataPortfolios = async (FunctionnCb, page=1, limit=50) =>{
        let res = await ApiCall({
          path: `/portfolios?page=${page}&limit=${limit}`
        });
        if (res.data) {
            await FunctionnCb(res);
        }
    }

    // get portfolios[id]
    const getDataPortfolio = async (FunctionnCb, id ="") =>{

        let res = await ApiCall({
          path: `/portfolios/${id}`
        });

        if (res) {
            if(res.error){
                await FunctionnCb();
            }else{
                await FunctionnCb(res);
            }
        }
    }

    const patchDataPortfolio = async (FunctionnCb, id ="", data) =>{
        let res = await ApiCall({
          path: `/portfolios/${id}`,
          method: "PATCH",
          token: token,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    const deleteDataPortfolio = async (FunctionnCb, id) =>{
        let res = await ApiCall({
            token: token,
            path: `/portfolios/${id}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    const postDataPortfolio = async (FunctionnCb, data) =>{
        let res = await ApiCall({
            token: token,
            path: `/portfolios`,
            method: "POST",
            data: data
        });
        if (res) {
            await FunctionnCb();
        }
    }
    //

    const getDataCategories = async(FunctionnCb, page=1, limit=50) => {
        let res = await ApiCall({
          path: "/categories"
        });
        if (res) {
            console.log("categories : " ,res.data);
            FunctionnCb(res);
        }
    }

    const patchDataCategories = async (FunctionnCb, id ="", data) =>{
        let res = await ApiCall({
          path: `/categories/${id}`,
          method: "PATCH",
          token: token,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    // socials
    // get all socials
    const getDataSocials = async (FunctionnCb, page=1, limit=5) =>{
        let res = await ApiCall({
          path: `/socials?page=${page}&limit=${limit}`
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    // get Socials[id]
    const getDataSocial = async (FunctionnCb, id ="") =>{
        let res = await ApiCall({
          path: `/socials/${id}`
        });
        if (res.data) {
            await FunctionnCb(res);
        }
    }

    const patchDataSocials = async (FunctionnCb, id ="", data) =>{
        let res = await ApiCall({
          path: `/socials/${id}`,
          method: "PATCH",
          token: token,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    const deleteDataSocial = async (FunctionnCb, id) =>{
        let res = await ApiCall({
            token: token,
            path: `/socials/${id}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    const postDataSocial = async (FunctionnCb, data) =>{
        let res = await ApiCall({
            token: token,
            path: `/socials`,
            method: "POST",
            data: data
        });
        if (res) {
            await FunctionnCb();
        }
    }
    //

    const getDataImages = async (FunctionnCb) =>{
        let res = await ApiCall({
          path: `/photos?page=1&limit=50`
        });
        if (res.data) {
            await FunctionnCb(res);
        }
    }

    const deleteImage = async (FunctionnCb, idPublic) =>{
        let res = await ApiCall({
            token: token,
            path: `/photos/${idPublic}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionnCb(res);
        }
    }

    return(
        <MainContent.Provider
            value = {{

                dataUser : dataUser,
                token: token,

                statusLoading: statusLoading,
                setStatusLoading: setStatusLoading,

                setDataUser : setDataUser,
                setToken: setToken,
                logout: logout,

                getDataProducts: getDataProducts,
                postDataProduct: postDataProduct,
                patchDataProduct: patchDataProduct,
                deleteDataProduct: deleteDataProduct,
                getDataProduct :getDataProduct,

                getDataPortfolios: getDataPortfolios,
                patchDataPortfolio: patchDataPortfolio,
                deleteDataPortfolio: deleteDataPortfolio,
                postDataPortfolio: postDataPortfolio,
                getDataPortfolio: getDataPortfolio,

                getDataCategories: getDataCategories,
                patchDataCategories: patchDataCategories,


                getDataSocials: getDataSocials,
                patchDataSocials: patchDataSocials,
                // deleteDataSocial: deleteDataSocial,
                postDataSocial: postDataSocial,
                getDataSocial: getDataSocial,

                getDataImages: getDataImages,
                deleteImage: deleteImage

            }}
        >
            {children}
        </MainContent.Provider>
    )
} 