import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserTie } from "react-icons/fa";


function AdminJobsTable() {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if(!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
                || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div>
            <div className="overflow-x-auto my-8 mx-6">
                <h2 className='text-gray-500 font-medium text-xl mb-3'>List of your recent posted Job</h2>
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Company Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Title</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Job Type</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            filterJobs.length != 0 ? 
                            filterJobs.map((job, index) => (
                                <tr className="hover:bg-gray-50 transition" key={job?._id}>
                                    <td className="py-3 px-6 text-gray-800">{job?.company?.name}</td>
                                    <td className="py-3 px-6 text-gray-800">{job?.title}</td>
                                    <td className="py-3 px-6 text-gray-600">{job?.jobType}</td>
                                    <td className="py-3 px-6 text-gray-600">{job?.createdAt.split("T")[0]}</td>
                                    <td className="py-3 px-6">
                                        <button onClick={() => navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 text-purple-800 cursor-pointer hover:underline">
                                            <FaRegEdit /> Edit
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center gap-2 text-purple-800 cursor-pointer hover:underline">
                                            <FaUserTie /> Applicants
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr className="hover:bg-gray-50 transition">
                                <td className="py-3 px-6 text-gray-800 text-center" colSpan={4}>No Job Found!</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminJobsTable