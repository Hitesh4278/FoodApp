const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_TOKEN;
module.exports = function (req, res, next) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);
        req.body.email = decoded.user.email;
        next();
    } catch (error) {

        res.status(401).send({ success: false, message: "Invalid token" });
    }
};