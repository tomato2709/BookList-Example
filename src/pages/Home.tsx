import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import BookList from '../components/BookList';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Button } from 'antd';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const auth = getAuth();

    return (
        <div>
            <p>Chào mừng đến với trang Book List!</p>
            <Button onClick={() => signOut(auth)}>Đăng xuất</Button>
            <Provider store={store}><BookList /></Provider>
        </div>
    );
};

export default HomePage;