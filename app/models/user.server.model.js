var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/songguotest');
var Schema=mongoose.Schema;
var _User=new Schema({  
		pid:Number,
		uid:Number,
		answer:String, 
		time:String,
		detail:Number
}) 
exports.User= mongoose.model('User', _User); 