import moment from 'moment/moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const UserRow = ({ user, slNo }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (user) {
            const savedImageUrl = localStorage.getItem(user.userImageUrl);
            if (savedImageUrl) {
                setImageUrl(savedImageUrl);
            }
        }
    }, [user]);


    return (
        <>
            <div className="w-full flex  flex-col sm:flex-row bg-gray-200 px-4 py-3 mt-2 rounded-md sm:zoom-in text-xs sm:text-sm md:text-sm">
                <div className="w-16 mb-1 flex items-center">
                    <span className="text-gray-400"># </span> {slNo}
                </div>
                <div className="flex-grow flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/4 flex items-center gap-x-3 py-2">
                        <div className="flex justify-start">
                            <div className="w-16 h-16 rounded-full overflow-hidden image-fit sm:zoom-in bg-gray-200 border boder-gray-300 ">
                                {user.userImageUrl && imageUrl &&
                                    <img src={imageUrl} alt="User Image" />

                                    ||
                                    <img src="/images/nouserimage.jpg" alt="User Image" />
                                }
                            </div>
                        </div>
                        <div className="flex flex-1 ml-3 flex-grow text-left font-medium">
                            {user.userName}
                        </div>
                    </div>
                    <div className="w-full lg:w-3/4 flex  gap-y-2 py-2  border-t border-gray-200 lg:border-none">
                        <div className="w-4/5 sm:w-2/3 flex gap-y-1 flex-col lg:flex-row " >
                            <div className="flex-1 flex items-center lg:justify-center">
                                <div className="lg:hidden mr-2 w-1/2 ">
                                    <span className="lg:hidden mr-2 ">User Type :</span>
                                </div>
                                <span className="sm:w-1/2">{user.userType} </span>
                            </div>
                            <div className="flex-1 flex items-center lg:justify-center">
                                <div className="lg:hidden mr-2 w-1/2 ">
                                    <span className="lg:hidden mr-2 ">Email :</span>
                                </div>
                                <span className="sm:w-1/2">{user.email} </span>
                            </div>

                            <div className="flex-1 flex items-center lg:justify-center ">
                                <div className="lg:hidden mr-2 w-1/2">
                                    <span className="lg:hidden mr-2">Date of birth : </span>
                                </div>
                                <span className="sm:w-1/2">
                                    {moment(user.dob).format("MMM Do YYYY")}
                                </span>
                            </div>
                        </div>
                        <div className="w-1/5 sm:w-1/3 flex items-center justify-center gap-3">
                            <Link href={`/admin/userdetails/${user.userId}`}>
                                <button className="btn btn-sm btn-outline-secondary flex items-center" >
                                    <AiOutlineEye  className="w-5 h-5 sm:mr-1 text-black" />
                                    <span className="hidden sm:block"> Show details</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserRow;