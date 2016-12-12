import { combineReducers } from 'redux' 
import {increase} from './actions.js'
import {incans} from './actions.js'
import {getlist} from './actions.js'
import {addtest} from './actions.js'
import {gettest} from './actions.js'
import {question} from './actions.js'
import {changeqj} from './actions.js'
import {changetext} from './actions.js'
import {changett} from './actions.js'
import {changepid} from './actions.js'


/*
 * action 类型
 */
// Action

// Reducer 
var  initState={
  main:[{title:"",pid:""},{title:"",pid:""}] ,
  test:{time:"", 
  pid:"",
  question:[
  {content:"",
  answer:{A:"",B:"",C:"",D:""},
  detail:{A:"",B:"",C:"",D:""}
}
],
ansdetext:[""],ansdeqj:[["",""]],num:"",pid:"",title:""}
}
function counter(state, action) { 
  if(state==""||state==undefined||state==null){
    state=initState
  } 
  switch (action.type) {
    case  increase:  
    var  nextstate = Object.assign({}, state)
    var test={time:"",question:{content:"",
    answer:{A:"",B:"",C:"",D:""},
    detail:{a:"",b:"",c:"",d:""} 
  },ansdetext:[""],ansdeqj:[["",""]],num:"",pid:"",title:""}
  nextstate.test.question.push(test.question)  
  return nextstate
  case incans:
  var  nextstate = Object.assign({}, state)
  var test={time:"",question:[""],ansdetext:[""],ansdeqj:[["",""]],num:"",pid:"",title:""}
  nextstate.test.ansdetext.push(test.ansdetext)
  nextstate.test.ansdeqj.push(test.ansdeqj) 
  return nextstate
  case  getlist:  
  var nextstate = Object.assign({}, state)
  nextstate.main=action.list 
  return nextstate
  case  changepid:
    var nextstate=Object.assign({},state)
    var _state=Object.assign({},state.test)
    _state.pid=action.text
    nextstate.test=_state
  return nextstate
  case  changett: 
    var nextstate=Object.assign({},state)
    var _state=Object.assign({},state.test)
    _state.title=action.text;
    nextstate.test=_state 
  return  nextstate
  case addtest: //添加数据方法 以及编辑方法
  var test = Object.assign({}, state.test)  
      if(test.title==""||test.pid==""){
        alert("标题或者编号不得为空！")
        return state
      }
      console.log(test)
      fetch('addtest', {  
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              pid:test.pid,
              title:test.title,
              num:test.num,
              time:test.time, 
              question:test.question,
              ansdetext:test.ansdetext,
              ansdeqj:test.ansdeqj
        })
     }).then(function(response) { 
        alert("添加成功")
        window.location.href="admin.html"
        return response.json();
    }).catch(function(err) {
        // 捕获错误
        console.log(err)
    });
  return state
  case gettest:
  var nextstate=Object.assign({}, state)  
  var _test=Object.assign({}, state.test) 
        _test.question=action.data.data.question;
        _test.ansdeqj=action.data.data.ansdeqj;
        _test.ansdetext=action.data.data.ansdetext;
        _test.title=action.data.data.title;
        _test.pid=action.data.data.pid 
        nextstate.test=_test    
      return nextstate 
  case changeqj:
    var nextstate=Object.assign({},state)
    var _state=Object.assign({},state.test)
    _state.ansdeqj[action.index][action.child]=action.text 
    nextstate.test=_state
  return nextstate
  case changetext: //管理 结果数据
    var nextstate=Object.assign({},state)
    var _state=Object.assign({},state.test)
    _state.ansdetext[action.index]=action.text
    nextstate.test=_state 
  return nextstate
  case question:  
  var attr=action.attr
  var attrnum=parseInt(attr.indexOf("."))
  if(attrnum>0){
    var child= attr.slice(attrnum+1)
    var Attr= attr.slice(0,attrnum)      
    var nextstate=Object.assign({},state) 
    var _ans=Object.assign({},state.test.question[action.index][Attr])
    _ans[child]=action.qus;
        nextstate.test.question[action.index][Attr]=_ans //改变答案对象
      }else{
        var Attr=attr
        var State=state.test.question[action.index][Attr] 
        var nextstate=Object.assign({},state) 
        nextstate.test.question[action.index][Attr]=action.qus 
     }  
     return nextstate
     default:
     return state
   }
 }
 export default counter