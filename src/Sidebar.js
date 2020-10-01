import React from 'react';
import './Sidebar.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton,Menu,MenuItem} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import {signOut} from "./Authentication";
import db from "./firebase";
import {getProfile,clearProfile} from './save';


class Sidebar extends React.Component {


  constructor(){
    super();

    this.user = getProfile();
    this.initUser();
    this.users = [];
    this.chats = [];
    
  }

  componentDidMount(){
    this.setState(this.user,() => {
      this.user.name = "Hello";
    })
  }
  async initUser(){
    await db
            .collection("users")
            .doc(this.user.uid)
            .set({
                uid : this.user.uid,
                name:this.user.name,
                email:this.user.email,
                photo : this.user.photo,
                state: "loggedIn",
                online : false,
            },{merge : true});
  }
  Options = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (e) => {
      if(e.id === "logout"){
         db
        .collection("users")
        .doc(this.user.uid)
        .set({
            uid : this.user.uid,
            name:this.user.name,
            email:this.user.email,
            photo : this.user.photo,
            state: "loggedOut"
        },{merge : true});
          signOut();
          clearProfile();
          
      }
      setAnchorEl(null);
    };
  
    return (
      <div>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem id="logout" onClick={(e) => {handleClose(e.target)}}>Logout</MenuItem>
        </Menu>
      </div>
    );
  
    }




  render(){
    
    return (   
      <div className="sidebar">
          <div className="sidebar_header">
              <img className="profile_pic"  width="50px" height="50px" src={"https://eshendetesia.com/images/user-profile.png"}/>
              <h2>{this.user.name !== null ?this.user.name:"Name"}</h2>
              <div className="sidebar_headerRight">
                  {<this.Options/>}
                  
              </div>
          </div>

          <div className="sidebar_search">
              <div className="sidebar_search_container">
                <SearchOutlined/>
                <input id="search" placeholder="Search Here" type="text" onChange={(e) => {this.user.name = "hello"}} />

      
              </div>
         
          </div>
          <div className="sidebar_chat">
            

          </div>
      </div>
  );
  }
  
  
}
  export default Sidebar;