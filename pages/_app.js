import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import '@/styles/globals.css';
import '@/styles/navstyle.css';

import AdminLayout from '@/components/Layouts/AdminLayout';
import UserLayout from '@/components/Layouts/UserLayout';
import BlankLayout from '@/components/Layouts/BlankLayout';

import { isObjectEmpty } from '@/utils/isObjectEmpty';
import AppContext from "@/server_api/context/AppContext";
import StorageFunction from "@/server_api/storage";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;

  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/user');
  const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/404';

  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUserFlag, setLoggedUserFlag] = useState(true);
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    getUsersData();

  }, [loggedUser]);

  useEffect(() => {
    loggedUserFlag && getUserSession();
  }, [loggedUserFlag]);

  let LayoutComponent = BlankLayout;

  const layoutSection = () => {
    if ((isAdminRoute) && (!isObjectEmpty(loggedUser))) {
      LayoutComponent = AdminLayout;
    } else if ((isUserRoute) && (!isObjectEmpty(loggedUser))) {
      LayoutComponent = UserLayout;
    } else if (isAuthRoute) {
      LayoutComponent = BlankLayout;
    } else {
      LayoutComponent = BlankLayout;
    }
  }

  const getUserSession = async () => {
    const loggedUser = await StorageFunction.getData('mykare_userLoggedData');
    if (loggedUser) {
      setLoggedUser(loggedUser);
      layoutSection();
      setLoggedUserFlag(false);
    } else {
      router.push('/login');
    }
  };

  const getUsersData = async () => {
    const allUsers_ = await StorageFunction.getData('mykare_allUsers');
    if (allUsers_) {
      if (allUsers_.some(user => user.userType === 'MykareAdmin')) {
        setAllUsers(allUsers_);
      } else {
        setAllUsers([...allUsers_, {
          userType: 'MykareAdmin', fullName: "Admin", userName: "admin", password: "password", email: "admin@gmail.com", dob: "01-01 - 2000"
        }]);
      }

    }
  }

  // console.log("loggedUser", loggedUser)
  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser, allUsers, setAllUsers }}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      {/* {(adminUser) &&
        <AuthLayouts>
          <Component {...pageProps} />
        </AuthLayouts>
        ||
        // <LoginLayouts {...pageProps} />
        // (loggedUser) &&
        // <UserLayouts>
        //   <Component {...pageProps} />
        // </UserLayouts>
        // ||
        <LoginLayouts {...pageProps} />
        // <Login.
        // Layout>
        //   <Login />
        // </Login.>
        // <LoginLayouts />
      } */}
    </AppContext.Provider>
  )
}
