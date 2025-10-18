import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATIONS_API_ENDPOINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';

function Applicants() {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATIONS_API_ENDPOINT}/${params.id}/applicants`, {
                    withCredentials: true
                });

                if(res.data.success){
                    dispatch(setAllApplicants(res?.data?.job));
                }
            } catch (error) {
                console.log("FRONTEND ERROR: Fetching applicants of a job. ", error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl my-10 mx-auto'>
                <h1 className='font-bold text-xl'>Applicants: {applicants?.application?.length}</h1>
                <ApplicantsTable />
            </div>
            <Footer />
        </div>
    )
}

export default Applicants;