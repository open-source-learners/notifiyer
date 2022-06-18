const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    issuer:{
        type:String
    },
    facebookId:{
        type:String,
    },
    courses:[],
    certificates:[String],
    test:[{
        courese:{type:String},
        score:{
            type:String
        },
        takenOn:{
            type: Date
        }
    }]

})


module.exports = mongoose.model("Student", StudentSchema);