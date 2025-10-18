import React from 'react'
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();

    return (
        <div onClick={(() => navigate(`/description/${job?._id}`))} className='p-5 rounded-md shadow-xl border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {job?.position} Position
                </span>
                <span className="bg-purple-100 ms-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {job?.jobType}
                </span>
                <span className="bg-purple-100 ms-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {job?.salary} LPA
                </span>
            </div>
        </div>
    )
}

export default LatestJobCards;