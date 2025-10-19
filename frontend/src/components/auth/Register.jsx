import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { USER_API_ENDPOINT } from '../../utils/constant';
import axios from "axios";
import SuccessToast from '../shared/SuccessToast';
import FailureToast from '../shared/FailureToast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';

function Register() {
	const [toast, setToast] = useState("");
	const [toastMessage, setToastMessage] = useState("");
	const [input, setInput] = useState({
		fullname: "",
		email: "",
		password: "",
		phoneNumber: "",
		role: "",
		file: ""
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading } = useSelector(store => store.auth);

	const changeEventHandler = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	}

	const changeFileHandler = (e) => {
		setInput({
			...input,
			file: e.target.files?.[0]
		});
	}

	const submitHandler = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append("fullname", input.fullname);
		formData.append("email", input.email);
		formData.append("password", input.password);
		formData.append("phoneNumber", input.phoneNumber);
		formData.append("role", input.role);
		if(input.file) formData.append("file", input.file);
		// console.log("FRONTEND SIGNUP: Before sending the data >> ", [...formData.entries()]);
		try {
			dispatch(setLoading(true));
			const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				},
				withCredentials: true
			});
			
			if(res.data.success) {
				setToast("true");
				navigate("/login");
			} else setToast("false");
			setToastMessage(res.data.message);
		} catch (error) {
			setToast("false");
			setToastMessage(error.response.data.message);
			console.log("FRONTEND: REGISTER ERROR: ", error);
		} finally{
			dispatch(setLoading(false));
		}
	}

	return (
		<>
			<Navbar />
			<div className="font-sans antialiased bg-purple-100">
				<div className="w-full bg-grey-lightest" >
					<div className="container mx-auto py-8">
						<div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow ">
							<div className="py-4 px-8 text-purple-500 text-center font-extrabold text-xl border-b border-grey-lighter">
								REGISTER
							</div>
							{
								(toast == "true") && <SuccessToast toastMessage={toastMessage} />
							}
							{
								(toast == "false") && <FailureToast toastMessage={toastMessage} />
							}
							<form onSubmit={submitHandler}>
								<div className="py-4 px-8">
									<div className="flex mb-4 mt-4">
										<div className="w-full mr-1">
											<label
												className="block text-grey-darker text-sm font-bold mb-2"
												htmlFor="first_name"
											>
												Full Name
											</label>
											<input
												className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
												id="fullname"
												value={input.fullname}
												name='fullname'
												type="text"
												placeholder="Full Name"
												onChange={changeEventHandler}
												required
											/>
										</div>
									</div>
									<div className="mb-4">
										<label
											className="block text-grey-darker text-sm font-bold mb-2"
											htmlFor="email"
										>
											Email Address
										</label>
										<input
											className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
											id="email"
											type="email"
											name='email'
											placeholder="Enter Your Email Address"
											value={input.email}
											onChange={changeEventHandler}
											required
										/>
									</div>
									<div className="flex mb-4 mt-4">
										<div className="w-full mr-1">
											<label
												className="block text-grey-darker text-sm font-bold mb-2"
												htmlFor="first_name"
											>
												Phone Number
											</label>
											<input
												className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
												id="phoneNumber"
												name='phoneNumber'
												type="text"
												placeholder="Phone Number"
												value={input.phoneNumber}
												onChange={changeEventHandler}
												required
											/>
										</div>
									</div>
									
									<div className="mb-4">
										<label
											className="block text-grey-darker text-sm font-bold mb-2"
											htmlFor="password">Password
										</label>
										<input
											className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
											id="password"
											type="password"
											name='password'
											placeholder="Your secure password"
											value={input.password}
											onChange={changeEventHandler}
											required
										/>
										<p className="text-grey text-xs mt-1">At least 6 characters</p>
									</div>
									<div className="mb-4">
										<label
											className="block text-grey-darker text-sm font-bold mb-2"
											htmlFor="password">Role
										</label>
										<input
											className="py-2 px-3 me-1 text-grey-darker"
											id="student"
											type="radio"
											name='role'
											value="student"
											checked={input.role === 'student'}
											onChange={changeEventHandler}
										/> Student

										<input
											className="py-2 px-3 ms-3 me-1 text-grey-darker"
											id="recruiter"
											type="radio"
											value="recruiter"
											name='role'
											checked={input.role === 'recruiter'}
											onChange={changeEventHandler}
										/> Recruiter
									</div>
									<div className="mb-4">
										<label
											className="block text-grey-darker text-sm font-bold mb-2"
											htmlFor="password">Profile Photo
										</label>
										<input
											className="appearance-none border rounded w-full py-2 px-3 text-grey-darker cursor-pointer"
											id="profilePhoto"
											type="file"
											name='file'
											placeholder="Upload Your Photo"
											onChange={changeFileHandler}
											accept='image/*'
										/>
									</div>
									<div className="flex items-center justify-center mt-5">
										{
											loading 
											? <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full flex'>
													Signup... 
													<div className="w-6 h-6 ms-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
												</button>
											: <button
												className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full"
												type="submit"
												onClick="">Sign Up
											</button>
										}
									</div>
								</div>
							</form>
							<p className="text-center pb-6">
								Already have an account <Link className="text-purple-500 font-bold py-2 px-1 rounded-full" to="/login">Login</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Register