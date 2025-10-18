import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

const FilterCard = () => {
    const filterdata = [
        {
            filterType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            filterType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
        },
        {
            filterType: "Salary",
            array: ["0-40k", "40k-1lakh", "1lakh to 5lakh", "5lakh to 12lakh"]
        },        
    ];

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const changedHandler = (event) => {
        setSelectedValue(event.target.value);
        dispatch(setSearchedQuery(selectedValue));
    }

    return (
        <div className='w-full bg-white p-3 rounded-medium'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterdata.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item, ind) => {
                                const itemId = `id${index}-${ind}`;
                                return (
                                    <div className='flex items-center space-x-2 my-2 ms-4'>
                                        <input
                                            onChange={changedHandler}
                                            id={itemId}
                                            type="radio"
                                            name="level"
                                            value={item}
                                            checked={selectedValue === item}
                                            className="accent-purple-600 cursor-pointer"
                                        />
                                        <span className="text-gray-800">{item}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard;