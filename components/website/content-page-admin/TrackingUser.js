import TitleCopy from "components/website/title/TitleCopy";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Loading from "components/website/loading/Loading";

export default function TrackingUser() {

    const [oneDayTracking, setOneDayTracking] = useState();
    const [ allTracking, setAllTracking] = useState();

    const {
        getOneDayTracking,
        getOneMonthTracking 
    } = useContext(MainContent);

    useEffect(()=>{
        getOneDayTracking(setOneDayTracking);
        getOneMonthTracking(setAllTracking);
    },[])

    return <div className="contentTrackingUser">
            
            <div className="content">
                <h3>Số người truy cập trong ngày: <span>{oneDayTracking || "Chưa có data"}</span></h3>
                <h3>Số người truy cập trong tháng: <span>{allTracking || "Chưa có data"}</span></h3>
            </div>
         
            <style jsx>{`
                .contentTrackingUser{
                    width: 100%;
                    overflow: auto;
                    padding: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: flex-start;
                    h3{
                        padding: 20px;
                        span{
                            color: green;
                            padding: 5px;
                            font-size: 20px;
                        }
                    }
                }
                .content{
                    width: 80%;
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                }
            `}</style>
        </div>
    
}