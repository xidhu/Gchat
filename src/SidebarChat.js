import React from 'react';
import './SidebarChat.css';

function SidebarChat({items}) {
  return(
    
    
    <div className="sidebar_chat_item" onClick="">
        
        
        <img className="profile_pic" src={items.url} width="50px" height="50px" />
        
        
        
        <div className="sidebar_chat_items">
            <div className="sidebar_chat_item_info">
                <h4>{items.name}</h4>
                <p></p>
            </div>
                <p></p>

            
        </div>
        </div>
        
        
    
    
  );
}

export default SidebarChat;