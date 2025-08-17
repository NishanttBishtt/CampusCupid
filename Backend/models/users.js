const mongoose = require("mongoose")
const {createHmac,randomBytes} = require("crypto");

const userschema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },
    profileImageURL:{
        type:String,
        default:"/uploads/default.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },
    gender:{
        type:String,
        required:true,
    },
    enterestedIn:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    bio:{
        type:String
    }
},{timestamps:true});


userschema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt  = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");
    user.salt  = salt;
    user.password = hashedPassword;

    next();
})

const users  = model("users",userschema);
module.exports = {users};