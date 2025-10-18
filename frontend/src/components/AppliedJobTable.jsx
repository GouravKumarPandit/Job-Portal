import React from 'react'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Job Role</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Company</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            allAppliedJobs.length !=0 ? 
                            allAppliedJobs.map((appliedJob, index) => (
                                <tr className="hover:bg-gray-50 transition" key={appliedJob?._id}>
                                    <td className="py-3 px-6 text-gray-800">{appliedJob?.createdAt?.split("T")[0]}</td>
                                    <td className="py-3 px-6 text-gray-600">{appliedJob?.job?.title}</td>
                                    <td className="py-3 px-6 text-gray-600">{appliedJob?.job?.company?.name}</td>
                                    <td className="py-3 px-6">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize
                                            ${
                                            appliedJob?.status === "Pending"
                                                ? "bg-purple-500 text-white"
                                                : appliedJob?.status === "accepted"
                                                ? "bg-green-500 text-white"
                                                : appliedJob?.status === "rejected"
                                                ? "bg-red-500 text-white"
                                                : appliedJob?.status === "active"
                                                ? "bg-blue-500 text-white"
                                                : appliedJob?.status === "inactive"
                                                ? "bg-gray-400 text-white"
                                                : "bg-gray-200 text-gray-700"
                                            }`}>
                                            {appliedJob?.status.charAt(0).toUpperCase() + appliedJob?.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            )) :
                            <tr className="hover:bg-gray-50 transition">
                                <td className="py-3 px-6 text-gray-800 text-center" colSpan={4}>You haven't Applied any job yet!</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppliedJobTable