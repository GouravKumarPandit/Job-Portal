import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_ENDPOINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';

function UpdateProfileDialog({ open, setOpen }) {
    // const { loading } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const { user } = useSelector(store =>  store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill => skill),
        file: user?.profile.resume
    });

    const changeEventHandler = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	}

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(input);
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if(input.file){
            formData.append('file', input.file);
        }

        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if(res.data.success){
                dispatch(setUser(res.data.user));
                setToast("true");
            }
            setToastMessage(res.data.message);
        } catch (error) {
            setToast("false");
            setToastMessage(error.response.data.message);
            console.log("FRONTEND: REGISTER ERROR: ", error);
        } finally{
            setOpen(false);
            setLoading(false);
        }
    }

    return (
        <div className="">
            {/* Modal */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>

                        {/* Header */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h2>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id='fullname'
                                    value={input.fullname}
                                    name='fullname'
                                    onChange={changeEventHandler}
                                    placeholder="Enter full name"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    value={input.email}
                                    name='email'
                                    onChange={changeEventHandler}
                                    placeholder="Enter email"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    id='mobile'
                                    value={input.phoneNumber}
                                    name='phoneNumber'
                                    onChange={changeEventHandler}
                                    placeholder="Enter Your Number"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bio
                                </label>
                                <input
                                    type="text"
                                    id='bio'
                                    value={input.bio}
                                    name='bio'
                                    onChange={changeEventHandler}
                                    placeholder="Bio"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    id='skills'
                                    value={input.skills}
                                    name='skills'
                                    onChange={changeEventHandler}
                                    placeholder="Enter your skills"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Resume
                                </label>
                                <input
                                    type="file"
                                    id='resume'
                                    onChange={fileChangeHandler}
                                    accept='application/pdf'
                                    placeholder="Upload your Resume"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                {
                                    loading 
                                    ? <button
                                            type="submit"
                                            className="px-6 py-2 flex bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                        >
                                            Updating...
                                            <div className="w-6 h-6 ms-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </button>
                                    : <button
                                            type="submit"
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                        >
                                            Update
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

}

export default UpdateProfileDialog;