import React, { useState } from 'react'
import Navbar from './shared/NavBar';
import Footer from './shared/Footer';
import { MdOutlineHomeWork } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdAddCall } from "react-icons/md";
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

function Profile() {
    useGetAppliedJobs();
    const { user } = useSelector(store => store.auth);
    const skills = user?.profile?.skills;
    const isResume = true;
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-8 bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <button className='bg-gray-200 text-purple-500 py-3 px-3 rounded cursor-pointer'>
                            <MdOutlineHomeWork />
                        </button>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button onClick={() => setOpen(true)} className='bg-gray-200 text-purple-500 py-3 px-3 rounded cursor-pointer'>
                        <FaRegEdit />
                    </button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <span><CiMail /></span>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span><MdAddCall /></span>
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div>
                    <h1 className='mb-2 font-medium'>Skills</h1>
                    {
                        skills.length != 0 ? skills.map((item, index) => (
                            <span key={index} className=" bg-purple-100 me-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {item}
                            </span>
                        ))
                        : (
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                N/A
                            </span>
                        )
                    }
                </div>

                <div className='grid w-full max-w-sm items-center my-5 gap-1.5'>
                    <span className='text-medium font-bold'>Resume</span>
                    {
                        isResume ? 
                        <a target='_blank' href={user?.profile?.resume} className='text-purple-800 w-full hover:underline'>{user?.profile?.resumeOriginalName}</a> :
                        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                            N/A
                        </span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-8 mt-5 mb-8 bg-white rounded-2xl'>
                <h1 className='text-medium font-bold mb-3'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <Footer />

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile