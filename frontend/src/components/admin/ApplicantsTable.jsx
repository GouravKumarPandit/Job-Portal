import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATIONS_API_ENDPOINT } from '../../utils/constant';
import { setAllApplicants } from '../../redux/applicationSlice';

function ApplicantsTable() {
    const applicationStatus = ["Accepted", "Rejected"];
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATIONS_API_ENDPOINT}/status/${id}/update`, {status}, {
                withCredentials: true
            })

            if(res?.data?.success){
                console.log("Status changed successfully!");
                dispatch(setAllApplicants(res?.data?.allApplicants));
            }
        } catch (error) {
            console.log("FRONTEND ERROR: Job application status change. ", error)
        }
    }

    return (
        <div>
            <div className="overflow-x-auto my-8 mx-6">
                <h2 className='text-gray-500 font-medium text-xl mb-3'>List of your recent applied users</h2>
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Full Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Email</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Contact</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Resume</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Status</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            applicants?.application?.length != 0 ? 
                            applicants.application.map((item, index) => (
                                <tr className="hover:bg-gray-50 transition" key={item?._id}>
                                    <td className="py-3 px-6 text-gray-800">{item?.applicant?.fullname}</td>
                                    <td className="py-3 px-6 text-gray-800">{item?.applicant?.email}</td>
                                    <td className="py-3 px-6 text-gray-600">{item?.applicant?.phoneNumber}</td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {
                                            item?.applicant?.profile?.resumeOriginalName ?
                                            <a href={item?.applicant?.profile?.resumeOriginalName} target="_blank" className='text-blue-600 cursor-pointer'>Resume</a> :
                                            "N/A"
                                        }
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">{item?.applicant?.createdAt.split("T")[0]}</td>
                                    <td className="py-3 px-6 ">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize
                                            ${
                                            item?.status === "Pending"
                                                ? "bg-purple-500 text-white"
                                                : item?.status === "accepted"
                                                ? "bg-green-500 text-white"
                                                : item?.status === "rejected"
                                                ? "bg-red-500 text-white"
                                                : item?.status === "active"
                                                ? "bg-blue-500 text-white"
                                                : item?.status === "inactive"
                                                ? "bg-gray-400 text-white"
                                                : "bg-gray-200 text-gray-700"
                                            }`}>
                                            {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="relative inline-block text-left group">
                                            {/* Three Dots Button */}
                                            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-gray-600"
                                                >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                                />
                                                </svg>
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div
                                                className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg
                                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                                        transition-all duration-200 z-10"
                                            >
                                                {
                                                    applicationStatus.map((status, index) => (
                                                    <button onClick={() => statusHandler(status, item._id)} className="block w-full text-left px-3 py-1.5 text-bold hover:bg-purple-50 rounded-t-md">
                                                        {status}
                                                    </button>))
                                                }
                                            </div>
                                        </div>
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

export default ApplicantsTable;