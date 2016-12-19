import { combineReducers } from 'redux'
import * as actions from './actions'
import { browserHistory } from 'react-router'
// Reducer 
function Reducer(state, action) {
    if (!state) {
        state = initState
    }
    switch (action.type) {
        case actions.getinnerblog: //渲染详情页
            var nextstate = Object.assign({}, state)
            nextstate.innerblog = action.blog[0]
            return nextstate

        case actions.getblog: //检出要编辑的blog到编辑区  
            return Object.assign({}, state, { blog: action.blog })

        case actions.getlist: //获取列表  
            return Object.assign({}, state, { bloglist: action.list })

        case actions.topage: //去指定页面 
            var _bloglist = Object.assign({}, state.bloglist)
            _bloglist.page = action.page;
            return Object.assign({}, state, { bloglist: _bloglist })

        case actions.pushcomment: //增加新的评论    
            return Object.assign({}, state, { innerblog: action.blog })

        default:
            return state
    }
}
export default Reducer
