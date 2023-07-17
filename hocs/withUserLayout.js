import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import UserLayout from '@/components/Layouts/UserLayout';

import { isObjectEmpty } from '@/utils/isObjectEmpty';
import StorageFunction from "@/server_api/storage";

const withUserLayout = (PageComponent) => {
  const WithUserLayout = (props) => {
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
      <UserLayout>
        <PageComponent {...props} />
      </UserLayout>
    );
  };

  return WithUserLayout;
};

export default withUserLayout;