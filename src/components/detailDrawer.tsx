import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, List, Input, Row, Select, Space, Divider, Popconfirm } from 'antd';

const { Option } = Select;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

type Props = {
    onClose: void, 
    open: Boolean,
    dataRow: {},
    setDataRow: void,
    saveData: void
}

const DetailDrawer = ({
    onClose,
    open,
    dataRow,
    setDataRow,
    saveData
}: Props ) => {

    if (!dataRow){
      return;
    }

    let currentStatus = dataRow?.status;
    console.log(currentStatus);
    const changeStatus = async (value: string) => {
      console.log(value);
      dataRow.status = value
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataRow)
      };
    
      await fetch("http://95.213.216.132:4000/order", requestOptions);
      setDataRow((pre) => {
        return {...pre, dataRow}
      });
      console.log('dataRow', dataRow);
      saveData();
    } 

    return(
        <Drawer title="Дополнительные данные" width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p className="site-description-item-profile-p">Статус</p>
        <Row>
          <Col span={12}>
          <DescriptionItem title={'Указанный адрес'} content={dataRow?.address} /> 
          <Select
            defaultValue={currentStatus}
            value={currentStatus}
            style={{ width: 250 }}
            onChange = {changeStatus}
            options={[
              { value: 'SUCCESS', label: 'SUCCESS' },
              { value: 'CANCELED', label: 'CANCELED' },
              { value: 'PROCESSING', label: 'PROCESSING' },
            ]}
          />
          </Col>
        </Row>
        <p className="site-description-item-profile-p">Данные оплаты</p>
        <Row>
          <Col span={12}>
          {
             Object.keys(dataRow.paymentData).map((key, i) => (
              <DescriptionItem title={key} content={dataRow?.paymentData[key]} /> 
            ))
          }
          </Col>
        </Row>
           
        <Divider />
        <p className="site-description-item-profile-p">Данные пользователя</p>
        <Row>
          <Col span={12}>
          {
             Object.keys(dataRow?.userData).map((key, i) => (
              <DescriptionItem title={key} content={dataRow?.userData[key]} /> 
            ))
          }
          </Col>
        </Row>
      </Drawer>
    )
}


export default DetailDrawer;