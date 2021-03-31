import TitleCopy from "components/website/title/TitleCopy"
import { Table, Space, Modal, Button, Spin } from 'antd';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import SocialsCreate from "components/website/content-page-admin/SocialsCreate";
const fetchData = [
    {
      key: '1',
      title: 'test 1',
      price: 32,
      category: 'New York No. 1 Lake Park',
    }
];

export default function Socials() {

    const valueContext =  useContext(MainContent);
    
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [data, setData] = useState();

    const [idSelect, setIdSelect] = useState("")
    const [dataSelect, setDataSelect] = useState();

    const [isModalVisible, setIsModalVisible] = useState(false);
      
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    };

    const handleRepairInfo = (value) => {
        showModal(value)
    }

    const findCategory = (list, id) => {
        return list.find((value, index)=>{
            return value.id === id;
        })
    }

    const showModal = async (value) => {
        if(value){
            await setIdSelect(value);
            await setDataSelect(findCategory(data, value));
            await setIsModalVisible(true);
        }else{
            await setIdSelect("");
            await setDataSelect(findCategory(data, ""));
            await setIsModalVisible(true);
        }
    };

    const handleOk = async () => {
        await setIsModalVisible(false);
        valueContext.getDataSocials(setData)
    };

    const handleCancel = async () => {
        await setIsModalVisible(false);
        valueContext.getDataSocials(setData)
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            filteredValue: filteredInfo ? filteredInfo.id :  null,
            onFilter: (value, record) => record.id.includes(value),
            sorter: (a, b) => a.id.length - b.id.length,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            ellipsis: true,
        },
        {
          title: 'Tên',
          dataIndex: 'name',
          key: 'name',
          filteredValue: filteredInfo ? filteredInfo.name :  null,
          onFilter: (value, record) => record.name.includes(value),
          sorter: (a, b) => a.name.length - b.name.length,
          sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: 'Link',
          dataIndex: 'link',
          key: 'link',
          filteredValue: filteredInfo ? filteredInfo.link  :  null,
          onFilter: (value, record) => record.link.includes(value),
          sorter: (a, b) => a.link.length - b.link.length,
          sortOrder: sortedInfo.columnKey === 'link' && sortedInfo.order,
          ellipsis: true,
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: text =><Button type="primary" onClick={()=>{handleRepairInfo(text)}}>{"Sửa"}</Button>,
          },
      ];
    

    useEffect(()=>{
        if(valueContext && setData){
            valueContext.getDataSocials(setData)
        }
    },[]);

   useEffect(()=>{
       if(dataSelect){
            console.log("dataSelect: ", dataSelect)
       }
       if(idSelect){
           console.log("idSelect: ", idSelect)
       }
   },[dataSelect, idSelect])

    return <div className="contentProductAdmin">
        <div className="content">
        <>
            <Space style={{ marginBottom: 16 }}>
            </Space>
            {
                data
                ? <Table columns={columns} dataSource={data} onChange={handleChange} />
                :  <div className="containerSpin"><Spin size="large" /></div>
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
                    <SocialsCreate closeModal={handleCancel} id={idSelect ? idSelect : 1} dataSelect={dataSelect ? dataSelect : null}></SocialsCreate>
                    
                </Modal>
                :<Modal 
                    footer={null}
                    title={(<h2>Sửa thông tin</h2>)}
                    width={1000} 
                    visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel}>
                    <div className="containerSpin"><Spin size="large" /></div>
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