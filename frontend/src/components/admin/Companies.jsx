import React, { useState } from 'react';
import Navbar from '../shared/Navbar.jsx';
import Footer from '../shared/Footer.jsx';
import { FaSearch } from "react-icons/fa";
import CompaniesTable from './CompaniesTable.jsx';
import AddCompany from './AddCompany.jsx';
import useGetAllCompanies from '../../hooks/useGetAllCompanies.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice.js';

function Companies() {
    useGetAllCompanies();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input])

    return (
        <div>
            <Navbar />
                <div className='my-10 max-w-6xl mx-auto'>
                    <div className='flex items-center justify-between px-5'>
                        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4'>
                            <input type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Search by company name...'
                                className='outline-none border-none w-full py-3' />
                            {/* <button className='rounded-r-full text-white bg-purple-500 py-4 px-4 cursor-pointer'>
                                <FaSearch />
                            </button> */}
                        </div>
                        <button onClick={() => setOpen(true)} className='text-white bg-purple-500 py-2 px-3 rounded cursor-pointer hover:bg-purple-600'>
                            Add Company
                        </button>
                    </div>

                    <CompaniesTable />
                </div>
            <Footer />

            <AddCompany open={open} setOpen={setOpen} />
        </div>
    )
}

export default Companies