import React from 'react';
import { getProfile } from './save';
import './SidebarChat.css';
import db from "./firebase";
import {
  Link,BrowserRouter as Router
} from "react-router-dom";

class SidebarChat extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user : getProfile(),
    }

  }

  
  
  render(){
    return(
     
      <Link to={"/chats/"+this.props.uid+"_"+this.state.user.uid} className="lnk">
      <div className="sidebar_chat_item" onClick={this.onSelect}>
          
          
          <img className="profile_pic" src={this.props.url !== null ? this.props.url:"https://eshendetesia.com/images/user-profile.png"} width="50px" height="50px" />
          
          
          
          <div className="sidebar_chat_items">
              <div className="sidebar_chat_item_info">
                  <h4>{this.props.name !== null ? this.props.name:"Unknown"}</h4>
                  <p>
                    {this.props.online === true ? "Online":"Offline"}
                  </p>
              </div>
                  <p></p>
  
              
          </div>
          </div>
          </Link>
        
          
          
      
      
    );
  }
}

export default SidebarChat;