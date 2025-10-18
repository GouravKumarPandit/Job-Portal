import React from 'react';
import { CiBookmark } from "react-icons/ci";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
    const navigate = useNavigate();
    const jobId = job?._id;
    const daysAgo = (mongoDbTime) => {
        const createdAt = new Date(mongoDbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;

        return Math.floor(timeDifference/ (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-small text-gray-600'>
                    {daysAgo(job?.createdAt)} days ago
                </p>
                <button className='bg-white border border-purple-500 text-purple-500 hover:bg-purple-200 hover:text-white py-2 px-2 rounded hover:bg-purple-700 cursor-pointer'>
                    <CiBookmark />
                </button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <button className='bg-gray-200 text-purple-500 py-3 px-3 rounded cursor-pointer'>
                    {
                        job?.company?.logo ? 
                        <img src={job?.company?.logo} alt="Company Logo" srcset="" /> :
                        <MdOutlineHomeWork />
                    }
                </button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='flex'>
                        <span className='mt-1 me-1'><CiGlobe /></span> {job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-small text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full text-nowrap">
                    {job?.position} Position
                </span>
                <span className="bg-purple-100 ms-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full text-nowrap">
                    {job?.jobType}
                </span>
                <span className="bg-purple-100 ms-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full text-nowrap">
                    {job?.salary} LPA
                </span>
            </div>

            <div className='flex items-center gap-4 mt-5'>
                <button onClick={() => navigate(`/description/${jobId}`) } className='bg-white border flex border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-2 rounded hover:bg-purple-700 cursor-pointer'>
                    Details <span className='mt-1.5 ms-2'><FaEye /></span>
                </button>
                <button className='bg-purple-500 border border-purple-500 text-white hover:bg-white hover:text-purple-500 py-1 px-2 rounded hover:bg-purple-700 cursor-pointer'>
                    Save For Later
                </button>
            </div>
        </div>
    )
}

export default Job;