const mongoose=require('mongoose');

const todo_blue= new mongoose.Schema({
    "todo_head":{type:String},
    "todo_activity":{type:String},
    "todo_dec":{type:String}
})

module.exports=mongoose.model("todo_data",todo_blue)