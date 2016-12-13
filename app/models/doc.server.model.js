var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/blogdemo');
var Schema=mongoose.Schema;  
var _Blog=new Schema({  
		pid:Number,
		title:String,
		content:String, 
		date:String,
		comment:Array
}) 
exports.Blog= mongoose.model('Blog', _Blog);  