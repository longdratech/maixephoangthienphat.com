import { Popconfirm, Button } from 'antd';
import { useState, useEffect } from "react"
export default function PopupConfirm({
    data,
    handleOkOutSize
}) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = (value) => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(() => {

            setVisible(false);
            setConfirmLoading(false);

            if (handleOkOutSize) {
                console.log("showPopconfirm value", data)
                handleOkOutSize(data);
            }
            
        }, 500);

    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Popconfirm
                title="Title"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
            >
                <Button style={{ margin: "0 10px" }} type="primary" danger
                    onClick={() => { showPopconfirm(data) }}>{"Xoá"}</Button>
            </Popconfirm>
        </>
    );
}