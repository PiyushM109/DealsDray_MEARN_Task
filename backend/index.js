const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
const cors = require('cors')
const mongoose = require("mongoose");
const User = require("./models/user")


app.use(cors())


app.use(express.json());

const secretKey = "Virat_kohli"

const generateJwt = (user, secret) => {
    const payload = { username: user.username }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Forbidden' })
            } else {
                req.user = user;
                next()
            }
        })
    }
}
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/DealsDray");
}





app.post('/login', async (req, res) => {
    const { username, password } = req.headers
    console.log(username);
    console.log(password);
    const admin = await User.findOne({username:username, password:password});
    console.log(admin);
    if (admin) {
        const token = generateJwt(admin)
        res.json({ message: 'Logged in successfully', token: token })
    } else {
        res.status(403).json({ message: "Invalid credentials" })
    }
});





app.get("/",(req,res)=>{
    res.send("server running");
});


app.listen(3000,()=>{
    console.log("App is running on port no: 3000");
});
