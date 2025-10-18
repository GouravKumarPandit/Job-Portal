import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar.jsx';
import Footer from './shared/Footer.jsx';
import FilterCard from './FilterCard.jsx';
import Job from './Job.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchedQuery){
            const filteredJobs = allJobs.filter((job) => {
                return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                    job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                    job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
            });
            setFilterJobs(filteredJobs);
        } else{
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery])

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-10 mb-10'>
                <div className='flex gap-5 '>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? 
                        <span className='text-4xl fnt-bold text-purple-500'>Job Not Found</span> :
                        (<div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                {
                                    filterJobs.map((job, index) => (
                                        <div>
                                            <Job key={job?._id} job={job} />
                                        </div>
                                    ))
                                }   
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs;