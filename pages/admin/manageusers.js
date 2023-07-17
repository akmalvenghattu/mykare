import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';

import withAdminLayout from '@/hocs/withAdminLayout';
import UserRow from '@/components/Admin/PagesComponents/UserRow';
import TextInput from '@/components/CustomComponents/TextInput';
import CustomButton from '@/components/CustomComponents/CustomButton';

import AppContext from '@/server_api/context/AppContext';

const ManageUsers = () => {
    const { allUsers } = useContext(AppContext);
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState({
        keyword: ''
    });
    const [searchQueryKeyword, setSearchQueryKeyword] = useState('');


    useEffect(() => {
        if (router.isReady && router.query) {
            setSearchQuery({
                ...searchQuery,
                ...router.query,
            });
        }
    }, [router]);

    const usersfilteredData = allUsers?.filter((item) =>
        item.userName?.toLowerCase().includes(searchQuery?.keyword?.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.keyword?.toLowerCase())
    );

    const clearFilter = () => {
        setSearchQueryKeyword('')
        setSearchQuery({ ...searchQuery, keyword: '' })
        router.push(`/admin/manageusers`)
    }

    // console.log('usersfilteredData', usersfilteredData)
    return (
        <div className="w-full h-screen flex flex-col justify-start items-center p-4">
            <div className='w-full flex flex-col sm:mt-14 md:mt-14'>
                <div className='flex justify-center items-center gap-2 mb-3'>
                    <TextInput
                        key={searchQueryKeyword}
                        placeholder="search keyword"
                        name="search"
                        value={searchQueryKeyword}
                        onChange={(e) => setSearchQueryKeyword(e.target.value)}
                        autoFocus={true}
                    />
                    <div className="w-32">
                        <CustomButton
                            buttonText="Filter"
                            type="button"
                            onClick={() => router.push(`/admin/manageusers?keyword=${searchQueryKeyword}`)}
                        />
                    </div>
                    <button
                        type="button"
                        className={`flex justify-center w-32 text-white bg-[#609a42] hover:bg-[#467c2a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        onClick={clearFilter}
                    >
                        <AiOutlineClose className='text-white block sm:hidden' size={20}/>
                        <span className='hidden sm:block'>Clear Filter</span>
                    </button>
                </div>
                <div className="w-full hidden lg:flex  flex-row  bg-[#609a42]  px-4 py-3 font-bold rounded-t-md">
                    <div className="w-16 mb-1"></div>
                    <div className="flex-grow flex flex-row text-white">
                        <div className="w-full lg:w-1/4">
                            User
                        </div>
                        <div className="w-full lg:w-3/4 flex">
                            <div className="w-4/5 sm:w-2/3 flex">
                                <div className="flex flex-1 justify-center">
                                    User Type
                                </div>
                                <div className="flex flex-1 justify-center">
                                    Email
                                </div>
                                <div className="flex flex-1 justify-center">
                                    DOB
                                </div>
                            </div>
                            <div className="w-1/5 sm:w-1/3  text-center">
                                Tools
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {usersfilteredData?.length > 0 && usersfilteredData.map((user, index) => (
                <UserRow
                    user={user}
                    key={user.userId}
                    slNo={index + 1}
                />
            ))


            }
        </div>
    );
}

export default withAdminLayout(ManageUsers);