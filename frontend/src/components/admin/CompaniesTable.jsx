import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CompaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText) return true;
            return company?.name?.toLowerCase()
                .includes(searchCompanyByText.toLowerCase());
        })

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div>
            <div className="overflow-x-auto my-8 mx-6">
                <h2 className='text-gray-500 font-medium text-xl mb-3'>List of your recent posted Company</h2>
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Logo</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            filterCompany.length != 0 ? 
                            filterCompany.map((company, index) => (
                                <tr className="hover:bg-gray-50 transition" key={company?._id}>
                                    <td className="py-3 px-6 text-gray-800">
                                        <img
                                            src={company?.logo ? company?.logo : 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'}
                                            alt="Company Logo"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">{company?.name}</td>
                                    <td className="py-3 px-6 text-gray-600">{company?.createdAt.split("T")[0]}</td>
                                    <td className="py-3 px-6">
                                        <button onClick={() => navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2 text-purple-800 cursor-pointer hover:underline">
                                            <FaRegEdit /> Edit
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr className="hover:bg-gray-50 transition">
                                <td className="py-3 px-6 text-gray-800 text-center" colSpan={4}>No Company Found!</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompaniesTable