const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Employee = require("./models/employee");

app.use(cors());

app.use(express.json());

const secretKey = "Virat_kohli";

const generateJwt = (user, secret) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "6h" });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Forbidden" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/DealsDray");
}

app.get("/me", authenticateJwt, (req, res) => {
  // console.log("Piyush");
  // console.log(req.user.username);
  res.json({
    username: req.user.username,
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  // console.log(username);
  // console.log(password);
  const admin = await User.findOne({ username: username, password: password });
  // console.log(admin);
  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.status(403).json({ message: "Invalid credentials" });
  }
});

app.post("/addEmployee", authenticateJwt, async (req, res) => {
  try {
    const data = req.body;
    const all = await Employee.find();
    const existingEmployee = await Employee.findOne({ name: data.name });
    // console.log(data);
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee already exists" });
    }
    const id = all.length + 1;
    const currEmployee = {
        ...data,
        date : Date.now(),
        id : id
    }
    console.log(currEmployee);
    const newEmployee = new Employee(currEmployee);
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/empList", authenticateJwt, async (req, res) => {
    // console.log("Piyush");
    try{
        const empList = await Employee.find();
        res.status(201).send(empList);
    }catch(error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});

app.get("/employee/:empId",authenticateJwt,async (req,res)=>{
    const {empId} = req.params;
    try{
        const employee = await Employee.findOne({_id:empId});
        res.status(201).send(employee);
    }catch(error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});


app.delete("/delete/:empId",authenticateJwt,async (req,res)=>{
    const {empId} = req.params;
    console.log(empId);
    try{
        const data = await Employee.findByIdAndDelete({_id:empId});
        res.status(201).send(data);
    }catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/updateEmployee/:empId",authenticateJwt,async (req,res)=>{
    const {data} = req.body;
    const {empId} = req.params;
    console.log(data);
    try{
        const existingdata = await Employee.findById(empId);
        const newData = {
            ...data,
            id : existingdata.id,
            date : existingdata.date
        }
        const updated = await Employee.findByIdAndUpdate(empId,newData)
        console.log(updated);
        res.status(201).send(updated);

    }catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(3000, () => {
  console.log("App is running on port no: 3000");
});
