const messageModal = require("../model/messageModal");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModal.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (data) {
            return res.json({ msg: "Message added successfully." })
        } else {
            return res.json({ msg: "Failed to add message to the database" })
        }
    } catch (e) {
        next(e);
    }
};

module.exports.getAllMessage = async (req, res, next) => {

    try {
        const { from, to } = req.body;
        console.log(">>>>getAllMessage from: ", from, " to:", to)
        const messages = await messageModal.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() == from,
                message: msg.message.text
            }
        })

        return res.json(projectMessages);
    } catch (e) {
        next(e);
    }
};
