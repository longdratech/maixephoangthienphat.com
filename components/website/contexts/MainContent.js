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
            await FunctionnCb(res);
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
        if (res.data) {
            await FunctionnCb(res);
        }
    }


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
                setDataUser : setDataUser,
                setToken: setToken,
                logout: logout,
                getDataProducts: getDataProducts,
                postDataProduct: postDataProduct,
                patchDataProduct: patchDataProduct,
                deleteDataProduct: deleteDataProduct,
                getDataPortfolios: getDataPortfolios,
                getDataPortfolio: getDataPortfolio,
                getDataCategories: getDataCategories,
                patchDataCategories: patchDataCategories,
                getDataProduct :getDataProduct,
                getDataImages: getDataImages,
                deleteImage: deleteImage
            }}
        >
            {children}
        </MainContent.Provider>
    )
} 