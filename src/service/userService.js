const User = require('../model/user')

exports.userValidationByUsernameAndEmail = async (username, email) => {
    try {
        const userValidation = await User.find({'username' : username, 'email' : email})
        if (userValidation) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log('Internal server error : ', error)
        console.log('Errored User Validation : ', error)
        return false
    }
}

exports.userValidataionById = async (userId) => {
    try {
        const userValidation = User.findById(userId)
        if (userValidation) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log('Errored userValidationById : ', error)
        return false
    }
}

exports.userBulkValidataionById = async (userIdArray) => {
    try {
        const userValidation = await Promise.all( userIdArray.map(async (userId) => {
            const user = User.findById(userId)
            return user !== null
        }))
        if (userValidation) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log('Errored userValidationById : ', error)
        return false
    }
}