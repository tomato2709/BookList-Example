import { GoogleOutlined } from '@ant-design/icons';
import { Space, Card, Button } from 'antd';
import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    return (
        <Space wrap style={{ display:'flex', justifyContent:'center', alignItems: 'center' }}>
            <Card title="Trang đăng nhập" bordered={false} style={{ width: 300, textAlign: 'center' }}>
                <Button type="primary" onClick={() => signInWithGoogle()} disabled={authing}>
                    <GoogleOutlined />Đăng nhập bằng Google
                </Button>
            </Card>
        </Space>
    );
};

export default LoginPage;