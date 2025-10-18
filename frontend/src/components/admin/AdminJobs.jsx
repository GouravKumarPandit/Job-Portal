import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../redux/jobSlice';
import AddJob from './AddJob';
import { useNavigate } from 'react-router-dom';

function AdminJobs() {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input])

    return (
        <div>
            <Navbar />
                <div className='my-10 max-w-6xl mx-auto'>
                    <div className='flex items-center justify-between px-5'>
                        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4'>
                            <input type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Search by job name...'
                                className='outline-none border-none w-full py-3' />
                            {/* <button className='rounded-r-full text-white bg-purple-500 py-4 px-4 cursor-pointer'>
                                <FaSearch />
                            </button> */}
                        </div>
                        <button onClick={() => navigate("/admin/jobs/create")} className='text-white bg-purple-500 py-2 px-3 rounded cursor-pointer hover:bg-purple-600'>
                            Post New Job
                        </button>
                    </div>

                    <AdminJobsTable />
                </div>
            <Footer />
        </div>
    )
}

export default AdminJobs