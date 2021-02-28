export default function TitleCopy({
    name="Sản phẩm nổi bật",
    positionLine = "CENTER",
    fontSize = 32,
    className = "",
    color,
    children,
}) {
    return <div className={`titleCopy__`+ positionLine + " " + className}>
        <h2>
            <span className={`positionLine__`+ positionLine}> {name} </span>
        </h2>
        {
            children
        }

        <style jsx>{`

            .titleCopy__CENTER{
                h2{
                    display: flex;
                    justify-content: center;
                }
            }

            .titleCopy__LEFT{
                h2{
                    display: flex;
                    justify-content: flex-start;
                }
            } 

            h2{
                font-family: "Montserrat-SemiBold";
                font-size: ${fontSize +"px"};
                color: ${color ? color : "#103C55"};
                padding: 20px 0;
                margin: 20px 0;
                display: block;
                span{
                    position: relative;
                    padding-top: 10px;
                    &::after{
                        transition: 0.3s;
                        content: "";
                        position: absolute;
                        width: 130px;
                        height: 4px;
                        border-radius: 10px;
                        background-color: #ff1600;
                    }
                }

                  

                .positionLine__CENTER{
                    &::after{
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, 0);
                    }
                }
                
                .positionLine__LEFT{
                    &::after{
                        top: 0;
                        left: 0;
                    }
                }
                
            }
            .noneLine{
                span{
                    &::after{
                        display: none;
                    }
                }
            }   
        `}</style>
    </div>
}