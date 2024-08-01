const bcrypt = require('bcrypt')
const { SALT } = require('../config/config.js')

exports.hashingPassword = async (plainPassword) => {
    try {
        const hashedPassword = await bcrypt.hash( plainPassword, SALT )
        return hashedPassword
    } catch (error) {
        console.log(error)
        return false
    }
}

exports.comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const validationPassword = await bcrypt.compare(plainPassword, hashedPassword)
        return validationPassword
    } catch (error) {
        console.log(error)
        return false
    }
}