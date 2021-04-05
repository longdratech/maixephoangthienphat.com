import TitleCopy from "components/website/title/TitleCopy"
import { Form, Input, InputNumber, Button, Radio, message, Modal, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined, AreaChartOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import UploadImages from "components/website/content-page-admin/UploadImages";
import Loading from "components/website/loading/Loading";
import { TextEditor } from "components/diginext/form/Form";

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


export default function ProductCreate({ id = null, dataProductSelect, closeModal, create = false}) {

    const valueContext = useContext(MainContent);
    const [data, setData] = useState(null);
    const [formRepair] = Form.useForm();
    const formRef = useRef();
    const editor = useRef(null)

    const [hotDeal, setHotDeal] = useState(false);  // set init value checkbox
    const [indexImg, setIndexImg] = useState();// get index input to set value url img
    const [listImgs, setListImgs] = useState(); // get list img in form 
    const [dataSpecifications, setDataSpecifications] = useState(); // get data specifications in form 
    const [dataDescription, setDataDescription] = useState(); // get data Description in form 

    const onFinish = async (values) => {
        await valueContext.setStatusLoading(true)
        await valueContext.postDataProduct(success, values);
        if (closeModal) {
            closeModal();
            await valueContext.setStatusLoading(false)
        }
    };

    const onFinishHadID = async (values) => {
        await valueContext.setStatusLoading(true)
        await valueContext.patchDataProduct(success, id, values);
        if (closeModal) {
            closeModal();
            await valueContext.setStatusLoading(false)
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

    useEffect(() => {
        if (dataProductSelect && create == false) {
            initValueForm(dataProductSelect);
        }else{
            resetInitValueForm();
        }
    }, [dataProductSelect]);

    const initValueForm = async (dataProductSelect) => {
        await formRepair.setFieldsValue({ ...dataProductSelect });
        await setHotDeal(dataProductSelect.isHotDeal);
        await setDataSpecifications(dataProductSelect.specifications);
        await setDataDescription(dataProductSelect.description);
    }

    const resetInitValueForm = async () => {
        await formRepair.resetFields();
        await setHotDeal(false);
        await setDataSpecifications("");
        await setDataDescription("");
    } 

    const handleSetImgToInput =  async (value) => {
        if(dataProductSelect){
            for(let key in dataProductSelect){
                if(key === "images"){
                    dataProductSelect[key][parseInt(indexImg)]=value.url
                }
            }
            await formRepair.setFieldsValue({ ...dataProductSelect });
        }else{
            let cloneData = {...formRepair.getFieldsValue()};
            cloneData.images[indexImg] = value.url;
            await formRepair.setFieldsValue({ ...cloneData});
        }
       
    }

    const onChangeTextEditor = (value) => {
        console.log("onChangeTextEditor", value)
    }

    useEffect(()=>{
        if(formRepair){
            // console.log("from Repair", formRepair.getFieldValue("images"));
            setListImgs(formRepair.getFieldValue("images"));

        }
    }, [formRef.current, formRepair.getFieldValue("images")])

    if (id && dataProductSelect) {
        return <div className="contentProductAdmin">
            <div className="content">
                <Form
                    form={formRepair}
                    ref={formRef}
                    name="dynamic_form_item"
                    {...layout} onFinish={onFinishHadID}
                    validateMessages={validateMessages}>
                    <Form.Item
                        name={['title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['price']} label="Giá sản phẩm" rules={[{ type: 'number', min: 0, required: true }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={['guarantee']} label="Bảo hành" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={['sold']} label="Đã bán" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={['category']} label="Category" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="Mái che">Mái che</Radio.Button>
                            <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                            <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                            <Radio.Button value="Khác">Khác</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name={['isHotDeal']} label="Hot Deal">
                        <Switch checked={hotDeal} onChange={()=>setHotDeal(!hotDeal)}/>
                    </Form.Item>

                    <Form.Item name={['description']} label="description">
                        {/* <Input.TextArea /> */}
                        <TextEditor _id="description1224" defaultValue={dataDescription}  />
                        {/* onChange={value=>setDataDescription(value)} */}
                    </Form.Item>

                    <Form.Item _id="specifications" name={['specifications']} label="Thông số kỹ thuật">
                       
                       <TextEditor defaultValue={dataSpecifications}  />
                       {/* onChange={value=>setDataSpecifications(value)} */}
                   </Form.Item>

                    {/* <Form.Item name={['specifications']} label="Thông số kỹ thuật" >
                        <Input.TextArea />
                    </Form.Item> */}
                    
                    <Form.List className="listInputImgs" name={['images']}
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
                                            <Input className="input-hide" placeholder="Url images" style={{ width: "100%"}} />

                                        </Form.Item>
                                        <div className="listImgsRender" >
                                            {
                                                listImgs && listImgs.length > 0
                                                ?   <img className="imgInForm" src={listImgs[index] ? listImgs[index] : ""}/>
                                                :   <></>
                                            }
                                            <Button type="primary" 
                                                key={index}
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
                                        </div>
                                        
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%", marginLeft : "120px"}}
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
                    justify-content: center;
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
                <Form form={formRepair} name="dynamic_form_item" {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['title']} label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['price']} label="Giá sản phẩm" rules={[{ type: 'number', min: 0, required: true }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={['guarantee']} label="Bảo hành" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={['sold']} label="Đã bán" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name={['category']} label="Category" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="Mái che">Mái che</Radio.Button>
                            <Radio.Button value="Mái xếp">Mái xếp</Radio.Button>
                            <Radio.Button value="Mái hiên">Mái hiên</Radio.Button>
                            <Radio.Button value="Khác">Khác</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name={['isHotDeal']} label="Hot Deal">
                        <Switch checked={hotDeal} onChange={()=>setHotDeal(!hotDeal)}  />
                    </Form.Item>

                    <Form.Item name={['description']} label="Description">
                        {/* <Input.TextArea /> */}
                        <TextEditor defaultValue={""}  />
                    </Form.Item>

                    <Form.Item name={['specifications']} label="Thông số kỹ thuật">
                       
                       <TextEditor _id="specifications123" defaultValue={""} />
                   </Form.Item>

                    {/* <Form.Item name={['specifications']} label="Thông số kỹ thuật" >
                        <Input.TextArea />
                    </Form.Item> */}

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
                                            <Input placeholder="Url images" style={{ width: "100%" }} />
                                        </Form.Item>
                                        <div className="listImgsRender" >
                                            {
                                                listImgs && listImgs.length > 0
                                                ?   <img className="imgInForm" src={listImgs[index] ? listImgs[index] : ""}/>
                                                :   <></>
                                            }
                                            <Button type="primary" 
                                                key={index}
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
                                        </div>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%", marginLeft : "120px"}}
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
                    justify-content: center;
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