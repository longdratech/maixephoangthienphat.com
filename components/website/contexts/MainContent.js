import {useState, useEffect} from "react"
export const MainContent = React.createContext();

export default function MainContentProvider( {children}){


    const [dataUser, setDataUser] =  useState();
    const [token, setToken] =  useState();

    // useEffect()

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