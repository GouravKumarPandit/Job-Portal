import axios from 'axios';
import { useEffect } from 'react';
import { COMPANY_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setCompanies } from '../redux/companySlice';

function useGetAllCompanies() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
                    withCredentials: true
                })

                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log("FRONTEND: FETCHING ALL COMPANY ERROR", error)
            }
        }

        fetchCompanies();
    }, [])
}

export default useGetAllCompanies