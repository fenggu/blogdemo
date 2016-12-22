var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var _blog = new Schema({
	pid: Number,
	content:String,
	comment:Array,
	title:String,
	date:String 
});	//	定义了一个新的模型，但是此模式还未和users集合有关联
exports.blog = mongoose.model('users', _blog); //	与users集合关联