
/*
 * action 类型
 */  
export const addtest = 'addtest'; 
export const changenav = 'changenav'; //切换列表
export const changeselect = 'changeselect'; //搜索
/*
 * action 创建函数
 */  
export function addtestAction() {
  return { type: addtest }
}
export function changenavAction(index,valuetype){
	return {type:changenav ,index:index,valuetype:valuetype}
}
export function changeSelectAction(text){
	return {type:changeselect,text:text}
}