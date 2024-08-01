require('dotenv').config()

const MONGO_URI = `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}` || `mongo://127.0.0.1:27018/chatterDB`
const SALT = process.env.SALT || 10
const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD
const PRIVATE_KEY = process.env.PRIVATE_KEY
const MAIL_SERVICE = process.env.MAIL_SERVICE

module.exports = { MONGO_URI, SALT, MAIL_PASSWORD, MAIL_USERNAME, PRIVATE_KEY, MAIL_SERVICE }