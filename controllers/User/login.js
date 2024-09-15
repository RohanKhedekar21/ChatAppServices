const User = require("../model/userModel")
const brcypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
    console.info("Service Login call")
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username })


        if (!user) {

            return res.json({ msg: "Incorrect username or password", status: false })
        }
        const isPasswordValid = await brcypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect username or password", status: false })
        }

        delete user.password;


        return res.json({ status: true, user })

    } catch (e) {
        console.info("Error in service login", e)
        next(e)
    }

}
