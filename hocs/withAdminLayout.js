import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Layouts/AdminLayout';

import { isObjectEmpty } from '@/utils/isObjectEmpty';
import StorageFunction from "@/server_api/storage";

const withAdminLayout = (PageComponent) => {
    const WithAdminLayout = (props) => {
        const router = useRouter();

        useEffect(() => {
            getUserSession()
        }, []);

        const getUserSession = async () => {
            const loggedUser = await StorageFunction.getData('mykare_userLoggedData');
            if (!loggedUser) {
                if (isObjectEmpty(loggedUser)) {
                    router.push('/login');
                    return null;
                }
            }
        };

        return (
            <AdminLayout>
                <PageComponent {...props} />
            </AdminLayout>
        );
    };

    return WithAdminLayout;
};

export default withAdminLayout;