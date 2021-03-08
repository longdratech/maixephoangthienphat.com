import TitleCopy from "components/website/title/TitleCopy"
import { Table, Button, Space } from 'antd';
import {useState, useEffect, useContext} from "react";
import { MainContent } from "components/website/contexts/MainContent";
import Link from "next/link";
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
      
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    };
    
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

    const columns = [
        {
          title: 'Tên category',
          dataIndex: 'title',
          key: 'title',
        //   filters: [
        //     { text: 'Joe', value: 'Joe' },
        //     { text: 'Jim', value: 'Jim' },
        //   ],
          filteredValue: filteredInfo ? filteredInfo.title :  null,
          onFilter: (value, record) => record.title.includes(value),
          sorter: (a, b) => a.title.length - b.title.length,
          sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
          ellipsis: true,
          render: text => <Link href="">{text}</Link>,
        },
        // {
        //   title: 'Giá',
        //   dataIndex: 'price',
        //   key: 'price',
        //   sorter: (a, b) => a.price - b.price,
        //   sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        //   ellipsis: true,
        // },
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
      ];
    
    //   const transformData = (data) => {
    //     return data.map((index, value)=>{
    //         value.key = index;
    //         return value;
    //     })
    //   }

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
            {/* <Button onClick={setPriceSort}>Sort age</Button> */}
            {/* <Button onClick={clearFilters}>Clear filters</Button> */}
            </Space>
            {
                data
                ? <Table columns={columns} dataSource={data ? data : fetchData} onChange={handleChange} />
                : <></>
            }
            
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