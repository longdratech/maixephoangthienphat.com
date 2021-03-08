import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from "react";
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


export default function ProductCreate({ id = null, dataProductSelect }) {

    const valueContext = useContext(MainContent);
    const [data, setData] = useState(null);


    const onFinish = (values) => {
        console.log("Submit : ", values);
        valueContext.postDataProduct(success, values)
    };

    const onFinishHadID = (values) => {
        console.log("Submit : ", values);
        valueContext.postDataProduct(success, values)
    };

    const success =  () => {
        message.success('Tạo sản phẩm thành công!', 4);
       
    };

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])


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

    if (id && dataProductSelect) {
        console.log("dataProductSelect : ", dataProductSelect)
        return <div className="contentProductAdmin">
             <div className="content">
                <Form name="dynamic_form_item" {...layout} onFinish={onFinishHadID} validateMessages={validateMessages}>
                    <Form.Item value={dataProductSelect.title ? dataProductSelect.title :  ""}
                        name={[ 'title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={[ 'price']} label="Giá sản phẩm" rules={[{ type: 'number', min: 0, required: true }]}>
                        <InputNumber  style={{ width: "100%" }}  />
                    </Form.Item>

                    <Form.Item name={[ 'guarantee']} label="Bảo hành" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber   style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={[ 'sold']} label="Đã bán" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={[ 'category']} label="Category" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="Mái che">Mái che</Radio.Button>
                            <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                            <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                            <Radio.Button value="Khác">Khác</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={[ 'description']} label="description">
                        <Input.TextArea />
                    </Form.Item>
                    
                    <Form.List name={['images']}
                        rules={[
                            {
                              validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                  return Promise.reject(new Error('Cần thêm ít nhất 1 hình ảnh'));
                                }
                              },
                            },
                          ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? layout : layout)}
                                        label={`Images[${index}]`}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập link hình ảnh!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Url images" style={{ width: "80%" }} />
                                            {/* <span
                                                onClick={() => null}
                                                style={{ width: "16%" }}
                                                icon={<PlusOutlined />}
                                            >
                                                Chọn ảnh
                                            </span> */}
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%" }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm ảnh
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

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
    } else {
        return <div className="contentProductAdmin">
            <div className="content">
                <Form name="dynamic_form_item" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={[ 'title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={[ 'price']} label="Giá sản phẩm" rules={[{ type: 'number', min: 0, required: true }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={[ 'guarantee']} label="Bảo hành" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={[ 'sold']} label="Đã bán" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={[ 'category']} label="Category" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="Mái che">Mái che</Radio.Button>
                            <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                            <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                            <Radio.Button value="Khác">Khác</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={[ 'description']} label="description">
                        <Input.TextArea />
                    </Form.Item>
                    
                    <Form.List name={['images']}
                        rules={[
                            {
                              validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                  return Promise.reject(new Error('Cần thêm ít nhất 1 hình ảnh'));
                                }
                              },
                            },
                          ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? layout : layout)}
                                        label={`Images[${index}]`}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập link hình ảnh!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Url images" style={{ width: "80%" }} />
                                            {/* <span
                                                onClick={() => null}
                                                style={{ width: "16%" }}
                                                icon={<PlusOutlined />}
                                            >
                                                Chọn ảnh
                                            </span> */}
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%" }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm ảnh
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

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