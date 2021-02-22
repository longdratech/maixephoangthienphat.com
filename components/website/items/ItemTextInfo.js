export default function ItemTextInfo({
    index="",
    title,
    description,
    className
}){
    return <div className={`"itemTextInfo " + ${className}`}>

        <h2>
            { `${index}.` } 
            <span className="titleItemTextInfo" > 
                <b> {title} </b>
            </span> 
        </h2>

        <p className="descriptionItemTextInfo">{description}</p>

        <style jsx>{`

            h2{
                display: flex;
                flex-direction: row;
                color: #103C55; 
                font-family: "Montserrat-Light";
                font-size: 32px;
                padding: 10px 0;
                padding-top: 20px;
                .titleItemTextInfo{
                    font-size: 16px;
                    font-family: "Montserrat-SemiBold";
                    padding-left: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .descriptionItemTextInfo{
                font-size: 14px;
                padding: 10px 0;
            }
        `}</style>
    </div>
}