import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';


exports.signUp = async (req, res) => {
    let { username, password } = req.body;
    if (!req.body) {
        res.json({
            success: false,
            message: 'Fill all fields'
        });
    }
    const user = await User.create(req.body);
    if (user) {
        req.body = undefined;
        const token = jwt.sign(password, process.env.JWT_SECRET);
        res.json({
            success: true,
            message: 'Successful',
            token: token
        });
    }
    else {
        res.json({
            message: 'An error occured',
            success: false
        });
    }
};

exports.signIn = async (req, res) => {
    let { username, password } = req.body;
    if (!req.body) {
        res.json({
            message: 'Fill all fields',
            success: false
        });
    }
    const user = await User.findOne({ username: username.toLowerCase()});
    if (user)  {
        req.body = undefined;
        const token = jwt.sign(password, process.env.JWT_SECRET);
        if (bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                message: 'Successful',
                token: token,
                success: true
            });
        }
        else {
            res.json({
                message: 'Credentials not found!',
                success: false
            });
        }
    }
};