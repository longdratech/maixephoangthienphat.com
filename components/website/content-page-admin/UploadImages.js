import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";


export default function UploadImages({handleClickOutSite}) {

    const valueContext = useContext(MainContent);
    const [data, setData] = useState(null);
    const [dataImages, setDataImages] = useState([]);

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleClickImage = (value) => {
        if(handleClickOutSite){
            handleClickOutSite(value)
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

    };

    const handleChange = ({ fileList }) => {
        console.log("fileList : ", fileList)
        setFileList([...fileList]);
    };

    useEffect(() => {
        valueContext.getDataImages(setDataImages)
    }, []);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        if (data) {
            console.log("DATA : ", data)
        }
    }, [data])


    return <div className="contentProductAdmin">
        <div className="content">
            <div className="listDataImages">
                {
                    dataImages.length !== 0
                        ? <div className="listImg">
                            {dataImages.data.map((value, index) => {
                                return <div className="itemImageUpload" key={index} onClick={()=>handleClickImage(value)}> 
                                <img style={{ display: "block" }} src={value.url} /> 
                            </div>
                            })}
                        </div>
                        : <div></div>
                }
            </div>

            <Upload
                // action="https://maixephoangthienphat-api.herokuapp.com/api/v1/photos"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
                .itemImageUpload{
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .listImg{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    column-gap: 20px;
                    row-gap: 20px;
                    justify-content: space-between;
                    max-height: 300px;
                    overflow: auto;
                    border: solid 5px rgba(0,0,0,0.2);
                    border-radius: 10px;
                }
                .itemImageUpload{
                   
                }
            `}</style>
    </div>


}