const User = require('../Models/userModel')
const { validation } = require('../Validation/validation')

const registerUser = async(req, res) => {
    let user
    try{
        const result = await validation.validateAsync(req.body, {abortEarly: false})
        user = await User.findOne({ email: result.email })
        if(user)
           throw "Already applied with this email."
        user = new User(result)
        await user.save()
        return res.status(201).json({ user })
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            return res.status(400).json(errors)
        }
        return res.status(500).json({ err })
    }
}

module.exports = { registerUser }