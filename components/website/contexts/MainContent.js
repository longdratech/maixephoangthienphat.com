import {useState, useEffect} from "react"
export const MainContent = React.createContext();

export default function MainContentProvider( {children}){


    const [dataUser, setDataUser] =  useState();
    const [token, setToken] =  useState();

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

    return(
        <MainContent.Provider
            value = {{
                dataUser : dataUser,
                token: token,
                setDataUser : setDataUser,
                setToken: setToken,
            }}
        >
            {children}
        </MainContent.Provider>
    )
} 