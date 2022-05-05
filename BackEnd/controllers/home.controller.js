const Room = require('../models/room.modal')
const getHomePage = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        const list_room = await Room.find();
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}