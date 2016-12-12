
/*
 * action 类型
 */ 
export const increase = 'increase'; 
/*
 * action 创建函数
 */
export function increaseAction(num) {
  return { type: increase, num}
}