const User = require("../../model/userModel")

module.exports.register = async (req, res, next) => {
    console.info("Service Register call")
    try {

        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username })

        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false })
        }

        const emailCheck = await User.findOne({ email })

        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false })
        }

        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user })

    } catch (e) {
        console.info("Error in service Register", e);
        next(e)
    }

}
