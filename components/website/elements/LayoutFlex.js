import {useState, useEffect} from "react"

export default function LayoutFlex({
    children,
    gridGap=20,
    paddingBottom=20,
    paddingTop=0,
    className="",
}){

    // const [classRevert, setClassRevert] = useState("");

    useEffect(()=>{
       
    },[])

    return <div className={`${className} LayoutFlex`}>

        {children}

        <style jsx>{`
            .layoutFlex{
                display: flex;
                flex-wrap: wrap;
            }
            @media only screen and (max-width : 599px){

            }

        `
        }</style>

    </div>

    

}