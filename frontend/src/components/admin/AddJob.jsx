import axios from 'axios';
import React, { useState } from 'react'
import { JOB_API_ENDPOINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSingleCompany } from '../../redux/companySlice';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

function AddJob() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0,
        companyId: ""
    });
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === e.target.value);
        setInput({...input, companyId: selectedCompany._id})
    }

    const addJobHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Company registering.....", input);
        try {
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if(res?.data?.success){
                // dispatch(setSingleCompany(res.data.job));
                setLoading(false);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log("FRONTEND: Add Job error", error);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl my-8 mx-8 rounded border border-gray-200 shadow px-8 py-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Job</h2>
                {/* Form */}
                <form className="space-y-4" onSubmit={addJobHandler}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Title
                            </label>
                            <input
                                type="text"
                                id='title'
                                value={input.title}
                                name='title'
                                onChange={changeEventHandler}
                                placeholder="Enter Job Title"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                id='description'
                                value={input.description}
                                name='description'
                                onChange={changeEventHandler}
                                placeholder="Enter Description"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Requirements
                            </label>
                            <input
                                type="text"
                                id='requirements'
                                value={input.requirements}
                                name='requirements'
                                onChange={changeEventHandler}
                                placeholder="Enter Requirements"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Salary
                            </label>
                            <input
                                type="text"
                                id='salary'
                                value={input.salary}
                                name='salary'
                                onChange={changeEventHandler}
                                placeholder="Enter Salary"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                id='location'
                                value={input.location}
                                name='location'
                                onChange={changeEventHandler}
                                placeholder="Enter Location"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Type
                            </label>
                            <input
                                type="text"
                                id='jobType'
                                value={input.jobType}
                                name='jobType'
                                onChange={changeEventHandler}
                                placeholder="Enter Job Type"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Experience Level
                            </label>
                            <input
                                type="text"
                                id='experienceLevel'
                                value={input.experienceLevel}
                                name='experienceLevel'
                                onChange={changeEventHandler}
                                placeholder="Enter Experience Level"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Position
                            </label>
                            <input
                                type="text"
                                id='position'
                                value={input.position}
                                name='position'
                                onChange={changeEventHandler}
                                placeholder="Enter Position"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company
                            </label>
                            {
                                companies.length >= 0 && (
                                    <select
                                        id="companyId"
                                        name="companyId"
                                        onChange={selectChangeHandler}
                                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                        required
                                    >
                                        <option value="">Select a Company</option>
                                        {
                                            companies.map((company, index) => (
                                                <option value={company?.name.toLowerCase()} key={company._id}>{company.name}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-center space-x-3 pt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        {
                            loading
                            ? <button
                                    className="px-6 py-2 flex bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    Adding...
                                    <div className="w-6 h-6 ms-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </button>
                            : <button

                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    Add
                                </button>
                        }
                    </div>
                    {
                        companies.length === 0 && <p className='text-x5 text-red-600 font-bold text-center my-3'>Please select a Company first to create Job</p>
                    }
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default AddJob;