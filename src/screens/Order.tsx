import { useState, useEffect } from "react";

import { DatePicker, Space, Button, Table } from 'antd';
  
import DetailDrawer from '../components/detailDrawer'

const Order = () => {

    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataRow, setDataRow] = useState(null);

    const resetEditing = () => {
        setOpen(false);
    };

    const openDrawer = (record) => {
        console.log(record)
        setDataRow(null);
        setOpen(true);
        setDataRow({...record});
    };

    const saveData = () => {
        console.log('DATAAAA SAVED')
        setDataSource((pre) => {
          return pre.map((theRow) => {
            if (theRow.id === dataRow.id) {
              return dataRow;
            } else {
              return theRow;
            }
          });
        });
    }

    useEffect(() => {
        fetch("http://95.213.216.132:4000/order")
          .then((res) => res.json())
          .then((data) => setDataSource(data));
    }, []);
    
    const data = [];

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;   
    }

    for (let i = 0; i < dataSource.length; i++ ){
        data.push({
            key: i,
            createdAt: (new Date(dataSource[i].createdAt) + 'Z').toString().slice(0, 24),
            id: dataSource[i].id,
            currency: dataSource[i].currency,
            crypt: dataSource[i].crypt,
            payment: dataSource[i].payment,
            status: dataSource[i].status,
            amount: dataSource[i].amount,
            singleData: dataSource[i]
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
          title: 'Дата создания',
          dataIndex: 'createdAt',
          key: 'createdAt'
        },        
        {
            title: 'Кол-во',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
          title: 'Криптовалюта',
          dataIndex: 'crypt',
          key: 'crypt',
        },
        {
          title: 'Система оплат',
          dataIndex: 'payment',
          key: 'payment',
        },
        {
          title: 'Валюта',
          dataIndex: 'currency',
          key: 'currency',
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Подробнее',
          dataIndex: 'singleData',
          key: 'singleData',
          render: (record) => <a onClick={() => openDrawer(record)}>Подробнее</a>
        },
      ];

    return (
        <>
            <Table columns={columns} dataSource={data} />
        <DetailDrawer open={open} onClose={resetEditing} saveData={saveData} dataRow={dataRow} setDataRow={setDataRow}/>
        </>
    )
}

export default Order;