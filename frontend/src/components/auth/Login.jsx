import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import axios from "axios";
import SuccessToast from '../shared/SuccessToast';
import FailureToast from '../shared/FailureToast';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';

function Login() {
	const navigate = useNavigate();
	const [toast, setToast] = useState("");
	const [toastMessage, setToastMessage] = useState("");
	const dispatch = useDispatch();
	const { loading } = useSelector(store => store.auth);
	const [input, setInput] = useState({
		email: "",
		password: "",
		role: ""
	});

	const changeEventHandler = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log("FRONTEND LOGIN: Before sending the data >> ", input)
		try {
			dispatch(setLoading(true));
			const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
				headers: {
					"Content-Type": "application/json"
				},
				withCredentials: true
			});
			if(res.data.success) {
				dispatch(setUser(res.data.user));
				setToast("true");
				navigate("/");
			} else setToast("false");
			setToastMessage(res.data.message);
		} catch (error) {
			setToast("false");
			setToastMessage(error.response.data.message);
			console.log("FRONTEND: LOGIN ERROR: ", error);
		} finally{
			dispatch(setLoading(false));
		}
	}

	return (
		<div className="bg-purple-100">
			<Navbar />
			<div className="font-sans antialiased bg-purple-100">
				<div className="w-full bg-grey-lightest mb-10">
					<form onSubmit={submitHandler}>
						<div className="container mx-auto py-10">
							<div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow ">
								<div className="py-4 px-8 text-purple-500 text-center font-extrabold text-xl border-b border-grey-lighter">
									LOGIN
								</div>
								{
									(toast == "true") && <SuccessToast toastMessage={toastMessage} />
								}
								{
									(toast == "false") && <FailureToast toastMessage={toastMessage} />
								}
								<div className="py-4 px-8">
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
											placeholder="Your email address"
											value={input.email}
											onChange={changeEventHandler}
											required
										/>
									</div>
									<div className="mb-4">
										<label
											className="block text-grey-darker text-sm font-bold mb-2"
											htmlFor="password"
										>
											Password
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
											checked={input.role === "student"}
											onChange={changeEventHandler}
										/> Student

										<input
											className="py-2 px-3 ms-3 me-1 text-grey-darker"
											id="recruiter"
											type="radio"
											value="recruiter"
											name='role'
											checked={input.role === "recruiter"}
											onChange={changeEventHandler}
										/> Recruiter
									</div>
									<div className="flex items-center justify-center mt-4">
										{
											loading 
											? <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full flex'>
													Login... 
													<div className="w-6 h-6 ms-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
												</button>
											: <button
												className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full"
												type="submit"
												onClick="">Login
											</button>
										}
									</div>
									<p className="text-center my-4">
										Don't have an account <Link className="text-purple-500 font-bold py-2 px-1 rounded-full" to="/register">Sign Up</Link>
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Login