import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DatePicker, Space, Button, Table, Input } from 'antd';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const roles = 'ADMIN';

    const _login = () => {
        if (password === 'Zsxdcf123') {
            setAuth({ roles });
            navigate(from, { replace: true });
        }
    }

    return (
        <>
            <Input type="password" addonBefore="Password" placeholder="Введите пароль"  onChange={(e) => setPassword(e.target.value)} defaultValue={password} />
            <br/><br/>
            <Button type="primary" onClick={_login}>Login</Button>
        </>
    )
}

export default Login;