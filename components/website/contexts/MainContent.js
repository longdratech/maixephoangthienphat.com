import {useState, useEffect} from "react"
export const MainContent = React.createContext();
import { useRouter } from "next/router"
import ApiCall from "modules/ApiCall";
import Axios from "axios";
import { method } from "lodash";
import { message } from "antd"

const SERVER = "http://103.90.226.237:3000";

export default function MainContentProvider( {children}){


    const [dataUser, setDataUser] =  useState();
    const [token, setToken] =  useState();
    const [timeline, setTimeLine] = useState();
    const router =  useRouter();
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(()=>{
        if(localStorage){
            if(localStorage.getItem("token") && localStorage.getItem("infoUser")){
                setToken(localStorage.getItem("token"));
                setDataUser(JSON.parse(localStorage.getItem("infoUser")));
                setTimeLine(localStorage.getItem("total_seconds"));
            }
        }
    }, [token]);
    
    useEffect(()=>{
        if(localStorage){
            if(localStorage.getItem("token") && localStorage.getItem("infoUser")){
                setToken(localStorage.getItem("token"));
                setDataUser(JSON.parse(localStorage.getItem("infoUser")));
            }else{
                // if(router.query)
                // logout();
            }
        }
    }, []);

    const logout = () => {
        if(localStorage){
            setToken();
            localStorage.removeItem("token");
            localStorage.removeItem("infoUser");
            localStorage.removeItem("total_seconds");
            router.push("/admin/login");
        }
    }

    const timer = () => {

        if(localStorage.getItem("total_seconds")){
            var total_seconds = localStorage.getItem("total_seconds");
        } else {
            var total_seconds = 60*1;
        }
        var minutes = parseInt(total_seconds/60);
        var seconds = parseInt(total_seconds%60);
        function countDownTimer(){
            if(seconds < 10){
                seconds= "0"+ seconds ;
            }if(minutes < 10){
                minutes= "0"+ minutes ;
            }
            if(total_seconds <= 0){
                logout();
            } else {
                total_seconds = total_seconds - 1 ;
                minutes = parseInt(total_seconds/60);
                seconds = parseInt(total_seconds%60);
                localStorage.setItem("total_seconds",total_seconds);
                console.log("timer", total_seconds)
                // setTimeout(countDownTimer() ,1000);
            }
        }
        // setTimeout( countDownTimer(),1000);
    }

    const getDataProducts = async (FunctionCb, page=1, limit=50) =>{
        let res = await ApiCall({
          path: `/products?page=${page}&limit=${limit}`
        });
        if (res.data) {
            await FunctionCb(res);
        }
    }

    // get product[id]
    const getDataProduct = async (FunctionCb, id ="") =>{
        let res = await ApiCall({
          path: `/products/${id}`
        });
        
        if (res) {
            if(res.error){
                console.log("error ",res.error);
                FunctionCb();
            }else{
                await FunctionCb(res);
            }
           
        }
    }
    // repair product[id]
    const patchDataProduct = async (FunctionCb, id ="", data) =>{
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
            if(res.statusCode && res.statusCode == 401){
                message.warning("Đã hết phiên đăng nhập");
                return logout();
            }else{
                await FunctionCb(res);
            }
            
        }
    }

    const deleteDataProduct = async (FunctionCb, id) =>{
        let res = await ApiCall({
            token: token,
            path: `/products/${id}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionCb(res);
        }
    }

    const postDataProduct = async (FunctionCb, data) =>{
        let res = await ApiCall({
            token: token,
            path: `/products`,
            method: "POST",
            data: data
        });
        if (res) {
            await FunctionCb();
        }
    }

    // get all portfolios
    const getDataPortfolios = async (FunctionCb, page=1, limit=50) =>{
        let res = await ApiCall({
          path: `/portfolios?page=${page}&limit=${limit}`
        });
        if (res && res.data) {
            await FunctionCb(res);
        }
    }

    // get portfolios[id]
    const getDataPortfolio = async (FunctionCb, id ="") =>{

        let res = await ApiCall({
          path: `/portfolios/${id}`
        });

        if (res) {
            if(res.error){
                await FunctionCb();
            }else{
                await FunctionCb(res);
            }
        }
    }

    const patchDataPortfolio = async (FunctionCb, id ="", data) =>{
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
            await FunctionCb(res);
        }
    }

    const deleteDataPortfolio = async (FunctionCb, id) =>{
        let res = await ApiCall({
            token: token,
            path: `/portfolios/${id}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionCb(res);
        }
    }

    const postDataPortfolio = async (FunctionCb, data) =>{
        let res = await ApiCall({
            token: token,
            path: `/portfolios`,
            method: "POST",
            data: data
        });
        if (res) {
            await FunctionCb();
        }
    }
    //

    const getDataCategories = async(FunctionCb, page=1, limit=50) => {
        let res = await ApiCall({
          path: "/categories"
        });
        if (res) {
            console.log("categories : " ,res.data);
            FunctionCb(res);
        }
    }

    const patchDataCategories = async (FunctionCb, id ="", data) =>{
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
            if(res.statusCode && res.statusCode == 401){
                message.warning("Đã hết phiên đăng nhập");
                return logout();
            }else{
                await FunctionCb(res);
            }
        }
    }

    // socials
    // get all socials
    const getDataSocials = async (FunctionCb, page=1, limit=5) =>{
        let res = await ApiCall({
          path: `/socials?page=${page}&limit=${limit}`
        });
        if (res) {
            await FunctionCb(res);
        }
    }

    // get Socials[id]
    const getDataSocial = async (FunctionCb, id ="") =>{
        let res = await ApiCall({
          path: `/socials/${id}`
        });
        if (res.data) {
            await FunctionCb(res);
        }
    }

    const patchDataSocials = async (FunctionCb, id ="", data) =>{
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
            if(res.statusCode && res.statusCode == 401){
                message.warning("Đã hết phiên đăng nhập");
                return logout();
            }else{
                await FunctionCb(res);
            }
        }
    }

    const deleteDataSocial = async (FunctionCb, id) =>{
        let res = await ApiCall({
            token: token,
            path: `/socials/${id}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionCb(res);
        }
    }

    const postDataSocial = async (FunctionCb, data) =>{
        let res = await ApiCall({
            token: token,
            path: `/socials`,
            method: "POST",
            data: data
        });
        if (res) {
            await FunctionCb();
        }
    }
    //

    const getDataImages = async (FunctionCb) =>{
        let res = await ApiCall({
          path: `/photos?page=1&limit=50`
        });
        if (res.data) {
            await FunctionCb(res);
        }
    }

    const deleteImage = async (FunctionCb, idPublic) =>{
        let res = await ApiCall({
            token: token,
            path: `/photos/${idPublic}`,
            method: "DELETE"
        });
        if (res) {
            await FunctionCb(res);
        }
    }

    const getOneDayTracking = async (FunctionCb) => {
        let res = await ApiCall({
            path: `/views?count=1`
          });
          if (res) {
              await FunctionCb(res);
          }
    }

    const getOneMonthTracking = async (FunctionCb) => {
        let res = await ApiCall({
            path: `/views`
          });
          if (res) {
            await FunctionCb(res);
          }
    }

    return(
        <MainContent.Provider
            value = {{

                dataUser : dataUser,
                token: token,

                timer: timer,
                timeline: timeline,

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
                deleteImage: deleteImage,

                getOneDayTracking,
                getOneMonthTracking,

            }}
        >
            {children}
        </MainContent.Provider>
    )
} 