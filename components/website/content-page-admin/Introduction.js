import { Form, Input, Button, Checkbox } from 'antd';
import Container from "components/website/elements/Container";
import ApiCall from "modules/ApiCall";
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import { message } from "antd";
import Loading from "components/website/loading/Loading";
import { TextEditor } from "components/diginext/form/Form";

const layout = {
    labelCol: {
        span: 1,
    },
    wrapperCol: {
        span: 1,
    },
};
const tailLayout = {
    wrapperCol: {
        offset:12,
        span: 16,
    },
};

export default function Introduction({

}) {
    const {
        patchDataIntroduction, 
        getDataIntroduction, 
        statusLoading, 
        setStatusLoading} = useContext(MainContent);

    const [dataContent, setDataContent] = useState();

    useEffect(()=>{
        console.log(dataContent);
        setStatusLoading(false);
    },[dataContent])

    useEffect(()=>{
        setStatusLoading(true);
        getDataIntroduction(setDataContent);
    },[]);

    const onSuccess = (data) => {
        console.log(data);
        message.success("Thành công");
        setStatusLoading(false)
    }
    const onError = (errors) =>{
        console.log(errors);
        message.warn(errors.message);
        setStatusLoading(false)
    }
    const onSubmit = (values) => {
        setStatusLoading(true);
        patchDataIntroduction(onSuccess, values, onError);
    }

    const onFinishFailed = (errorInfo) => {
        setStatusLoading(false)
    };

    return <div className="contentIntro">
        <Container className="center">
            {
                dataContent && dataContent.content
                ? <Form
                    name="into"
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Nộ dung"
                        name="content"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <TextEditor _id="content" defaultValue={dataContent.content}  />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                : <>Chức năng đang đang hoàn thiện</>
            }
            

        </Container>
        <Loading status={statusLoading}></Loading>
        <style jsx>{`
          .contentIntro{
            width: 100%;
          }
        `}</style>
    </div>

}