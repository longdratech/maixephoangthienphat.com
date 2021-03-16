import { Spin } from "antd";
export default function Loading ({
    status,
}){
    
    return <div className={ status == true ? "loadingBig show" : "loadingBig"}>
            <div className="contentLoading">
                <Spin size="large" />
            </div>
        
        <style jsx>{`
            .loadingBig.show{
                position: fixed;
                width: 100vw;
                height: 100vh;
                left: 50%;
                top: 50%;
                z-index: 99999;
                transition: 0.3s;
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
                background-color: rgba(255,255,255, 0.5);
            }
            .contentLoading{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .loadingBig{
                position: fixed;
                width: 0;
                height: 0;
                left: 50%;
                top: 50%;
                transition: 0.3s;
                transform: translate(-50%, -50%) scale(0) ;
                opacity: 0;
            }
        `}</style>
    </div>
}