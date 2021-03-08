import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, message, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import UploadImages from  "components/website/content-page-admin/UploadImages";

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


export default function CategoryCreate({ id = null, dataProductSelect, closeModal }) {

    const valueContext = useContext(MainContent);
    const [data, setData] = useState(null);
    const [formRepair] = Form.useForm();

    const onFinish = async (values) => {
        await valueContext.postDataProduct(success, values)
    };

    const onFinishHadID = async (values) => {
        await valueContext.patchDataCategories(success, id, values);
        if(closeModal){
            closeModal();
        }
    };

    const success = async () => {
       await message.success('Tạo sản phẩm thành công!', 0.5);
    };

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = async (value) => {
        if(value){
            await setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

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
    }

    const formItemLayout = {
        labelCol: {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    useEffect(() => {
        if (valueContext && id) {
            // valueContext.getDataProduct(setData)
        }
    }, [])

    // useEffect(() => {
    //     if (data) {
    //         console.log("DATA : ", data)
    //     }
    // }, [data]);
    
    useEffect(()=>{
        if(dataProductSelect){
            initValueForm(dataProductSelect);
        }
    },[dataProductSelect]);

    const initValueForm = async (dataProductSelect) => {
        console.log("dataProductSelect : ", dataProductSelect)
        await formRepair.setFieldsValue({...dataProductSelect})
    }

    if (id && dataProductSelect) {
        formRepair.setFieldsValue({...dataProductSelect})
        return <div className="contentProductAdmin">
             <div className="content">
                <Form 
                form={formRepair}
                name="dynamic_form_item" 
                {...layout} onFinish={onFinishHadID} 
                validateMessages={validateMessages}>
                    <Form.Item 
                        name={['title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={[ 'category']} label="Category" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="Mái che">Mái che</Radio.Button>
                            <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                            <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                            <Radio.Button value="Khác">Khác</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={[ 'description']} label="Thông tin thêm" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <div className={"selectImage"}>
                        <Form.Item 
                            name={['image']} label="Image" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" onClick={()=>showModal("1")}>Chọn ảnh khác</Button>
                        </Form.Item>
                    </div>
                    
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
                    <UploadImages showBtnChoose={true}></UploadImages>
                </Modal>
            </div>
            <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
            `}</style>
        </div>
    } else {
        return <div className="contentProductAdmin">
            <div className="content">
                <Form name="dynamic_form_item" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={[ 'title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={[ 'category']} label="Category" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="Mái che">Mái che</Radio.Button>
                            <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                            <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                            <Radio.Button value="Khác">Khác</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={[ 'description']} label="Thông tin thêm" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    
                    <div className={"selectImage"}>
                        <Form.Item 
                            name={['image']} label="Image" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" onClick={()=>showModal("1")}>Chọn ảnh khác</Button>
                        </Form.Item>
                    </div>

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
            </div>
            <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
            `}</style>
        </div>
    }


}