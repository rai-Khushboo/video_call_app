import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwtTokens.js";

export const Signup = async (req, res) => {
    try {
        const { fullname, username, email, password, gender, profilepic } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(500).send({ success: false, message: "user already exits" });
        }
        const emailPresents = await User.findOne({ email });
        if (emailPresents) {
            return res.status(500).send({ success: false, message: "user already exits" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const boypp = profilepic || `https://avatar.iran.liara.run?public=true&gender=boy&username=${username}`;
        const girlpp = profilepic || `https://avatar.iran.liara.run?public=true&gender=girl&username=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender == "male" ? boypp : girlpp
        });

        if (newUser) {
            await newUser.save();
        } else {
            res.status(500).send({ success: false, message: "Invalid user data" });
        }

        res.status(201).send({
            message: "signUp successfully!"
        });

    } catch (error) {
        res.status(500).send({ success: false, message: error });
        console.log(error);
    }
};

// login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(500).send({ success: false, message: 'email doesn"t exits' });
            const comparePassword = bcrypt.compareSync(password, user.password || '');
            if (!comparePassword) {
                return res.status(500).send({ success: false, message: "email or password doesn't exits" });
            }
            const token = jwtToken(user._id, res);
            res.status(200).send({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                message: "Successfully logged in",
                token
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);
    }
};

export const LogOut = async (req, res) => {
    try {
        res.clearCookie('jwt', {
            path: '/',
            httpOnly: true,
            secure: true
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);
    }
};
