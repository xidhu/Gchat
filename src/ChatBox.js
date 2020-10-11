import React,{useEffect, useState} from 'react';
import "./Chatbox.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton,Menu,MenuItem} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import db from "./firebase";
import ChatMassege from './ChatMessage';
import {
    useParams
  } from "react-router-dom";
import { getProfile} from './save';
import { useCollectionData,useDocumentData} from 'react-firebase-hooks/firestore';
const ChatBox=()=> {
     let user = getProfile();
     let {uid} = useParams();
     uid = uid.split("_");
     let val = null;
     uid[0] === user.uid ? uid = uid[1]:uid = uid[0];
     let chatId = user.uid > uid ?user.uid+"_"+uid:uid+"_"+user.uid;
     const [textFieldText,setText] = useState("");
     let chat = null;
     
     const [reciever] = useDocumentData(db
        .doc("users/"+uid),)

     if(user.uid < uid){
         const [chate] = useDocumentData(
                db
            .doc("chats/"+uid+"_"+user.uid)
            )
        chat = chate;
        if(chat){
            try{
                
        Object.keys(chat).forEach((key) =>{
            if(key === user.uid){
                val = chat[key];
            }
        })
        
            }
            catch(e){

            }
        }
            
    }
    else{
        const [chate] = useDocumentData(
            db
        .doc("chats/"+user.uid+"_"+uid)
        )
        chat = chate;
       if(chat){
            try{
                 
        Object.keys(chat).forEach((key) =>{
            if(key === user.uid){
                val = chat[key];
            }
        })
        
            }
            catch(e){
                
            }
        }
    }

    
   
     const [chats] = useCollectionData(
         
        chat ? db.collection("chats").doc(chat.chatId)
        .collection("chats").where("time",">",val?val:"0").orderBy("time","desc").limit(100):null,{snapshotListenOptions:{includeMetadataChanges:true}}
    )
        
    

     const sentClicked = () => {
        if(textFieldText !== ""){
            if(!chats){
                
                db
                    .doc("chats/"+chatId)
                    .set({
                        chatId : user.uid+"_"+uid,
                    },{merge : true});
                db.collection("chats").doc(user.uid+"_"+uid)
                .collection("chats").add({
                    name : user.name,
                    message : textFieldText,
                    time : new Date().toLocaleString("en-US"),
                })
            }
            else{
                db.collection("chats").doc(chat.chatId)
                .collection("chats").add({
                    name : user.name,
                    message : textFieldText,
                    time : new Date().toLocaleString("en-US"),
                })
                
            }
        }
        setText("");
     }

     const changeText = (e) => {
        setText(e.target.value);
     }
     const Options = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = (e) => {
            if(e.id === "clr"){
             if(chats && chats !== null){
                let t = chats.reverse().pop().time;
                db
                .collection("chats")
                .doc(chatId)
                .set({
                    [user.uid] : t ,
                },{merge:true}).then((r) =>{
                    
                    setAnchorEl(null);
                    
                    
                })
            }
            }
            
        };
      
        return (
          <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem id="clr" onClick={(e) =>{handleClose(e.target)}}>Clear Chat</MenuItem>
            </Menu>
          </div>
        );
      }


        return (
            <div className="ChatBox">
                <div className="chat_bar">
                        <div className="chat_bar_det">
                        <AccountCircleIcon style={{fontSize:"42px",color:"#c4c4c4"}}/>
                        <div className="chat_bar_details">
                        <h3>{reciever?reciever.name:"User"}</h3>
                        <p>{reciever? reciever.online?"Online":"Offline":"Offline"}</p>
                        </div>
                        </div>
                    
                    <div className="chat_right_icons">
                       
                        <Options/>
                       
                    </div>
                    </div>
                <div className="chat_body" id="srl">
                    {
                      chats?
                        chats.map((e,i) => {
                           if(e){
                            return <ChatMassege 
                            key={i}
                            name={e.name}
                            you={e.name === user.name ? true:false} 
                            message={e.message}
                            time={e.time.split(",")[1]}/>
                           }
                        })
                      
                      :<div/>
                    } 
                    
                </div>
                <div className="chat_footer">
                    <div className="sent">
                        <input value={textFieldText} onChange={changeText} onKeyPress={(event) => {
    if (event.key === "Enter") {
      sentClicked()
    }
  }}  id="chatbox" type="text" />
                        <IconButton  onClick={sentClicked}>
                            <SendIcon style={{color:"#c4c4c4"}}/>
                        </IconButton>
                        
                        
                    
                    </div>
                    
                    
                </div>
            </div>
            
        );
    
}





export default ChatBox;