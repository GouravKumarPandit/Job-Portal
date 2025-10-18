import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='mb-8 max-w-7xl mx-auto'>
            <h1 className='text-4xl font-bold text-center my-8'>
                <span className='text-4xl fnt-bold text-purple-500'>Latest & Top</span> Job Openings
            </h1>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-5'>
                {
                    allJobs.length <= 0  ?
                    <span className='text-4xl fnt-bold text-purple-500'>NO JOBS FOUND!</span> :
                    allJobs?.slice(0, 6).map((job, index) => 
                        <LatestJobCards job={job} key={job._id} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs;