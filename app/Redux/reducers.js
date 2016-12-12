import { combineReducers } from 'redux'  
import {changenav,changeselect,increase} from  './actions.js'


/*
 * action 类型
 */
// Action

// Reducer 
var  initState={
  SelectInput:"",
  BtnBox:[{title:"全部音乐",to:"",id:"AllMusic",img:"default.jpg"},
          {title:"我的收藏",to:"/Mine/MyLike",id:"MyLike",img:"default.jpg"},
          {title:"最近播放",to:"",id:"RecentPlayed",img:"default.jpg"}],
  MusicList:[
        {
          title:"岚",
          num:"100",
          pic:"../default.jpg"
        },
        {
          title:"Arashi",
          num:"10",
          pic:"../default.jpg"
        },
        {
          title:"Arashi",
          num:"10",
          pic:"../default.jpg"
        },
        {
          title:"Arashi",
          num:"10",
          pic:"../default.jpg"
        }
  ],
    HomeBar:{
      type:"HomeBar",
      class:'TopBar HomeBar',
      data:[
        {name:"推荐",to:"/Recommend",id:"Recommend",clsName:"active"},
        {name:"歌单",to:"/Sheet",id:"Sheet",clsName:""}
        ]},
  TopBar:
{ type:"TopBar",
  class:'TopBar',
  data:[{name:"音乐馆",to:"/",id:"Home",clsName:"active"},{name:"我的",to:"/Mine",id:"Mine",clsName:""},{name:"排行榜",to:"/Chart",id:"Chart",clsName:""}],
  },APlayer:{
        
        narrow: false,
        autoplay: false,
        showlrc: false,
        mutex: true,
        theme: '#ad7a86',
        mode: 'random',
        islist:true,
        music: [
            {
                title: 'あっちゅ～ま青春!',
                author: '七森中☆ごらく部',
                url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
                pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg'
            },
            {
                title: 'secret base~君がくれたもの~',
                author: '茅野愛衣',
                url: 'http://devtest.qiniudn.com/secret base~.mp3',
                pic: 'http://devtest.qiniudn.com/secret base~.jpg'
            },
            {
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
            },
            {
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
            },
            {
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
            }
        ]},   
}
function Reducer(state, action) { 
  if(state==""||state==undefined||state==null){
    state=initState
  } 
  switch (action.type) {
      case changenav :  //切换导航栏  
       if(action.valuetype=="HomeBar"){   
        var nextstate=Object.assign({},state)
        var _TopBar=Object.assign({},state) 
        _TopBar.HomeBar.data.map((HomeBar,index)=>
          HomeBar.clsName=""
        )   
        _TopBar.HomeBar.data[action.index].clsName="active" 
        nextstate.HomeBar=_TopBar.HomeBar 
       }else{
        var nextstate=Object.assign({},state)
        var _TopBar=Object.assign({},state) 
        _TopBar.TopBar.data.map((TopBar,index)=>
          TopBar.clsName=""
        )  
        _TopBar.TopBar.data[action.index].clsName="active" 
        nextstate.TopBar=_TopBar.TopBar 
       }
      return nextstate
      case changeselect : //单向绑定搜索框内容
        var nextstate=Object.assign({},state)
        nextstate.SelectInput=action.text
      return nextstate 
     default:
     return state
   }
 }
 export default Reducer