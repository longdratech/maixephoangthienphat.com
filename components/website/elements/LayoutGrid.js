import {useState, useEffect} from "react"

export default function LayoutGrid({
    children,
    column=3,
    itemBig = false,
    revert = false,
    className="",
}){

    const [classRevert, setClassRevert] = useState("");

    useEffect(()=>{
        revert === true ? setClassRevert("revert") : setClassRevert("");
    },[])

    return <div className={`${itemBig === true ? "layoutGridBig " + classRevert + " " + className  : "layoutGrid " + className}`}>

        {children}

        <style jsx>{`

            .layoutGrid{
                display: grid;
                grid-template-columns: repeat(${column}, 1fr);
                grid-gap: 20px;
                padding-bottom: 20px;
            }

            .layoutGridBig{
                display: grid;
                grid-template-columns: repeat(1, 1fr) repeat(1, 2fr);
                grid-gap: 20px;
                padding-bottom: 20px;
               
            }
            .layoutGridBig.revert{
                display: grid;
                grid-template-columns: repeat(1, 2fr) repeat(1, 1fr);
                grid-gap: 20px;
                padding-bottom: 20px;
            }

            @media only screen and (max-width : 599px){

                .layoutGrid{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-gap: 20px;
                    padding-bottom: 20px;
                }

                .layoutGridBig{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-gap: 20px;
                    padding-bottom: 20px;
                }
                .layoutGridBig.revert{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-gap: 20px;
                    padding-bottom: 20px;
                }
            }

            
        `
        }</style>

    </div>

    

}