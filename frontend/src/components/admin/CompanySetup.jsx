import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { TiArrowBackOutline } from "react-icons/ti";
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { setSingleCompany } from '../../redux/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';

function CompanySetup() {
    const params = useParams();
    useGetCompanyById(params.id);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({
            ...input,
            file
        });
    }

    const updateCompanyHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file) formData.append("file", input.file);
        
        console.log("Company Updating...");
        try {
            const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if(res.data.success){
                console.log("Company data updated successfully!")
                dispatch(setSingleCompany(res.data.company));
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log("FRONTEND: Update company error", error)
        } finally{
            setLoading(false);
        }
    }
    
    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        });
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className='my-10 max-w-7xl mx-10 border border-gray-100 shadow px-10 py-10 rounded'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Setup</h2>
                    <button onClick={() => navigate("/admin/companies")} className='flex items-center bg-purple-500 rounded px-3 py-2 text-white hover:bg-purple-600 cursor-pointer'>
                        <TiArrowBackOutline />
                    </button>
                </div>
                {/* Form */}
                <form className="space-y-4 mt-4" onSubmit={updateCompanyHandler}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id='name'
                                value={input.name}
                                name='name'
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Description
                            </label>
                            <input
                                type="text"
                                id='description'
                                value={input.description}
                                name='description'
                                onChange={changeEventHandler}
                                placeholder="Enter description"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Website URL
                            </label>
                            <input
                                type="text"
                                id='website'
                                value={input.website}
                                name='website'
                                onChange={changeEventHandler}
                                placeholder="Enter website URL"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                id='location'
                                value={input.location}
                                name='location'
                                onChange={changeEventHandler}
                                placeholder="Enter company location"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company Logo
                            </label>
                            <input
                                type="file"
                                id='file'
                                name='file'
                                onChange={changeFileHandler}
                                placeholder="Upload company logo"
                                accept='image/*'
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center space-x-3 pt-4">
                        <button
                            type="button"
                            onClick=""
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        {
                            loading 
                            ? <button
                                    type="submit"
                                    className="px-6 py-2 flex bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    Updating...
                                    <div className="w-6 h-6 ms-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </button>
                            : <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    Update
                                </button>
                        }
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default CompanySetup