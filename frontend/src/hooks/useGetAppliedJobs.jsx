import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { APPLICATIONS_API_ENDPOINT } from '../utils/constant';
import { setAllAppliedJobs } from '../redux/jobSlice';

function useGetAppliedJobs() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATIONS_API_ENDPOINT}/get`, {
                    withCredentials: true
                })

                if(res?.data?.success){
                    console.log("Applied job fetched successfully!")
                    dispatch(setAllAppliedJobs(res?.data?.applications));
                }
            } catch (error) {
                console.log("FRONTEND ERROR: Fetch applied job. ", error)
            }
        }
        fetchAppliedJobs();
    }, [dispatch]);
}

export default useGetAppliedJobs