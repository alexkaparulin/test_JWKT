const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require("express");
const app = express();

require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const generateToken = (email) => {
    const payload = {
        email: email
    };
    const signOptions = {
        issuer: 'https://telegram.com',
        subject: email,
        audience: 'your-audience',
        expiresIn: '1h',
        algorithm: 'RS256'
    };
    return jwt.sign(payload, privateKey, signOptions);
};

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/getEmail", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const token = generateToken(email);
    res.json({ token: token });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log("Server started");