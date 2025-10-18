import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center mt-8 mb-10'>
            <span className='mx-auto font-medium px-4 py-2 rounded-full bg-gray-100 text-red-500'>No. 1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold mt-8'>Search, Apply & <br /> Get Your <span className='text-purple-500'>Dream Jobs</span></h1>
            <p className='mt-8'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore placeat architecto possimus perferendis facere totam.</p>
            <div className='flex w-[40%] mt-8 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Find Your Dream Jobs...'
                    className='outline-none border-none w-full py-3' />
                <button onClick={searchJobHandler} className='rounded-r-full text-white bg-purple-500 py-4 px-4 cursor-pointer'>
                    <FaSearch />
                </button>
            </div>
        </div>
    )
}

export default HeroSection;