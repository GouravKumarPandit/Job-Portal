import React, { useEffect } from 'react';
import Navbar from './shared/Navbar.jsx';
import Footer from './shared/Footer.jsx';
import Job from './Job.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-8 my-10'>
                <h1 className='font-bold text-xl mb-8'>Searched Result ({allJobs?.length})</h1>
                <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        allJobs.map((job, index) => {
                            return (
                                <Job key={job?._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Browse;