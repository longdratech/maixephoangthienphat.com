import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, message, Modal, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined, AreaChartOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import UploadImages from "components/website/content-page-admin/UploadImages";

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


export default function ProductCreate({ id = null, dataSelect, closeModal }) {

    const valueContext = useContext(MainContent);
    const [data, setData] = useState(null);
    const [formRepair] = Form.useForm();

    const [hotDeal, setHotDeal] = useState(false);  // set init value checkbox
    const [indexImg, setIndexImg] = useState();// get index input to set value url img

    const onFinish = async (values) => {
        await valueContext.postDataPortfolio(success, values);
        if (closeModal) {
            closeModal();
        }
    };

    const onFinishHadID = async (values) => {
        await valueContext.patchDataPortfolio(success, id, values);
        if (closeModal) {
            closeModal();
        }
    };

    const success = async () => {
        await message.success('Tạo sản phẩm thành công!', 0.5);
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

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    useEffect(() => {
        if (valueContext && id) {
            // valueContext.getDataProduct(setData)
        }
    }, [])

    useEffect(() => {
        if (dataSelect) {
            initValueForm(dataSelect);
        }
    }, [dataSelect]);

    const initValueForm = async (dataSelect) => {
        // console.log("dataSelect : ", dataSelect)
        await formRepair.setFieldsValue({ ...dataSelect });
        // await setHotDeal(dataSelect.isHotDeal);
    }

    const handleSetImgToInput =  async (value) => {
        // set url image to input
        // console.log("handleSetImgToInput" , value, indexImg);
        if(dataSelect){
            for(let key in dataSelect){
                if(key === "images"){
                    dataSelect[key][parseInt(indexImg)]=value.url
                }
            }
            await formRepair.setFieldsValue({ ...dataSelect });
        }else{
            let cloneData = {...formRepair.getFieldsValue()};
            cloneData.images[indexImg] = value.url;
            // console.log("cloneData ==> ", cloneData)
            await formRepair.setFieldsValue({ ...cloneData});
        }
       
    }

    if (id && dataSelect) {
        return <div className="contentProductAdmin">
            <div className="content">
                <Form
                    form={formRepair}
                    name="dynamic_form_item"
                    {...layout} onFinish={onFinishHadID}
                    validateMessages={validateMessages}>
                    <Form.Item name={['title']} label="Tên dự án" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['description']} label="Description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name={['content']} label="Content">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name={['link']} label="Link">
                        <Input />
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
                                            <Input placeholder="Url images" style={{ width: "80%"}} />

                                        </Form.Item>
                                        <Button type="primary" 
                                            onClick={() => showModal(index.toString())} 
                                            style={{ marginLeft: "auto", marginRight: "20px" }}
                                            icon={<AreaChartOutlined />}>
                                                Chọn ảnh
                                        </Button>
                                        {fields.length > 1 ? (
                                            <Button type="primary" danger onClick={() => remove(field.name)}>
                                                <MinusCircleOutlined className="dynamic-delete-button" />
                                            </Button>
                                        ) : null}
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "50%", marginLeft : "120px"}}
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
                <Modal
                    title={(<h2>Thêm ảnh</h2>)} width={1000}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancelModal}>

                    <UploadImages handleClickOutSite={handleSetImgToInput} handleCloseModal={handleCancelModal} showBtnChoose={true}></UploadImages>
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
                <Form form={formRepair} name="dynamic_form_item" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['title']} label="Tên dự án" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['description']} label="Description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name={['content']} label="Content">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name={['link']} label="Link" >
                        <Input />
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
                                        </Form.Item>
                                        <Button type="primary" 
                                            onClick={() => showModal(index.toString())} 
                                            style={{ marginLeft: "auto", marginRight: "20px" }}
                                            icon={<AreaChartOutlined />}>
                                                Chọn ảnh
                                        </Button>
                                        {fields.length > 1 ? (
                                            <Button type="primary" danger onClick={() => remove(field.name)}>
                                                <MinusCircleOutlined className="dynamic-delete-button" />
                                            </Button>
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "50%", marginLeft : "120px"}}
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
                <Modal title={(<h2>Thêm ảnh</h2>)} width={1000}
                    visible={isModalVisible} onOk={handleOk} onCancel={handleCancelModal}>
                    <h2>Tạo mới</h2>
                    <UploadImages handleClickOutSite={handleSetImgToInput} handleCloseModal={handleCancelModal} showBtnChoose={true} ></UploadImages>
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