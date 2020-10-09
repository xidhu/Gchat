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
import {
    useParams
  } from "react-router-dom";
import { getProfile } from './save';
import { useCollection,useDocumentDataOnce} from 'react-firebase-hooks/firestore';
function ChatBox() {
     let user = getProfile();
     let {uid} = useParams();
     uid = uid.split("_");
     uid[0] === user.uid ? uid = uid[1]:uid = uid[0];
     const [textFieldText,setText] = useState("");
     const [chat,setChat] = useState(null);
     const [chats,loading,error] = useCollection(
         
        chat ? db.collection("chats").doc(chat.chatId)
        .collection("chats").orderBy("time"):null,{snapshotListenOptions:{includeMetadataChanges:true}}
    )

    const [reciever,load,err] = useDocumentDataOnce(db
        .doc("users/"+uid),)
   
     useEffect(()=>{
        db
        .collection("chats")
        .doc(uid+"_"+user.uid)
        .onSnapshot((snap) => {
            if(snap.exists){
                setChat(snap.data());
            }
            else{
                db
        .collection("chats")
        .doc(user.uid+"_"+uid)
        .onSnapshot((snapshot) => {
            if(snapshot.exists){
                setChat(snapshot.data());
            }
        })
            }
        })
        
     },[chat])

   
     
     
   
     
     const sentClicked = () => {
        if(textFieldText !== ""){
            if(chat === null){
                db
                    .doc("chats/"+user.uid+"_"+uid)
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
                <div className="chat_body" scroll="no">
                    {
                      chats?
                        chats.docs.map((e,i) => (
                            <ChatMassege 
                            key={i}
                            name={e.data().name}
                            you={e.data().name === user.name ? true:false} 
                            message={e.data().message}
                            time={e.data().time.split(",")[1]}/>
                          ))
                      
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