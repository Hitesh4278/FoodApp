const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET_TOKEN;


router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 1 }),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            await User.create({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.error("Error creating user:", error);
            res.json({ success: false });
        }
    }
);

router.post("/loginuser",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email;
        try {
            const userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" });
            }
            const tokenPayload = {
                user: { email:email}
            };
            const authToken = jwt.sign(tokenPayload, jwtSecret);
            return res.json({ success: true, authToken });
        } catch (error) {
            console.error("Error logging in user:", error);
            res.json({ success: false });
        }
    }
);

module.exports = router;
