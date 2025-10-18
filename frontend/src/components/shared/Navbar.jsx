import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { setUser } from '../../redux/authSlice';

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const [toast, setToast] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        console.log("FRONTEND: LOGOUTING....")
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true
            });
            if(res.data.success) {
				setToast("true");
                dispatch(setUser(null));
				navigate("/");
			} else setToast("false");
			setToastMessage(res.data.message);
        } catch (error) {
            setToast("false");
			setToastMessage(error.response.data.message);
            console.log("FRONTEND: LOGOUT ERROR: ", error);
        }
    }

    return (
        <div>
            <header>
                <nav className="bg-black flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700">
                    <div className='md:p-4 py-2 block font-extrabold text-purple-400 '>
                        <Link to={'/'} className='flex items-center gap-2'>NAUKRI <FaSearch /> SEARCH</Link>
                    </div>
                    <div className="hidden w-full md:flex md:items-end md:w-auto" id="menu">
                        {
                            user?.role === "recruiter" ? 
                            (<ul className="pt-4 text-base mb-2 text-white md:flex md:justify-between  md:pt-0">
                                <li className='me-8 text-purple-400 hover:underline'>
                                    <Link to='/admin/companies'>Companies</Link>
                                </li>
                                <li className='me-8 text-purple-400 hover:underline'>
                                    <Link to='/admin/jobs'>Jobs</Link>
                                </li>
                            </ul>)
                            : (<ul className="pt-4 text-base mb-2 text-white md:flex md:justify-between md:pt-0">
                                <li className='me-8 text-purple-400 hover:underline'>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li className='me-8 text-purple-400 hover:underline'>
                                    <Link to='/jobs'>Jobs</Link>
                                </li>
                                <li className='me-8 text-purple-400 hover:underline'>
                                    <Link to='/browse'>Browse</Link>
                                </li>
                            </ul>)
                        }
                        {
                            !user ? 
                            (
                                <div className="pt-4 text-base text-white md:flex md:justify-between  md:pt-0">
                                    <button className='me-3 bg-white text-purple-800 py-1 px-5 rounded hover:bg-purple-600 hover:text-white cursor-pointer '>
                                        <Link to={'/login'}>Login</Link>
                                    </button>
                                    <button className='me-5 bg-purple-600 py-1 px-5 rounded hover:bg-purple-700 cursor-pointer '>
                                        <Link to={'/register'}>Signup</Link>
                                    </button>
                                </div>
                            ) : 
                            (
                                <div className="relative inline-block group me-24">
                                    {/* Profile Icon */}
                                    <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                                        <img
                                            src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : 'https://randomuser.me/api/portraits/men/32.jpg'}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Popover */}
                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-56 p-4 bg-white rounded-xl shadow-lg border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : 'https://randomuser.me/api/portraits/men/32.jpg'}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                                                <p className="text-sm text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-sm text-gray-600">
                                            {/* <p>Role: Product Designer</p> */}
                                            {/* <p>Location: San Francisco</p> */}
                                            <div className='mt-3'>
                                                {
                                                    user?.role === "student" && (
                                                        <p className="py-1 fw-bolder">
                                                            <Link to='/profile' className="flex items-center gap-2 text-purple-800 cursor-pointer hover:underline">
                                                                <CgProfile /> View Profile
                                                            </Link>
                                                        </p>
                                                    )
                                                }

                                                <p className="py-1">
                                                    <button onClick={logoutHandler} className="flex items-center gap-2 text-purple-800 cursor-pointer hover:underline">
                                                        <LuLogOut /> Logout
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar