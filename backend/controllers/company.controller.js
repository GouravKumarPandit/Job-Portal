import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    console.log("Registering Company....");
    try {
        console.log("Inside Try block of Register Company");
        const {companyName, description, website, location, logo} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required!",
                success: false
            })
        }

        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "Company name is already present!",
                success: false
            })
        }

        console.log("Creating company....");
        company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company Registered Successfully!",
            success: true,
            company
        })
    } catch (error) {
        console.log("REGISTER COMPANY ERROR: ", error);

        return res.status(500).json({
            message: "REGISTER COMPANY SERVER ERROR!",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    console.log("Get Company....");
    try {
        console.log("Inside Try block of Get Company");
        const userId = req.id; // Logged In user ID 
        const companies = await Company.find({userId});

        if(!companies){
            return res.status(404).json({
                message: "Company Not Found!",
                success: false,
                companies
            });
        }

        return res.status(201).json({
            message: "Companies Found!",
            success: true,
            companies
        });
    } catch (error) {
        console.log("GET COMPANY ERROR: ", error);

        return res.status(500).json({
            message: "GET COMPANY SERVER ERROR!",
            success: false
        });
    }
}

export const getCompanyById = async (req, res) => {
    console.log("Get Company By ID....");
    try {
        console.log("Inside Try block of Get CompanyBy ID...");
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                message: "Company Not Found!",
                success: false,
                company
            });
        }

        return res.status(200).json({
            message: "Company Found!",
            success: true,
            company
        });
    } catch (error) {
        console.log("GET COMPANY BY ID ERROR: ", error);

        return res.status(500).json({
            message: "GET COMPANY BY ID SERVER ERROR!",
            success: false
        });
    }
}

export const updateCompany = async (req, res) => {
    console.log("Updating Company....");
    try {
        console.log("Inside Try block of Update Company");
        const {name, description, website, location } = req.body;
        const companyId = req.params.id;
        
        const companyFile = req.file;
        console.log("File: ", req.file)
        const fileUri = getDataUri(companyFile);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url

        const updateData = {name, description, website, location, logo};
        console.log("Updating company....", companyId);
        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true});

        if(!company){
            return res.status(404).json({
                message: "Company Not Found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company Updated Successfully!",
            success: true,
            company
        });
    } catch (error) {
        console.log("UPDATE COMPANY ERROR: ", error);

        return res.status(500).json({
            message: "UPDATE COMPANY SERVER ERROR!",
            success: false
        });
    }
}
