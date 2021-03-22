import { Form, Input, Button, Checkbox } from 'antd';
import Container from "components/website/elements/Container";
import ApiCall from "modules/ApiCall";
import { useState, useEffect, useContext, useRef } from "react";
import { MainContent } from "components/website/contexts/MainContent";
import {message} from "antd";
import Loading from "components/website/loading/Loading";


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
    valueContext.setStatusLoading(true);
    let dataUser = JSON.parse(localStorage.getItem("infoUser"));
    if(localStorage.getItem("token")){
      let res = await ApiCall({
        path: `/auth/change-password/${dataUser.id}`,
        method: "PATCH",
        token: localStorage.getItem("token"),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      });
      if (res) {
        if(res.statusCode == 200){
          message.success(res.message);
          await valueContext.setStatusLoading(false);
        }else{
          message.warn(res.message);
          await valueContext.setStatusLoading(false);
        }
      }
    }else{
      message.warn("Vui lòng thử lại sau, tính năng này đang cập nhật!");
       await valueContext.setStatusLoading(false);
    }
    
  }

  const onFinish = (values) => {
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
    <Loading status={valueContext.statusLoading}></Loading>    
    <style jsx>{`
          .contentChangePassword{
            width: 100%;
          }
        `}</style>
  </div>
}