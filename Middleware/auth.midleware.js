const User = require("../Schema/userSchema")

module.exports.auth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || null;

    if (token != null) {
        const user = await User.findOne({ Token: token }).select("_id username");
        if (user) {
            req.user = user
            next()
        }
        else {

            res.json({ code: 401, message: "please give server token" })
        }

    }
    else {
        res.json({ code: 401, message: "please give server token" })
    }
}