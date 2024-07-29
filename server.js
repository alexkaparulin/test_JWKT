const jwt = require('jsonwebtoken');
const fs = require('fs');

const express = require("express");
const app = express();

require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

const payload = {
    //   sub: "Web3auth-telegramBot", // Replace with the user's unique identifier
    name: "Joh3n Doe",
    email: "john.3doe@example.com",
    // iss: 'https://telegram.com'
};

const signOptions = {
    issuer: 'https://telegram.com',
    subject: 'use3r@example.com',
    audience: 'your-audience',
    expiresIn: '1h',
    algorithm: 'RS256'
};

const token = jwt.sign(payload, privateKey, signOptions);


app.get("/", (req, res) => {
    res.send("Server is running");
});  

app.listen(process.env.DOMAIN, () => {
    console.log(`Server is running on port ${process.env.DOMAIN}`);
});

console.log("Generated JWT:", token);