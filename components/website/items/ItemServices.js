import asset from "plugins/assets/asset";
export default function ItemServices({
    index="",
    title="Tư vấn",
    description="Chúng tôi đang giúp tìm các giải pháp để tạo các sản phẩm phù hợp với nhu cầu của bạn",
    className,
    srcImg=asset("/images/demo/icon-khao-sat.png"),

}){
    return <div className={`"itemServices " + ${className} ${index}`}>
        <img src={srcImg} />
        <h2>
          {title}
        </h2>

        <p className="descriptionItemServices">{description}</p>

        <style jsx>{`
            .itemServices{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            img{
                max-width: 50px;
                max-height: 50px;
                margin-left: auto;
                margin-right: auto;
            }
            h2{
                font-size: 32px;
                text-align: center;
                padding: 20px 0;
                font-family: "Montserrat-SemiBold";
                color: #103C55; 
            }
            .descriptionItemServices{
                font: 18px;
                text-align: justify;
            }
        `}</style>
    </div>
}