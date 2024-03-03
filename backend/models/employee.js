const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  courses: [{ type: String }],
 image :{
    type : String,
    required : true,
 } ,
 date :{
    type : Date,
    required : true
 },
 id : {
    type : Number,
    required : true
 }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
