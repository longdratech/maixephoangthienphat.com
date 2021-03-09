import { Table, Space, Modal, Button, Popconfirm, message, Spin } from 'antd';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import ProductCreate from "components/website/content-page-admin/ProductCreate";
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

export default function Product({routeProductID}) {

    const valueContext =  useContext(MainContent);
    
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [data, setData] = useState([]);
    const [idProductSelect, setDataProductSelect] = useState("")
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


    const deleteSuccess = (data) => {
        console.log("delete success: ", data);
        // message
    }

    const handleDeleteProduct = async (id) => {
        if(id){
            await valueContext.deleteDataProduct(deleteSuccess, id);
            await message.success('Xoá thành công!', 0.2);
            await valueContext.getDataProducts(setData);
        }
    }
    
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
   
    const showModal = async (value) => {
        if(value){
            await setDataProductSelect(value);
            await valueContext.getDataProduct(setDataSelect, value);
            await setIsModalVisible(true);
        }
    };

    const handleOk = async () => {
        await setIsModalVisible(false);
        // valueContext.getDataProducts(setData);
    };

    const handleCancel = async () => {
        await setIsModalVisible(false);
        // valueContext.getDataProducts(setData);
    };

    const columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'title',
          key: 'title',
            //   filters: [
            //     { text: '1', value: '1' },
            //     { text: '2', value: '2' },
            //   ],
          filteredValue: filteredInfo ? filteredInfo.title :  null,
          onFilter: (value, record) => record.title.includes(value),
          sorter: (a, b) => a.title.length - b.title.length,
          sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
          ellipsis: true,
        //   render: text => <Link href="">{text}</Link>,
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          key: 'price',
          sorter: (a, b) => a.price - b.price,
          sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
          ellipsis: true,
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
            render: text =><>
                <Button type="primary" onClick={()=>{handleRepairInfo(text)}}>{"Sửa"}</Button>
                <PopupConfirm
                    data={text}
                    handleOkOutSize={handleDeleteProduct}
                > </PopupConfirm>
            </>,
        },
      ];
    
    useEffect(()=>{
        if(valueContext && setData){
            valueContext.getDataProducts(setData)
        }
    },[]);

    // useEffect(()=>{
    //     valueContext.getDataProducts(setData);
    // }, [isModalVisible])

    return <div className="contentProductAdmin">
        <div className="content">
        <>
            <Space style={{ marginBottom: 16 }}>
            {/* <Button onClick={setPriceSort}>Sort age</Button> */}
            {/* <Button onClick={clearFilters}>Clear filters</Button> */}
            </Space>
            {
                data.data
                ? <Table columns={columns} dataSource={data.data ? data.data : []} onChange={handleChange} />
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

                    idProductSelect && dataSelect 

                    ?  <ProductCreate 

                        closeModal={handleCancel} 
                        id={idProductSelect ? idProductSelect : 1} dataProductSelect={dataSelect ? dataSelect : null}>

                        </ProductCreate>
                    : <></>

                }
               
            </Modal>
            
        </>
        </div>

        <style jsx>{`
            .contentProductAdmin{
                width: 100%;
                overflow: auto;
                padding-left: 30px;
            }
            .containerSpin{
                width: 100%;
                padding: 20px;
                text-align: center;
            }
        `}</style>
    </div>
}