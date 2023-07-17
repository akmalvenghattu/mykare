import React from 'react';
import Header from '@/components/User/Header';

const UserLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default UserLayout;