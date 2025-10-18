import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    console.log("Apply Job....");
    try {
        console.log("Inside Try block of Apply Job");
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(404).json({
                message: "Job ID is required!",
                success: false
            });
        }

        // Check if the user has already applied to this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        })
        if(existingApplication){
            return res.status(404).json({
                message: "You have already applied for this job!",
                success: false
            });
        }

        // Check if the job exists or not
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found!",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.application.push(newApplication._id)
        await job.save();

        return res.status(201).json({
            message: "Job Applied Successfully!",
            success: true
        });
    } catch (error) {
        console.log("APPLY JOB ERROR: ", error);

        return res.status(500).json({
            message: "APPLY JOB SERVER ERROR!",
            success: false
        });
    }
}

// APPLIED JOB OF A USER 
export const getAppliedJobs = async (req, res) => {
    console.log("Get Applied Job....");
    try {
        console.log("Inside Try block of Get Applied Job");
        const userId = req.id;
        const applications = await Application.find({applicant: userId})
            .populate({
                path: "job",
                options: {sort: {createdAt: -1}},
                populate: {
                    path: "company",
                    options: {sort: {createdAt: -1}},
                }
            })
            .sort({createdAt: -1});

        if(!applications){
            return res.status(404).json({
                message: "You have not applied any job yet!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applied Jobs!",
            success: true,
            applications
        });
    } catch (error) {
        console.log("GET APPLIED JOB ERROR: ", error);

        return res.status(500).json({
            message: "GET APPLIED JOB SERVER ERROR!",
            success: false
        });
    }
}

// GETTING ALL THE APPLICANTS OF A JOB
export const getApplicants = async (req, res) => {
    console.log("Get Applicants....");
    try {
        console.log("Inside Try block of Get Applicants...");
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application", // Application Table
            options: {sort: {createdAt: -1}},
            populate: {
                path: "applicant" // User Table
            }
        });

        if(!job){
            return res.status(404).json({
                message: "Job Not Found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job's Applicants Found!",
            success: true,
            job
        });
    } catch (error) {
        console.log("GET JOB APPLICANTS ERROR: ", error);

        return res.status(500).json({
            message: "GET JOB APPLICANTS SERVER ERROR!",
            success: false
        });
    }
}

// FOR ADMIN OR RECRUITER
export const updateStatus = async (req, res) => {
    console.log("Update Status Job....");
    try {
        console.log("Inside Try block of Update Status Job");
        const {status} = req.body;
        const userId = req.id;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Please select status!",
                success: false
            });
        }

        const application = await Application.findOne({
            _id: applicationId
        })
        if(!application){
            return res.status(404).json({
                message: "Application not found!",
                success: false
            });
        }

        // Updating the Application status 
        application.status = status.toLowerCase();
        await application.save();

        const jobId = application.job;
        const allApplicants = await Job.findById(jobId).populate({
            path: "application", // Application Table
            options: {sort: {createdAt: -1}},
            populate: {
                path: "applicant" // User Table
            }
        });
        
        return res.status(200).json({
            message: "Application status changed successfully!",
            success: true,
            allApplicants
        });
    } catch (error) {
        console.log("APPLICATION UPDATE STATUS SERVER ERROR: ", error);

        return res.status(500).json({
            message: "APPLICATION UPDATE STATUS SERVER ERROR!",
            success: false
        });
    }
}
