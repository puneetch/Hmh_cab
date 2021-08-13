const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    confPassword: {
        type:String,
        required:true
    },
    agreeTerm:{
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Register", employeeSchema);     // Register is collection name and connect wth employeeSchema (Schema)

module.exports = Register;