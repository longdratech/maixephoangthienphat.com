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

    const getDataProduct = async (FunctionnCb, id ="") =>{
        let res = await ApiCall({
          path: `/products/${id}`
        });
        if (res.data) {
            await FunctionnCb(res);
        }
    }

    const getDataCategories = async(FunctionnCb, page=1, limit=50) => {
        let res = await ApiCall({
          path: "/categories"
        });
        if (res.data) {
            FunctionnCb(res);
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
                getDataCategories: getDataCategories,
                getDataProduct :getDataProduct,
                getDataImages: getDataImages,
                deleteImage: deleteImage
            }}
        >
            {children}
        </MainContent.Provider>
    )
} 