import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";


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
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
  };

  
export default function ProductCreate ({id = null}) {

    const valueContext =  useContext(MainContent);
    const [data, setData] = useState(null);


    const onFinish = (values) => {
        console.log("Submit : ", values);
    };
 
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])


    const getBase64  = (file) => {
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

    const handleChange = ({fileList} ) => {
        console.log("fileList : ", fileList)
        setFileList([...fileList]);
    }

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    useEffect(()=>{
        if(valueContext && id){
            valueContext.getDataProduct(setData)
        }
    }, [])

    useEffect(()=>{
        if(data){
            console.log("DATA : " , data)
        }
    },[data])

    if(id){
        return <div className="contentProductAdmin">
            <div className="content">
                {id}
            </div>
            <style jsx>{`
                .contentProductAdmin{
                    width: 100%;
                    overflow: auto;
                    padding-left: 20px;
                }
            `}</style>
        </div>
    }else{
        return <div className="contentProductAdmin">
            <div className="content">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
           
                <Form.Item name={['product', 'title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={['product', 'price']} label="Giá sản phẩm" rules={[{type: 'number', min: 0, required: true }]}>
                    <InputNumber style={{width:"100%"}} />
                </Form.Item>

                <Form.Item name={['product', 'guarantee']} label="Bảo hành" rules={[{ type: 'number', min: 0}]}>
                    <InputNumber  style={{width:"100%"}} />
                </Form.Item>

                <Form.Item name={['product', 'sold']} label="Đã bán" rules={[{ type: 'number', min: 0}]}>
                    <InputNumber  style={{width:"100%"}} />
                </Form.Item>

                <Form.Item name={['product', 'category']} label="category" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio.Button value="Mái che">Mái che</Radio.Button>
                        <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                        <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                        <Radio.Button value="Khác">Khác</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name={['product', 'description']} label="description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name={['product', 'images']}>
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
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
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