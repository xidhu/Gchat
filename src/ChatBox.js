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
function ChatBox() {

     let user = getProfile();
     let {uid} = useParams();
     uid = uid.split("_");

     uid[0] === user.uid ? uid = uid[1]:uid = uid[0];
     const [reciever,getReciever] = useState(null);
     const [textFieldText,setText] = useState("");
     const [chat,setChat] = useState(null);

     useEffect(() => {
         
            db
                .doc("users/"+uid)
                .get()
                .then(function (doc) {
                    getReciever({
                        uid : doc.data().uid,
                        name : doc.data().name,
                        online : doc.data().online,
                    })
                })
                .catch(function (error) {
            
                })
         
     },[reciever]);
     useEffect(()=>{
         db
         .collection("chats")
         .doc(uid+"_"+user.uid)
         .get().then((doc) => {
            setChat(doc.data());
         }).catch((err) =>{
            db
            .collection("chats")
            .doc(user.uid+"_"+uid)
            .get().then((doc) => {
                setChat(doc.data());
         })
         });
     },[chat]);

     const sentClicked = () => {
        if(textFieldText !== ""){
            if(chat !== null){
                db
                    .doc("chats/"+user.uid+"_"+uid)
                    .set({
                        chatId : user.uid+"_"+uid,
                        chat : [
                            {
                                name : user.name,
                                message : textFieldText,
                               
                            }
                        ]
                    },{merge : true});
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
                        <h3>{reciever !== null ?reciever.name:"User"}</h3>
                        <p>{reciever !==null ? reciever.online?"Online":"Offline":"Offline"}</p>
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
                    <ChatMassege name={"Sasi"} 
                    you={false} 
                    message={"hfhzsdhsadashgdhgggjgjkgjkkgasjkfagshdfhsadhj"}
                    time={"05:00 PM"}/>
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