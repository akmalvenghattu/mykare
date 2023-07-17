import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import AppContext from '@/server_api/context/AppContext';
import { storeData } from '@/server_api/storage';

const Header = () => {
    const { loggedUser, setLoggedUser } = useContext(AppContext);

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (loggedUser) {
            const savedImageUrl = localStorage.getItem(loggedUser.userImageUrl);
            if (savedImageUrl) {
                setImageUrl(savedImageUrl);
            }
        }
    }, [loggedUser]);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logOut = () => {
        setLoggedUser(null);
        storeData('mykare_userLoggedData', null);
    }
    return (
        <>

            <nav className="w-full bg-[#609a42] absolute hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/userdashboard" legacyBehavior>
                                <a className="text-white font-bold text-xl">Mykare User Dashboard</a>
                            </Link>
                        </div>
                        <div className="hidden sm:block">
                            <div className="ml-4 flex items-center space-x-4">
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="text-white  hover:text-gray-300 px-3 py-2 rounded-md  font-semibold text-lg"
                                    >
                                        <FaUserCircle className="stroke-current text-white" size={30} />
                                    </button>
                                    {isDropdownOpen && (

                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ">
                                            <div className="p-6 w-full flex flex-col items-center justify-center gap-y-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {imageUrl && (
                                                    <div className=" rounded-full w-12 h-12 overflow-hidden border-4 border-[#609a42] ">
                                                        <img src={imageUrl} alt="User Image" />
                                                    </div>
                                                )}
                                                <div className="text-center font-semibold text-sm   text-[#609a42]">{loggedUser.userName}</div>
                                                <div className="text-center font-semibold text-sm   ">{loggedUser?.userType}</div>
                                                <div className="cursor-pointer hover:text-[#609a42]" onClick={logOut}>
                                                    LogOut
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <ResponsiveHeader setLoggedUser={setLoggedUser} />
        </>
    );
}

export default Header;


const ResponsiveHeader = ({ setLoggedUser }) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const logOut = () => {
        setLoggedUser(null);
        storeData('mykare_userLoggedData', null);
    }

    return (
        <nav className="navigation flex sm:hidden">
            <Link href="/userdashboard" legacyBehavior>
                <a className="text-white font-bold text-xl">Mykare User Dashboard</a>
            </Link>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <div className=" mt-8 cursor-pointer text-white" onClick={logOut}>
                            LogOut
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
