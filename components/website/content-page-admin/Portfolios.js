import { Table, Space, Modal, Button, message, Spin } from 'antd';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import PortfoliosCreate from "components/website/content-page-admin/PortfoliosCreate";
import UploadImages from "components/website/content-page-admin/UploadImages";
import PopupConfirm from "components/website/popup-confirm/PopupConfirm";

const fetchData = [
    {
      key: '2',
      title: 'test 2',
      price: 42,
      category: 'London No. 1 Lake Park',
      id :"1"
    },
];

export default function Portfolios({routeProductID}) {

    const valueContext =  useContext(MainContent);
    
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [data, setData] = useState([]);
    const [idSelect, setIdSelect] = useState("")
    const [dataSelect, setDataSelect] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

      
    const handleChange = (pagination, filters, sorter) => {s
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    };

    const handleRepairInfo = (value) => {
        showModal(value)
    }

    const handleCreateInfo = async () => {
        await showModal("")
    }
    

    const deleteSuccess = (data) => {
        // console.log("delete success: ", data);
    }
    
    const handleDeletePortfolios = async (id) => {
        if(id){
            await valueContext.deleteDataPortfolio(deleteSuccess, id);
            await message.success('Xoá thành công!', 0.2);
            await valueContext.getDataPortfolios(setData);
        }
    }

    const showModal = async (value) => {
        if(value){
            await setIdSelect(value);
            await valueContext.getDataPortfolio(setDataSelect, value);
            await setIsModalVisible(true);
        }else{
            await setIdSelect("");
            await valueContext.getDataPortfolio(setDataSelect, "");
            await setIsModalVisible(true);
        }
    };

    const handleOk = async () => {
        await setIsModalVisible(false);
        valueContext.getDataPortfolios(setData);
    };

    const handleCancel = async () => {
        await setIsModalVisible(false);
        valueContext.getDataPortfolios(setData);
    };

    const columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'title',
          key: 'title',
          filteredValue: filteredInfo ? filteredInfo.title :  null,
          onFilter: (value, record) => record.title.includes(value),
          sorter: (a, b) => a.title.length - b.title.length,
          sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          filteredValue: filteredInfo ? filteredInfo.description  :  null,
          onFilter: (value, record) => record.description.includes(value),
          sorter: (a, b) => a.description.length - b.description.length,
          sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
          ellipsis: true,
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: text =><>
                <Button type="primary" onClick={()=>{handleRepairInfo(text)}}>{"Sửa"}</Button>
                <PopupConfirm
                    data={text}
                    handleOkOutSize={handleDeletePortfolios}
                > </PopupConfirm>
            </>,
          },
      ];
    
    useEffect(()=>{
        if(valueContext && setData){
            valueContext.getDataPortfolios(setData)
        }
    },[]);

    useEffect(()=>{
        console.log("dataSelect: ", dataSelect)
    },[dataSelect])

    useEffect(()=>{
        valueContext.getDataPortfolios(setData);
    }, [isModalVisible])


    return <div className="contentProductAdmin">
        <div className="content">
        <Button type="primary" 
                style={{left: "100%", transform: "translate(-100%, 0)"}}
                onClick={()=>{handleCreateInfo("")}}>
                Tạo mới
            </Button>
        <>
            <Space style={{ marginBottom: 16 }}>
            </Space>
            {
                data.data
                ? <Table columns={columns} dataSource={data.data ? data.data : []} onChange={handleChange} />
                : <div className="containerSpin"><Spin size="large" /></div>
            }

            {
                idSelect && dataSelect
                ? <Modal 
                    footer={null}
                    title={(<h2>Sửa thông tin</h2>)}
                    width={1000} 
                    visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel}>
                    <PortfoliosCreate closeModal={handleCancel} id={idSelect ? idSelect : 1} dataSelect ={ dataSelect ? dataSelect : null}></PortfoliosCreate>
                    
                </Modal>
                :<Modal 
                    footer={null}
                    title={(<h2>Tạo mới</h2>)}
                    width={1000} 
                    visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel}>
                        <PortfoliosCreate dataSelect={null} id={null}  closeModal={handleCancel} ></PortfoliosCreate>
                </Modal>
            }
            
        </>
        </div>

        <style jsx>{`
            .contentProductAdmin{
                width: 100%;
                overflow: auto;
                padding-left: 20px;
            }
            .containerSpin{
                width: 100%;
                padding: 20px;
                text-align: center;
            }
        `}</style>
    </div>
}