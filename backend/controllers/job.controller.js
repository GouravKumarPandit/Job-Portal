import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    console.log("Posting Job....");
    try {
        console.log("Inside Try block of Posting Job");
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId){
            return res.status(400).json({
                message: "Required Field Missing!",
                success: false
            });
        }

        const job = await Job.create({
            title, 
            description, 
            requirements: requirements.split(","), 
            salary: Number(salary), 
            experienceLevel: experienceLevel, 
            location, 
            jobType, 
            position, 
            company: companyId,
            created_by: userId
        })

        return res.status(201).json({
            message: "New Job Created Successfully!",
            success: true,
            job
        });
    } catch (error) {
        console.log("POSTING JOB ERROR: ", error);

        return res.status(500).json({
            message: "POSTING JOB SERVER ERROR!",
            success: false
        });
    }
}

// FOR STUDENTS
export const getAllJob = async (req, res) => {
    console.log("Get All Job....");
    try {
        console.log("Inside Try block of Get All Job");
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});

        if(!jobs){
            return res.status(404).json({
                message: "Jobs Not Found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs Found!",
            success: true,
            jobs
        });
    } catch (error) {
        console.log("GET ALL JOB ERROR: ", error);

        return res.status(500).json({
            message: "GET ALL JOB SERVER ERROR!",
            success: false
        });
    }
}

// FOR STUDENTS
export const getJobById = async (req, res) => {
    console.log("Get Job By ID....");
    try {
        console.log("Inside Try block of Get Job By ID...");
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application"
        }).populate({
            path: "created_by"
        });

        if(!job){
            return res.status(404).json({
                message: "Job Not Found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job Found!",
            success: true,
            job
        });
    } catch (error) {
        console.log("GET JOB BY ID ERROR: ", error);

        return res.status(500).json({
            message: "GET JOB BY ID SERVER ERROR!",
            success: false
        });
    }
}

// FOR ADMIN OR RECRUITER
export const getAdminJobs = async (req, res) => {
    console.log("Getting Admin Job....");
    try {
        console.log("Inside Try block of Getting Admin Job");
        const adminId = req.id;
        const jobs = await Job.find({
            created_by: adminId
        }).populate({
            path: "created_by"
        }).populate({
            path: "company"
        }).sort({createdAt: -1});

        if(!jobs){
            return res.status(404).json({
                message: "Jobs Not Found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs Found!",
            success: true,
            jobs
        });
    } catch (error) {
        console.log("GET ADMIN JOB ERROR: ", error);

        return res.status(500).json({
            message: "GET ADMIN JOB SERVER ERROR!",
            success: false
        });
    }
}
