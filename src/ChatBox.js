import React,{useEffect,useState} from 'react';
import "./Chatbox.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import db from "./firebase";
import ChatMassege from './ChatMessage';
import { animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import {
    useParams
  } from "react-router-dom";
import { getProfile } from './save';
import { useCollectionData,useDocumentData} from 'react-firebase-hooks/firestore';
const ChatBox=()=> {
     let user = getProfile();
     let {uid} = useParams();
     uid = uid.split("_");
     uid[0] === user.uid ? uid = uid[1]:uid = uid[0];
     const [textFieldText,setText] = useState("");
     let chat = null;
     const [reciever,load,err] = useDocumentData(db
        .doc("users/"+uid),)

     if(user.uid < uid){
         const [chate] = useDocumentData(
                db
            .doc("chats/"+uid+"_"+user.uid)
            )
        chat = chate;
            
    }
    else{
        const [chate] = useDocumentData(
            db
        .doc("chats/"+user.uid+"_"+uid)
        )
        chat = chate;
    }
    
     const [chats,loading,error] = useCollectionData(
         
        chat ? db.collection("chats").doc(chat.chatId)
        .collection("chats").orderBy("time","desc").limit(100):null,{snapshotListenOptions:{includeMetadataChanges:true}}
    )
   

     const sentClicked = () => {
        if(textFieldText !== ""){
            if(!chats){
                let chatId = user.uid > uid ?user.uid+"_"+uid:uid+"_"+user.uid;
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
                <IconButton>
                    <InsertEmoticonIcon style={{color:"#c4c4c4"}}/>
                </IconButton>
                    <div className="sent">
                        <input value={textFieldText} onChange={changeText}  id="chatbox" type="text" />
                        <IconButton  onClick={sentClicked}>
                            <SendIcon style={{color:"#c4c4c4"}}/>
                        </IconButton>
                        
                        
                    
                    </div>
                    
                    <IconButton>
                    <MicIcon style={{color:"#c4c4c4"}}/>
                    </IconButton>
                    
                </div>
            </div>
            
        );
    
}





export default ChatBox;