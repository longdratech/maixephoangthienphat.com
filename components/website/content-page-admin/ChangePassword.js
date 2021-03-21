import { Form, Input, Button, Checkbox } from 'antd';
import Container from "components/website/elements/Container";
import ApiCall from "modules/ApiCall";
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import {message} from "antd";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function ChangePassword({ }) {

  const valueContext = useContext(MainContent);
  const [dataPatch, setDataPatch] = useState();


  const patchChangePassword = async (functionCb, data) => {

    console.log(" valueContext.token",  valueContext.token);
    console.log("user ", valueContext.dataUser)
    if(valueContext.dataUser && valueContext.dataUser.id ){
      let res = await ApiCall({
        path: `/auth/change-password/${valueContext.dataUser.id}`,
        method: "PATCH",
        token: localStorage.getItem("token"),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      });
      if (res) {
        if(!res.data){
          message.warn(res.message);
        }
        if(res.data){
          await functionCb(res);
          message.success("Hoàn thành!");
        }
        
      }
    }else{
      message.warn("Vui lòng thử lại sau, tính năng này đang cập nhật!");
    }
    
  }

  const onFinish = (values) => {
    // console.log('Success:', values);
    patchChangePassword(setDataPatch, values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
    if(dataPatch){
      console.log("dataPatch :" , dataPatch)
    }
  },[dataPatch])

  return <div className="contentChangePassword">
    <Container className="center">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
    <style jsx>{`
          .contentChangePassword{
            width: 100%;
          }
        `}</style>
  </div>
}