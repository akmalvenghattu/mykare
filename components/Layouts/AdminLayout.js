import React from 'react';
import Header from '@/components/Admin/Header';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full ">
            <Header />
            <div className=""> {children}</div>
        </div>
    );
}
export default AdminLayout;