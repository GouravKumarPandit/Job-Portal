import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER 
export const registerUser = async (req, res) => {
    console.log("Registering User....");
    try {
        console.log("Inside Try block of Register");
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Required field is missing!",
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already present with this email!",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword, 
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(201).json({
            message: "Account Created Successfully!",
            success: true
        });
    } catch (error) {
        console.log("REGISTER ERROR: ", error);

        return res.status(500).json({
            message: "REGISTER SERVER ERROR!",
            success: false
        });
    }
}

// LOGIN 
export const loginUser = async (req, res) => {
    console.log("Login....");
    try {
        console.log("Inside Try block of Login");
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Required field is missing!",
                success: false
            });
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect Email!",
                success: false
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect Password!",
                success: false
            });
        }

        // Check role is correct or not.
        if(role != user.role){
            return res.status(400).json({
                message: "Account doesn't exists with current role!",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        }
        const token =  await jwt.sign(
            tokenData, 
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        );

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie(
                'token', token, 
                {
                    maxAge: 1*24*60*60*1000, 
                    httpsOnly: true, 
                    sameSite: 'strict'
                }
            ).json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            })
    } catch (error) {
        console.log("LOGIN ERROR: ", error);

        return res.status(500).json({
            message: "LOGIN SERVER ERROR!",
            success: false
        });
    }
}

// LOGOUT 
export const logoutUser = async (req, res) => {
    console.log("Logout....");
    try {
        console.log("Inside Try block of Logout");
        return res.status(200).cookie('token', "", {maxAge: 0}).json({
            message: "Logged out successfully!",
            success: true
        });
    } catch (error) {
        console.log("LOGOUT ERROR: ", error);

        return res.status(500).json({
            message: "LOGOUT SERVER ERROR!",
            success: false
        });
    }
}

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    console.log("Update Profile.....");
    try {
        console.log("Inside Try block of Update Profile");
        const {fullname, email, phoneNumber, bio, skills} = req.body;

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // if(!fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message: "Required field is missing!",
        //         success: false
        //     });
        // }

        let skillsArray;
        if(skills)
            skillsArray = skills.split(",");
        const userId = req.id;
        
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found!",
                success: false
            });
        }

        // Updating Data 
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skillsArray) user.profile.skills = skillsArray;
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        } 

        // Resume Handling

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile Updated Successfully!",
            user,
            success: true
        });
    } catch (error) {
        console.log("UPDATE PROFILE ERROR: ", error);

        return res.status(500).json({
            message: "UPDATE PROFILE SERVER ERROR!",
            success: false
        });
    }
}

