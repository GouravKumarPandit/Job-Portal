import axios from 'axios';
import { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

function useGetCompanyById(companyId) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                    withCredentials: true
                })

                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log("FRONTEND: FETCHING COMPANY BY ID ERROR", error)
            }
        }

        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById