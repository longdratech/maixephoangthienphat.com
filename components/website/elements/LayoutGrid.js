import {useState, useEffect} from "react"

export default function LayoutGrid({
    children,
    column=3,
    gridGap=20,
    paddingBottom=20,
    paddingTop=0,
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
                grid-gap: ${gridGap + "px"};
                padding-bottom: ${paddingBottom + "px"};
                padding-top: ${paddingTop + "px"};
            }

            .layoutGridBig{
                display: grid;
                grid-template-columns: repeat(1, 1fr) repeat(1, 2fr);
                grid-gap: ${gridGap + "px"};
                padding-bottom: ${paddingBottom + "px"};
                padding-top: ${paddingTop + "px"};
            }
            .layoutGridBig.revert{
                display: grid;
                grid-template-columns: repeat(1, 2fr) repeat(1, 1fr);
                grid-gap: ${gridGap + "px"};
                padding-bottom: ${paddingBottom + "px"};
                padding-top: ${paddingTop + "px"};
            }

            @media only screen and (max-width : 599px){

                .layoutGrid{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                }

                .layoutGridBig{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                }
                .layoutGridBig.revert{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                }
            }

            
        `
        }</style>

    </div>

    

}