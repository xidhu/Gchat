import React from 'react';
import './Sidebar.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton,Menu,MenuItem} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import {signOut} from "./Authentication";
import {getProfile} from "./save";

class Sidebar extends React.Component {


  constructor(){
    super();
    this.user = getProfile();
    alert(this.user.name);
  }




  render(){
    return (   
      <div className="sidebar">
          <div className="sidebar_header">
              <img className="profile_pic"  width="50px" height="50px" />
              <div className="sidebar_headerRight">
                  <Options/>
                  
              </div>
          </div>

          <div className="sidebar_search">
              <div className="sidebar_search_container">
                <SearchOutlined/>
                <input id="search" placeholder="Search Here" type="text" />
              </div>
         
          </div>
          <div className="sidebar_chat">
            

          </div>
      </div>
  );
  }
  
  
}

const Options = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if(e.id === "logout"){
        signOut();
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
  export default Sidebar;