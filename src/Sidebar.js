import React from 'react';
import './Sidebar.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton,Menu,MenuItem} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import {signOut} from "./Authentication";
import db from "./firebase";
import {getProfile,clearProfile} from './save';
import SidebarChat from "./SidebarChat";


class Sidebar extends React.Component {


  constructor(){
    super();
    this.state = {

      user : getProfile(),
      users : null,
      items : null,

    }
    this.initUser();
    this.findChats();
  }

  findChats = () =>{
    db
      .collection("chats")
      .onSnapshot((snap) => {
        snap.docs.forEach((d) => {
          let ChatId = d.data().chatId.split("_");
          if(ChatId[0] === this.state.user.uid){
             db
                 .doc("users/"+ChatId[1])
                 .onSnapshot(snapshot => {
                  let a = this.state.items ?this.state.items :[] ;
                  a.push(snapshot.data())
                  this.setState({
                   
                    items : a,
                  }
                  )
                  
                 })
          }
          if(ChatId[1] === this.state.user.uid){
                 db
                 .doc("users/"+ChatId[0])
                 .onSnapshot(snapshot => {
                  let a = this.state.items ?this.state.items :[] ;
                  a.push(snapshot.data())
                  this.setState({
                   
                    items : a,
                  }
                  )
                  
                 })
        }
        })
      })
      
  }
  searchChanged = (e) => {
    var strSearch = e.target.value;
    var strlength = strSearch.length;
    var strFrontCode = strSearch.slice(0, strlength-1);
    var strEndCode = strSearch.slice(strlength-1, strSearch.length);
    var startcode = strSearch;
    var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
    if(e.target.value === ""){
      this.setState({
        
        items:null,
      })
        
      this.findChats();
    
    }
    else if(this.state.users !== null){
     
      var find = false;
      this.setState(
        {
          items : this.state.users.map(user => {
            if(user.name >= startcode && user.name < endcode){
                find = true;
                return user;
            }
                
        }),
        }
      )
      if(!find){
       
        db.collection("users")
      .where('name', '>=', startcode)
      .where('name', '<', endcode)
      .onSnapshot((snapshot) => {
      this.setState(
        {
          users : snapshot.docs.map((doc) => {
            if(doc.data().uid !== this.state.user.uid){
              return doc.data();
            }
        }
      ),
          
        }
      );
      this.setState({
        items : this.state.users,
      }
      )
      }
      );
      }
    }
    else{
      db.collection("users")
      .where('name', '>=', startcode)
      .where('name', '<', endcode)
      .onSnapshot((snapshot) => {
      this.setState(
        {
          users : snapshot.docs.map((doc) => {
            if(doc.data().uid !== this.state.user.uid){
              return doc.data();
            }
        }
      ),
          
        }
      );
      this.setState({
        items : this.state.users,
      }
      )
      }
      );
    }
    
  }
      
    

  
  initUser(){
    db
    .collection("users")
    .doc(this.state.user.uid)
    .onSnapshot((snapshot) => {
        if(!snapshot.exists){
          db
            .collection("users")
            .doc(this.state.user.uid)
            .set({
                uid : this.state.user.uid,
                name:this.state.user.name,
                email:this.state.user.email,
                photo : this.state.user.photo,
                state: "loggedIn",
                online : true,
            },{merge : true});
        }
        else{
          db
            .collection("users")
            .doc(this.state.user.uid)
            .set({
                state: "loggedIn",
                online : true,
            },{merge : true});
        }
    });
     
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
        .doc(this.state.user.uid)
        .set({
            uid : this.state.user.uid,
            name:this.state.user.name,
            email:this.state.user.email,
            photo : this.state.user.photo,
            state: "loggedOut",
            online : false,
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
              <h2>{this.state.user.name !== null ?this.state.user.name:"Name"}</h2>
              <div className="sidebar_headerRight">
                  {<this.Options/>}
                  
              </div>
          </div>

          <div className="sidebar_search">
              <div className="sidebar_search_container">
                <SearchOutlined/>
                <input id="search" placeholder="Search Here" type="text" onChange={this.searchChanged} />

      
              </div>
         
          </div>
          <div className="sidebar_chat">
            {this.state.items !== null ?
            this.state.items.map(
              (user,index) => {
                if(user != null){
                  return <SidebarChat key={index} name={user.name} url={user.photo} online={user.online} uid={user.uid}/>;
                }
              }
            ):<div/>}
          </div>
      </div>
  );
  }
  
  
}
  export default Sidebar;