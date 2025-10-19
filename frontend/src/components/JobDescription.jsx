import React from 'react'
import Navbar from './shared/NavBar'
import Footer from './shared/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import { APPLICATIONS_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant';
import axios from 'axios';
import { useState } from 'react';
import SuccessToast from './shared/SuccessToast';
import FailureToast from './shared/FailureToast';

function JobDescription() {
    const [toast, setToast] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const applied = singleJob?.application?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(applied);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
                    withCredentials: true
                })

                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.application.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log("FRONTEND: FETCHING SINGLE JOBS ERROR", error)
            }
        }

        fetchSingleJob();
    }, [jobId, dispatch, user?._id])

    const handleApplyJob = async () => {
        console.log("Handle Apply Job....")
        try {
            if(!user){
                console.log("FRONTEND ERROR: User not logged in.");
                navigate("/login");
            }

            const res = await axios.get(`${APPLICATIONS_API_ENDPOINT}/apply/${jobId}`, {
                withCredentials: true
            });
            if(res.data.success){
                setToast("true");
                setToastMessage(res.data.message);
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    application: [
                        ...singleJob.application, 
                        {applicant: user?._id}
                    ]
                }
                dispatch(setSingleJob(updatedSingleJob));
                console.log("Job applied successfully!");
            }
        } catch (error) {
            console.log("FRONTEND: FETCHING SINGLE JOBS ERROR", error)
            setToast("false");
            setToastMessage(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-8 my-10 shadow shadow-xl px-8 py-6 border border-gray-100'>
                <div className="flex items-center justify-between">
                    <div>
                        {
                            (toast == "true") && <SuccessToast toastMessage={toastMessage} />
                        }
                        {
                            (toast == "false") && <FailureToast toastMessage={toastMessage} />
                        }
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {singleJob?.position} Position
                            </span>
                            <span className="bg-purple-100 ms-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {singleJob?.jobType}
                            </span>
                            <span className="bg-purple-100 ms-2 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {singleJob?.salary} LPA
                            </span>
                        </div>
                    </div>
                    
                    <div>
                        <button
                            onClick={isApplied ? null : handleApplyJob}
                            className={`py-1 px-3 rounded border
                            ${isApplied ? 'bg-gray-500 flex border-white text-white cursor-not-allowed' 
                            : 'bg-white border cursor-pointer flex border-purple-500 text-purple-500 hover:bg-purple-600 hover:text-white hover:bg-purple-700'}`}>
                            {
                                isApplied ? 
                                "Applied" : "Apply Now"
                            }
                        </button>
                    </div>
                </div>
                
                <h1 className='border-b-2 my-5 py-4 border-b-gray-300 font-medium'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-400'>{singleJob?.title}</span></h1>
                    {/* <h1 className='font-bold my-1'>Company: <span className='pl-4 font-normal text-gray-400'>{singleJob?.company?.name}</span></h1> */}
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-400'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-400'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-400'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-400'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-400'>{singleJob?.application?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-400'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription