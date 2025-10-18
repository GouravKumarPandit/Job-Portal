import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    console.log("Authenticating....");
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not authenticated!",
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message: "Invalid Token!",
                success: false
            })
        }

        req.id = decode.userId;
        next();        
    } catch (error) {
        console.log("AUTHENTICATION ERROR: ", error);

        return res.status(500).json({
            message: "AUTHENTICATION SERVER ERROR!",
            success: false
        });
    }
}

export default isAuthenticated;