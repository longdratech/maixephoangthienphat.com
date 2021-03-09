import TitleCopy from "components/website/title/TitleCopy"
import { Table, Space, Modal, Button, Spin } from 'antd';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import CategoryCreate from "components/website/content-page-admin/CategoryCreate";
const fetchData = [
    {
      key: '1',
      title: 'test 1',
      price: 32,
      category: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      title: 'test 2',
      price: 42,
      category: 'London No. 1 Lake Park',
    },
];

export default function Category() {

    const valueContext =  useContext(MainContent);
    
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [data, setData] = useState([]);

    const [idSelect, setIdSelect] = useState("")
    const [dataSelect, setDataSelect] = useState();

    const [isModalVisible, setIsModalVisible] = useState(false);
      
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    };
    
    const clearFilters = () => {
        setFilteredInfo(null)
    };
    
    const setPriceSort = () => {
        setSortedInfo(
            {
                order: 'descend',
                columnKey: 'price',
            }
        )
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
        }
    };

    const handleOk = async () => {
        await setIsModalVisible(false);
        valueContext.getDataCategories(setData)
    };

    const handleCancel = async () => {
        await setIsModalVisible(false);
        valueContext.getDataCategories(setData)
    };

    const columns = [
        {
          title: 'Tên category',
          dataIndex: 'title',
          key: 'title',
          filteredValue: filteredInfo ? filteredInfo.title :  null,
          onFilter: (value, record) => record.title.includes(value),
          sorter: (a, b) => a.title.length - b.title.length,
          sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
          ellipsis: true,
          render: text => <Link href="">{text}</Link>,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        //   filters: [
        //     { text: 'London', value: 'London' },
        //     { text: 'New York', value: 'New York' },
        //   ],
          filteredValue: filteredInfo ? filteredInfo.category  :  null,
          onFilter: (value, record) => record.category.includes(value),
          sorter: (a, b) => a.category.length - b.category.length,
          sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
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
            valueContext.getDataCategories(setData)
        }
        
    },[]);

    useEffect(()=>{
        if(data){
            console.log("DATA Category ", data)
            // transformData(data)
        }
    }, [data])

    return <div className="contentProductAdmin">
        <div className="content">
        <>
            <Space style={{ marginBottom: 16 }}>
            </Space>
            {
                data
                ? <Table columns={columns} dataSource={data ? data : fetchData} onChange={handleChange} />
                :  <div className="containerSpin"><Spin size="large" /></div>
            }
             <Modal 
                footer={null}
                title={(<h2>Sửa thông tin</h2>)}
                width={1000} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}>
                {
                    idSelect && dataSelect 
                    ?  <CategoryCreate closeModal={handleCancel} id={idSelect ? idSelect : 1} dataProductSelect={dataSelect ? dataSelect : null}></CategoryCreate>
                    : <div className="containerSpin"><Spin size="large" /></div>
                }
               
            </Modal>
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