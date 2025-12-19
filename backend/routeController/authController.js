import User from "../schema/userSchema.js"
import bcrypt from "bcryptjs";

export const Signup = async(req , res)=>{
    try {
        const {fullname , username , email , password , gender , profilepic} = req.body;
        const user = await User.findOne({username});
        if(user){
            return res.status(500).send({success : false, message : "user already exits"});
        }
        const emailPresents = await User.findOne({email});
        if(emailPresents){
            return res.status(500).send({success : false, message : "user already exits"});
        }

        const hashPassword = bcrypt.hashSync(password , 10);

        const boypp = profilepic || `https://avatar.iran.liara.run?public/boy?username=${username}`;
        const girlpp = profilepic || `https://avatar.iran.liara.run?public/girl?username=${username}`;

        const newUser = new User({
            fullname , 
            username , 
            email , 
            password : hashPassword , 
            gender ,  
            profilepic : gender == "male" ? boypp : girlpp
        })
        if(newUser){
            await newUser.save();
        }
        else{
            res.status(500).send({success : false , message : "Invalid user data"});
        }
        res.status(201).send({
            message : "signUp successfully!"
        })

    } catch (error) {
        res.status(500).send({success : false , message : error});    
    console.log(error);
    }
}
