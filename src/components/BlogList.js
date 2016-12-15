import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { markdown } from 'markdown'
import { getlistAction, getinnerblogAction } from '../Redux/actions.js'
import { bindActionCreators } from 'redux'  
class RootBlogList extends Component { 
  constructor(props) {
    super(props);  
  }  
  toLittle(content){ //缩短字体
    var newcontent = "" 
    if(content == undefined) return
      if(content.length > 200){
        newcontent = content.slice(0,200) + "..."
      } else {
        newcontent = content;   
      }
      newcontent = markdown.toHTML(newcontent)  
      return newcontent
    }  
    
    getlist(page){   
      const { patchList } = this.props  
      fetch('Blogs/' + page, {  
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function(response) { 
        return response.json();
      }).then(function(json){  
        patchList(json)   
      }).catch(function(err) {
        console.log(err)
      });  
    }

    componentWillMount() { 
      var { bloglist } = this.props
      console.log(bloglist.page)
      this.getlist(bloglist.page)
    }

    render() {
      let { bloglist } = this.props   
      return (
        <div className="BlogList">  
          {bloglist.data.map((Blog,index) => {   
            var  newcontent= this.toLittle(Blog.content) 
            return(
                  <div  key={index}> 
                    <header>
                      <Link to={ "Blog/"+ Blog.pid }>
                        <h4>{Blog.title}</h4> 
                      </Link> 
                      <small>{Blog.date}</small>
                    </header>
                    <div dangerouslySetInnerHTML={{__html:newcontent}}>
                    </div>
                  </div>
              ) 
            }  
          	)} 
        </div>
      );
    }
}

function mapStateToProps(state) {
  // 这里拿到的state就是store里面给的state
  return {  
    bloglist:state.bloglist
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {  
    patchList: bindActionCreators(getlistAction, dispatch )
  } 
}

let BlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootBlogList)
export default BlogList; 
 