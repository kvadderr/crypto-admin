import React, { useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Space, Button, Collapse, Input, Popconfirm } from 'antd';
const { Panel } = Collapse;

const Crypt = () => {

    const [dataSource, setDataSource] = useState([]);
    const [dataRow, setDataRow] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [idRow, setIdRow] = useState(0);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = async (id: number) => {
        console.log(id);
        console.log(dataSource);
        console.log(dataSource[id]);
        setConfirmLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSource[id])
        };
        
        await fetch("http://95.213.216.132:4000/crypt", requestOptions);
        setOpen(false);
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    useEffect(() => {
        fetch("http://95.213.216.132:4000/crypt")
          .then((res) => res.json())
          .then((data) => setDataSource(data));
    }, []);

    const onChangeAddress = (id, e) => {
        dataSource[id].address = e.target.value;
    }

    const onChangePercent = (id, e) => {
        dataSource[id].percent = e.target.value;
    }

    const onChangeCode = (id, e) => {
        dataSource[id].code = e.target.value;
    }

    return (
    <>
        <Collapse defaultActiveKey={['1']}>

        {
            dataSource.map(function(item, i){
                return (
                    <Panel header={item.key + ' ' + item.well + '$'} key={item.id}>
                        <Input addonBefore="address" onChange={(e) => onChangeAddress(item.id-1, e)} placeholder="Address" defaultValue={item.address} />
                        <br/><br/>
                        <Input addonBefore="percent" onChange={(e) => onChangePercent(item.id-1, e)} placeholder="percent" defaultValue={item.percent} />
                        <br/><br/>
                        <Input addonBefore="QR code link" onChange={(e) => onChangeCode(item.id-1, e)} placeholder="QR code link" defaultValue={item.code} />
                        <br/><br/>
                        <Popconfirm
                            title="Сохранение данных"
                            description="Уверены что хотите сохранить данные?"
                            open={open}
                            onConfirm={() => handleOk(item.id-1)}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={handleCancel}
                        >
                            <Button type="primary" onClick={showPopconfirm}>Save</Button>
                        </Popconfirm>
                    </Panel>
                )
            })
        }

        </Collapse>
    </>
    );

}
  

export default Crypt;