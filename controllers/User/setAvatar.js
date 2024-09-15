const User = require("../model/userModel")

module.exports.setAvatar = async (req, res, next) => {
    console.info("Service setAvatar call")
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        }, { new: true })

        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (e) {
        console.info("Error in service setAvatar", e)
        next(e)
    }
}
