import React, { useContext, useEffect, useState } from 'react';

import Loading from '@/components/CustomComponents/Loading';
import withUserLayout from '@/hocs/withUserLayout';

import AppContext from '@/server_api/context/AppContext';

const Dashboard = () => {
    const { loggedUser } = useContext(AppContext);

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (loggedUser) {
            const savedImageUrl = localStorage.getItem(loggedUser.userImageUrl);
            if (savedImageUrl) {
                setImageUrl(savedImageUrl);
            }
        }
    }, [loggedUser]);

    return (
        <>
            {loggedUser &&
                <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-300">
                    {imageUrl && (
                        <div className=" rounded-full w-24 h-24 overflow-hidden border-4 border-[#609a42] ">
                            <img src={imageUrl} alt="User Image" />
                        </div>
                    )}
                    <div className="text-center font-semibold text-lg sm:text-2xl mt-3">Welcome To&nbsp;<span className='text-[#609a42] hover:underline cursor-pointer' onClick={() => alert(`hello ${loggedUser.userName}`)}>{loggedUser.userName}</span>  </div>
                </div>
                ||
                <Loading />
            }
        </>

    );
}

export default withUserLayout(Dashboard);