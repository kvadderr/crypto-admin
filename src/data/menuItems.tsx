import type { MenuProps } from 'antd';
import {
    AppstoreOutlined,
    UserSwitchOutlined,
    DotChartOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';

import { Link } from 'react-router-dom'

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
export const menuItems: MenuProps['items'] = [
  
    getItem(<Link to="/order">Заявки</Link>, '1', <LogoutOutlined />),  
    getItem(<Link to="/crypt">Криптовалюта</Link>, '2', <LogoutOutlined />),
        
  ];