import React, { useEffect } from 'react'
import Navbar from './shared/Navbar.jsx';
import Footer from './shared/Footer.jsx';
import HeroSection from './HeroSection.jsx';
import CategoryCarousel from './CategoryCarousel.jsx';
import LatestJobs from './LatestJobs.jsx';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(user?.role === "recruiter"){
            navigate("/admin/companies");
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='mx-10 mb-16'>
                <HeroSection />
                <CategoryCarousel />
                <LatestJobs />
            </div>
            <Footer />
        </div>
    )
}

export default Home