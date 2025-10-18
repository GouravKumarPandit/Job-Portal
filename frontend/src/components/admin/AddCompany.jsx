import axios from 'axios';
import React, { useState } from 'react'
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSingleCompany } from '../../redux/companySlice';

function AddCompany({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addCompanyHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Company registering.....");
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {companyName}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                setOpen(false);
                setLoading(false);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log("FRONTEND: Add company error", error)
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="">
            {/* Modal */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>

                        {/* Header */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Company</h2>
                        {/* Form */}
                        <form className="space-y-4" onSubmit={addCompanyHandler}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id='name'
                                    value={companyName}
                                    name='name'
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Enter company name"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
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
                                            Adding...
                                            <div className="w-6 h-6 ms-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </button>
                                    : <button
                                            type="submit"
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                        >
                                            Add
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddCompany;