import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, message, Modal, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import UploadImages from "components/website/content-page-admin/UploadImages";
// import { from } from "bl";
import Loading from "components/website/loading/Loading";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: 'Vui lòng nhập ${label}!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};


export default function SocialsCreate({ id = null, dataSelect, closeModal }) {

    const valueContext = useContext(MainContent);
    // const [data, setData] = useState(null);
    const [formRepair] = Form.useForm();
    const [indexImg, setIndexImg] = useState();// get index input to set value url img
    const [listImgs, setListImgs] = useState(); // get list img in form 
    const formRef = useRef();

    const [isShow, setIsShow] = useState(false);  // set init value checkbox

    const onFinish = async (values) => {
        await valueContext.setStatusLoading(true)
        await valueContext.postDataSocial(success, values);
        if (closeModal) {
            closeModal();
            await valueContext.setStatusLoading(false)
        }
    };

    const onFinishHadID = async (values) => {
        await valueContext.setStatusLoading(true)
        await valueContext.patchDataSocials(success, id, values);
        if (closeModal) {
            await valueContext.setStatusLoading(false)
            closeModal();
        }
    };

    const success = async () => {
        await message.success('Tạo sản phẩm thành công!', 1);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = async (value) => {
        if (value) {
            await setIndexImg(value)
            await setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (dataSelect) {
            initValueForm(dataSelect);
        }else{
            resetInitValueForm()
        }
    }, [dataSelect]);

    const initValueForm = async (dataSelect) => {
        await formRepair.setFieldsValue({ ...dataSelect })
        console.log("dataSelect.isShow: ", dataSelect.isShow)
        await setIsShow(dataSelect.isShow);
    }

    const resetInitValueForm = async () => {
        await formRepair.resetFields();
        await setIsShow(false);
    } 

    const handleSetImgToInput = async (value) => {
        console.log("handleSetImgToInput 1 =>>", value, indexImg);
        let cloneData = { ...formRepair.getFieldsValue() };
        cloneData.image = value.url;
        await formRepair.setFieldsValue({ ...cloneData });
    }

    useEffect(()=>{
        if(formRepair){
            setListImgs(formRepair.getFieldValue("image"))
        }
    }, [formRef.current, formRepair.getFieldValue("image")])

    if (id && dataSelect) {
        return <div className="contentProductAdmin">
            <div className="content">
                <Form
                    ref={formRef}
                    form={formRepair}
                    name="dynamic_form_item"
                    {...layout} onFinish={onFinishHadID}
                    validateMessages={validateMessages}>
                    <Form.Item
                        name={['name']} label="Tên" rules={[{ required: true }]}>
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        name={['link']} label="Link" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['isShow']} label="Hiển thị">
                        <Switch checked={isShow} onChange={()=>setIsShow(!isShow)}/>
                    </Form.Item>
                    
                    {/* <div className={"selectImage"}>
                        <Form.Item
                            name={['image']} label="Image" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            
                            <div className="listImgsRender" >
                                <Button type="primary" onClick={() => showModal("1")}>Chọn ảnh</Button>
                                {
                                    listImgs && listImgs.length > 0
                                        ? <img className="imgInForm" src={listImgs ? listImgs : ""} />
                                        : <></>
                                }
                            </div>
                        </Form.Item>
                    </div> */}

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
                <Modal
                    title={(<h2>Thêm ảnh</h2>)} width={1000}
                    visible={isModalVisible} onOk={handleOk}
                    onCancel={handleCancelModal}>
                    <UploadImages handleClickOutSite={handleSetImgToInput} handleCloseModal={handleCancelModal} showBtnChoose={true}></UploadImages>
                </Modal>
                <Loading status={valueContext.statusLoading}></Loading>     
            </div>
            <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
                .imgInForm{
                    width: 100px;
                    height: 70px;
                    object-fit: cover;
                }
                .listImgsRender{
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 5px;
                    padding-bottom: 10px;
                }
                .imgInForm{
                    margin: 0 10px;
                }
            `}</style>
        </div>
    } else {
        return <div className="contentProductAdmin">
            <div className="content">
                <Form form={formRepair} 
                    ref={formRef}
                    name="dynamic_form_item" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['name']} label="Tên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['link']} label="Link" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['isShow']} label="Hiển thị">
                        <Switch checked={isShow} onChange={()=>setIsShow(!isShow)}/>
                    </Form.Item>

                    {/* <div className={"selectImage"}>
                        <Form.Item
                            name={['image']} label="Image" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item >

                            <div className="listImgsRender" >
                                <Button type="primary" onClick={() => showModal("1")}>Chọn ảnh</Button>
                                {
                                    listImgs && listImgs.length > 0
                                        ? <img className="imgInForm" src={listImgs[index] ? listImgs[index] : ""} />
                                        : <></>
                                }
                               

                            </div>
                        </Form.Item>
                    </div> */}

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
                <Modal title={(<h2>Thêm ảnh</h2>)} width={1000}
                    visible={isModalVisible} onOk={handleOk} onCancel={handleCancelModal}>
                    <UploadImages ></UploadImages>
                </Modal>
                <Loading status={valueContext.statusLoading}></Loading>     
            </div>
            <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
                .imgInForm{
                    width: 100px;
                    height: 70px;
                    object-fit: cover;
                }
                .listImgsRender{
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 5px;
                    padding-bottom: 10px;
                }
                .imgInForm{
                    margin: 0 10px;
                }
            `}</style>
        </div>
    }


}