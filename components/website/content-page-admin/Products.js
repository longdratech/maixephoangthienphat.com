import { Table, Space, Modal, Button, Popconfirm } from 'antd';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
import ProductCreate from "components/website/content-page-admin/ProductCreate";
import UploadImages from "components/website/content-page-admin/UploadImages";
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

    const handleDeleteProduct = (value) => {
       console.log("handleDeleteProduct: ", value)
    }
    
    const clearFilters = () => {
        setFilteredInfo(null)
    };
    
    // const clearAll = () => {
    //     setFilteredInfo(null)
    //     setSortedInfo(null)
    // };
    
    const setPriceSort = () => {
        setSortedInfo(
            {
                order: 'descend',
                columnKey: 'price',
            }
        )
    };

    const [visiblePopupConfirm, setVisiblePopupConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = (value) => {
        if(value){
            handleDeleteProduct(value);
            setVisiblePopupConfirm(true);
        }
        
      };
    
      const handleOkPopupConfirm = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisiblePopupConfirm(false);
            setConfirmLoading(false);
        }, 1000);
      };
    
      const handleCancelPopupConfirm = () => {
        console.log('Clicked cancel button');
        setConfirmLoading(false);
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
        valueContext.getDataProducts(setData);
    };

    const handleCancel = async () => {
        await setIsModalVisible(false);
        valueContext.getDataProducts(setData);
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
                {/* <Popconfirm
                    title="Title"
                    visible={visiblePopupConfirm}
                    onConfirm={handleOkPopupConfirm}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancelPopupConfirm}
                >
                    <Button style={{margin:"0 10px"}} type="primary" danger 
                        onClick={()=>{showPopconfirm(text)}}>{"Xoá"}</Button>
                </Popconfirm> */}
                
            </> ,
        },
      ];
    
    useEffect(()=>{
        if(valueContext && setData){
            valueContext.getDataProducts(setData)
        }
    },[]);

    useEffect(()=>{
        valueContext.getDataProducts(setData);
    }, [isModalVisible])

    // useEffect(()=>{
    //     if(dataSelect){
    //         console.log("Product select")
    //     }
    // }, [dataSelect])

    // useEffect(()=>{
    //     if(data){
    //         console.log("DATA Products", data)
    //     }
    // }, [data])

    return <div className="contentProductAdmin">
        <div className="content">
        <>
            <Space style={{ marginBottom: 16 }}>
            {/* <Button onClick={setPriceSort}>Sort age</Button> */}
            {/* <Button onClick={clearFilters}>Clear filters</Button> */}
            </Space>
            {
                data
                ? <Table columns={columns} dataSource={data.data ? data.data : []} onChange={handleChange} />
                : <></>
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
                    ?  <ProductCreate closeModal={handleCancel} id={idProductSelect ? idProductSelect : 1} dataProductSelect={dataSelect ? dataSelect : null}></ProductCreate>
                    : <></>
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
        `}</style>
    </div>
}