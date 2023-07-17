import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BlankLayout from '@/components/Layouts/BlankLayout';
import TextInput from '@/components/CustomComponents/TextInput';
import CustomButton from '@/components/CustomComponents/CustomButton';
import { ImageInput } from '@/components/CustomComponents/ImageInput';

import AppContext from '@/server_api/context/AppContext';
import { storeData, } from "@/server_api/storage";

const Register = () => {
    const { allUsers, setAllUsers } = useContext(AppContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState({});
    const [registerationCompleted, setRegisterationCompleted] = useState(false);

    useEffect(() => {
        if (registerationCompleted && selectedImage != null) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                localStorage.setItem(`userImage_${user.userId}`, imageUrl);
                sessionCompletion();
            };
            reader.readAsDataURL(selectedImage);
        } else {
            registerationCompleted && sessionCompletion();
        }
    }, [registerationCompleted, allUsers]);

    const sessionCompletion = () => {
        storeData('mykare_userLoggedData', user);
        storeData('mykare_allUsers', allUsers);
        alert()
        Router.push('/user/dashboard')
    }

    const validationSchema = Yup.object({
        fullName: Yup.string().min(2, 'Full name must be at least 2 characters').required('Full name is required'),
        userName: Yup.string().min(4, 'User name must be at least 4 characters').required('User name is required'),
        password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
        email: Yup.string().email('Invalid email').required('Email is required').test(
            'unique-email',
            'Email is already in use',
            async function (value) {
                return allUsers?.length > 0 ? !allUsers.some(user => user.email === value) : true;
            }
        ),
        dob: Yup.date().required('Date of birth is required').max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Must be at least 18 years old'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const userId = generateUniqueId();
            setUser({ ...values, userId: userId, userType: 'MykareUser', userImageUrl: selectedImage != null ? `userImage_${userId}` : '' })
            if (allUsers?.length > 0) {
                setAllUsers([...allUsers, { ...values, userId: userId, userType: 'MykareUser', userImageUrl: selectedImage != null ? `userImage_${userId}` : '' }]);
            } else {
                setAllUsers([{ ...values, userId: userId, userType: 'MykareUser', userImageUrl: selectedImage != null ? `userImage_${userId}` : '' }])
            }
            setRegisterationCompleted(true);
        },
    });

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 6);
    };
    // console.log("validationResults", registerationCompleted)
    return (
        <BlankLayout>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
                        <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-[#2f5d18] text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                                Register
                            </h1>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-2">
                                    <TextInput
                                        classNameExtra='md:mt-4'
                                        labelText="Your Full Name"
                                        placeholder="please enter your full name"
                                        id="fullName"
                                        name="fullName"
                                        value={formik.values.fullName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessages={formik.touched.fullName && formik.errors.fullName && formik.errors.fullName || ""}
                                        autoFocus={true}
                                    />


                                    <TextInput
                                        labelText="Your User Name"
                                        placeholder="please enter your user name"
                                        id="userName"
                                        name="userName"
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessages={formik.touched.userName && formik.errors.userName && formik.errors.userName || ""}
                                        autoFocus={true}
                                    />
                                    <TextInput
                                        labelText="Your Email"
                                        placeholder="please enter your email"
                                        type='email'
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessages={formik.touched.email && formik.errors.email && formik.errors.email || ""}
                                        autoFocus={true}
                                    />

                                    <TextInput
                                        labelText="Your password"
                                        placeholder="please enter your password"
                                        id="password"
                                        type="password"
                                        className="tracking-widest"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessages={formik.touched.password && formik.errors.password && formik.errors.password || ""}
                                        autoFocus={true}
                                    />
                                    <div className='flex flex-col space-y-2'>
                                        <label htmlFor="Date" className="form-label  text-white">
                                            Date Of Birth
                                        </label>
                                        <input
                                            className={`p-2.5 rounded-md dark:bg-gray-700 text-white ${formik.touched.dob && formik.errors.dob && formik.errors.dob ? "border-red-600" : " dark:border-gray-600"}`}
                                            type='date'
                                            // value={new Date()} 
                                            id="dob"
                                            name="dob"
                                            value={formik.values.dob}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.dob && formik.errors.dob && <div className='text-red-500'>{formik.errors.dob}</div>}
                                    </div>
                                    <ImageInput
                                        label="User Display Image"
                                        name="userImage"
                                        src={
                                            (selectedImage &&
                                                URL.createObjectURL(selectedImage))
                                            ||
                                            null
                                        }
                                        onChange={(event) =>
                                            setSelectedImage(event.target.files[0])
                                        }
                                        onCancel={() =>
                                            setSelectedImage(null)
                                        }
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className='w-full flex gap-2 pt-8 sm:max-w-md flex-col md:flex-row '>
                                        <CustomButton
                                            buttonText="Register"
                                            type="submit"
                                        />
                                        <Link href="/login" legacyBehavior>
                                            <a className="flex justify-center w-full text-white bg-[#609a42] hover:bg-[#467c2a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Login
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </BlankLayout>

    );
}

Register.layout2 = 'Main2';
// Register.layout = BlankLayout;
export default Register;