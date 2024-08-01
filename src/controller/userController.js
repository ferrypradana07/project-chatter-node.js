const User = require('../model/user')
const { comparePassword } = require('../utill/bcryptUtill')
const { userValidationByUsernameAndEmail } = require('../service/userService')

exports.createUser = async (req, res) => {
    const {username, email, password} = req.body??'';
    if (!username || !email || !password) {
        return res.send(`username or email or password is null`);
    } 
    try {
        const newUser = new User({username, email, password});
        newUser.save();
        res.send('success');
    } catch (error) {
        res.send(`internal was error`);
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send(`internal was error`)
        console.log(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {username, email, password} = req.body??''
        if (!username || !email || !password) {
            return res.sendStatus(400)
        }

        const passwordValidation = await comparePassword(password) 
    } catch (error) {
        
    }
}