import React from 'react';
import "./Chatbox.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
function ChatBox() {

        return (
            <div className="ChatBox">
                <div className="chat_bar">
                        <div className="chat_bar_det">
                        <AccountCircleIcon style={{fontSize:"42px",color:"#c4c4c4"}}/>
                        <div className="chat_bar_details">
                            <h3>roomName</h3>
                        <p>asda,sad,a,dda</p>
                        </div>
                        </div>
                    
                    <div className="chat_right_icons">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                       
                    </div>
                    </div>
                <div className="chat_body">
                <p className={`chat_massage ${false &&"chat_reciever"}`}>
                    <span className="chat_name">
                        Name
                    </span>
                       Hey Guys
                       <span className="chat_time">
                            5:00 PM
                       </span>
                    </p>
                    
                </div>
                <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon style={{color:"#c4c4c4"}}/>
                </IconButton>
                    <form className="send">
                        <input  id="chatbox" type="text"   name="" />
                        
                        
                        <IconButton >
                            <SendIcon style={{color:"#c4c4c4"}}/>
                        </IconButton>
                        
                        
                    
                    </form>
                    
                    <IconButton>
                    <MicIcon style={{color:"#c4c4c4"}}/>
                    </IconButton>
                    
                </div>
            </div>
            
        );
    
}



export default ChatBox;