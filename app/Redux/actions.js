
/*
 * action 类型
 */  
export const addblog = 'addblog'; 
export const changetitle = 'changetitle'; //修改标题 
export const changecontent = 'changecontent'; //修改内容
export const changecomment = 'changecomment'; //输入评论
export const pushcomment = 'pushcomment'; //输入评论
export const getblog = 'getblog'; //获取当前需要编辑的blog到缓存区
export const delblog='delblog';//删除当前编辑的博客
/*
 * action 创建函数
 */  
export function addblogAction(index) {
  return { type: addblog ,index:index}
} 
export function changeContentAction(content,index){
	return {type:changecontent,content:content,index:index}
}
export function changeTitleAction(title,index){
	return {type:changetitle,title:title,index:index}
}
export function changeCommentAction(text,index){
	return {type:changecomment,text:text,index:index}
}
export function PushCommentAction(text,index){
	return {type:pushcomment,text:text,index:index}
}
export function GetBlogAction(blog){
	return {type:getblog,blog:blog}
}

export function DelBlogAction(index){
	return {type:delblog,index:index}
}