import TitleCopy from "components/website/title/TitleCopy"
import { Button, Radio, Upload, Modal, message, Popconfirm, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import { inferTo } from "@react-spring/core";
import copy from 'copy-to-clipboard';
import CONFIG from "web.config";

export default function UploadImages({handleClickOutSite, showBtnChoose, handleCloseModal}) {

    const valueContext = useContext(MainContent);
    const [data, setData] = useState(null);
    const [dataImages, setDataImages] = useState([]);
    const [totalCount, setTotalCount] = useState();

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [valueCopy, setValueCopy] = useState('');
    const btnChooseRef = useRef();
    const inputSaveCopyRef = useRef();


    const successCopy = () => {
        message.success('Đã chọn', 2);
    };

    const handleClickImage = async(value) => {
        if(handleClickOutSite){
            await handleClickOutSite(value);
        }
        if(btnChooseRef.current){
            await setValueCopy(value.url);
            copy(value.url);
            await successCopy();
        }
        if(handleCloseModal){
            handleCloseModal();
        }
    }

    const handleDeleteImg = async (value) => {
        const success = async () => {
            message.success('Đã xoá ảnh', 3);
            await valueContext.getDataImages(setDataImages);
        };
        await valueContext.deleteImage(success, value.id);
        success();
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
        // console.log("fileList : ", fileList)
        setFileList([...fileList]);
    };

    useEffect(() => {
        valueContext.getDataImages(setDataImages)
    }, []);

    useEffect(()=>{
        valueContext.getDataImages(setDataImages)
    },[fileList])

    const uploadButton = (
        <div className="btnUploadImg">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
            <style jsx>{`
                .btnUploadImg{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
            `}</style>
        </div>
    );

    useEffect(() => {
        if (data) {
            console.log("DATA : ", data);
        }
    }, [data]);


    const handleChangePaginator = (page) => {
        valueContext.getDataImages(setDataImages, page)
    }


    return <div className="contentProductAdmin">
                {
                    dataImages
                    ? <div className="contentPagination">
                        <Pagination 
                        onChange={handleChangePaginator} 
                        pageSize={50} 
                        defaultCurrent={1}  
                        total={dataImages.totalCount}></Pagination>
                    </div>
                    : <></>

                }
                
                <div className="content">
            <div className="listDataImages">
                {
                    dataImages.length !== 0
                        ? <div className="listImg">
                            
                            {dataImages.data.map((value, index) => {
                                return <div className="itemImageUpload" key={index} > 
                                <img style={{ display: "block" }} src={value.url} /> 
                                <div className="btnDeleteImg">
                                    <Popconfirm
                                        placement="top"
                                        title={"Bạn có muốn xoá ảnh này không?"}
                                        onConfirm={()=>handleDeleteImg(value)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Xoá</Button>
                                    </Popconfirm>
                                    {
                                        showBtnChoose == true
                                        ?   <>
                                                <Button ref={btnChooseRef} type="primary" 
                                                    onClick={()=>handleClickImage(value)}>
                                                    Chọn
                                                </Button>
                                                <input style={{display:"none"}} ref={inputSaveCopyRef} value={valueCopy}/>
                                            </>
                                        :   <></>
                                    }
                                    
                                </div>
                                
                            </div>
                            })}
                        </div>
                        : <div></div>
                }
            </div>

            <Upload
                action={`${CONFIG.NEXT_PUBLIC_API_BASE_PATH}/photos`}
                headers={
                    {'Authorization': `Bearer ${valueContext.token}`}
                }
                name={"images"}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple={true}
                className="btnUploadImg"
            >
                {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="imgs" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
                .itemImageUpload{
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .btnDeleteImg{
                        position: absolute;
                        bottom: -60px;
                        left: 0;
                        transition: 0.3s;
                    }
                    &:hover{
                        .btnDeleteImg{
                            bottom: 0;
                        }
                    }
                }
                .listImg{
                    position: relative;
                    padding: 70px 35px 100px 40px;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    column-gap: 20px;
                    row-gap: 20px;
                    justify-content: space-between;
                    /* height: 80vh; */
                    max-height: 400px;
                    overflow: auto;
                    border: solid 5px rgba(0,0,0,0.2);
                    border-radius: 10px;
                    margin-top: 20px;
                }
                .contentPagination{
                    /* position: absolute; */
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    /* top: 0; */
                    
                }
                .itemImageUpload{
                   
                }
                @media only screen and (max-width: 768px) {
                    .listImg{
                        max-height: 300px;
                        padding: 30px 10px 50px 10px;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
    </div>


}