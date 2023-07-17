import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';

import withAdminLayout from '@/hocs/withAdminLayout';
import TextInput from '@/components/CustomComponents/TextInput';

import AppContext from '@/server_api/context/AppContext';

const UserDetails = () => {
    const { allUsers } = useContext(AppContext);

    const router = useRouter();
    const { userId } = router.query;


    const [userDetail, setUserDetail] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (userDetail) {
            const savedImageUrl = localStorage.getItem(userDetail.userImageUrl);
            if (savedImageUrl) {
                setImageUrl(savedImageUrl);
            }
        }
    }, [userDetail]);

    useEffect(() => {
        if (router.isReady && router.query) {
            const userIsAvailableData = allUsers?.find(user => (user.userId === userId));
            if (userIsAvailableData) {
                setUserDetail(userIsAvailableData)
            }
        }
    }, [userId]);

    console.log(`User`, userDetail)
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-20">
                    <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
                        <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className=" flex justify-between items-center">
                                <h1 className="text-[#2f5d18] text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                                    User Details
                                </h1>
                                <AiOutlineClose className='text-white cursor-pointer' size={30} onClick={() => router.push('/admin/manageusers')} />
                            </div>
                            {userDetail && <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-2">
                                <TextInput
                                    classNameExtra='md:mt-4'
                                    labelText="Your Full Name"
                                    placeholder="please enter your full name"
                                    id="fullName"
                                    name="fullName"
                                    value={userDetail.fullName}
                                    disabled
                                />

                                <TextInput
                                    labelText="Your User Name"
                                    placeholder="please enter your user name"
                                    id="userName"
                                    name="userName"
                                    value={userDetail.userName}
                                    disabled
                                />
                                <TextInput
                                    labelText="Your Email"
                                    placeholder="please enter your email"
                                    type='email'
                                    id="email"
                                    name="email"
                                    value={userDetail.email}
                                />

                                {/* <TextInput
                                    labelText="Your password"
                                    placeholder="please enter your password"
                                    id="password"
                                    type="password"
                                    className="tracking-widest"
                                    name="password"
                                    value={userDetail.password}
                                    disabled
                                /> */}
                                <div className='flex flex-col space-y-2'>
                                    <label htmlFor="Date" className="form-label  text-white">
                                        Date Of Birth
                                    </label>
                                    <input
                                        className={`p-2.5 rounded-md dark:bg-gray-700 text-white dark:border-gray-600}`}
                                        type='date'
                                        // value={new Date()} 
                                        id="dob"
                                        name="dob"
                                        value={userDetail.dob}
                                        disabled
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-32 h-32 rounded-lg overflow-hidden image-fit sm:zoom-in bg-gray-200 border boder-gray-300 ">
                                        {userDetail.userImageUrl && imageUrl &&
                                            <img src={imageUrl} alt="User Image" />
                                            ||
                                            <img src="/images/nouserimage.jpg" alt="User Image" />
                                        }
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default withAdminLayout(UserDetails);