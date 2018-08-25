import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel';

exports.signUp = async (req, res) => {
    let { username, password } = req.body;
    if (username !== '' && password !== '') {
        res.json({
            success: false,
            message: "Fields cannot be empty"
        });
    }
    //auto-generate a salt and hash
    req.body.password = bcrypt.hashSync(password, 10);
    req.body.username = username.toLowerCase();
    const admin = await Admin.create(req.body);
    if (admin) {
        req.body = undefined;
        const token = jwt.sign(req.body, process.env.JWT_SECRET);
        res.json({
            message: 'Successful',
            success: true,
            token: token
        });
    }
};

exports.signIn = async (req, res) => {
    let { username, password } = req.body;
    if (!req.body) {
        res.json({
            message: 'All fields are compulsory',
            success: false
        });
    }
    const admin = Admin.findOne({username: username.toLowerCase()});
    if (!admin) {
        res.json({
            message: 'Login credentials not found',
            success: false
        });
    }
    if (bcrypt.compareSync(password.toLowerCase(), admin.password)) {
        req.body = undefined;
        const token = await jwt.sign(req.body, process.env.JWT_SECRET);
        res.status(200).json({
            message: 'Login successful',
            success: true,
            token: token
        });
    }
    else {
        res.json({
            message: 'Invalid Credentials!',
            success: false
        });
    }
};