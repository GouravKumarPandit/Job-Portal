import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

export default function CategoryCarousel() {
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (!current) return;
        current.scrollBy({
            left: direction === "left" ? -200 : 200,
            behavior: "smooth",
        });
    };

    const categories = [
        "Technology",
        "Backend Developer",
        "Frontend Developer",
        "MERN",
        "React js",
        "Node js",
        "Express js",
        "Next js",
        "Laravel",
        "PHP",
        "Javascript",
        "HTML",
        "CSS",
        "Java Developer",
    ];

    const searchJobHandler = (cat) => {
        dispatch(setSearchedQuery(cat));
        navigate("/browse");
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto py-6 mb-5">
            {/* Left Button */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
            >
                <FaChevronLeft />
            </button>

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 scroll-smooth px-10 no-scrollbar"
            >
                {categories.map((cat) => (
                    <div 
                        onClick={() => searchJobHandler(cat)}
                        key={cat}
                        className="flex-shrink-0 px-6 py-3 bg-purple-100 text-purple-700 rounded-full cursor-pointer hover:bg-purple-200 transition text-center min-w-[120px]"
                    >
                        {cat}
                    </div>
                ))}
            </div> 

            {/* Right Button */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
            >
                <FaChevronRight />
            </button>
        </div>
    );
}
