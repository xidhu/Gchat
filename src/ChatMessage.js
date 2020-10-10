import React from 'react';
import "./Chatbox.css";

class ChatMessage extends React.Component {
    


    render(){
        if(this.props !== null){
            return (
                
                    <div className={ this.props.you ?"chat_reciever":"chat_massage"}>
                            <span className="chat_name">
                                {this.props.name != null ? this.props.you ?"You":this.props.name:"Unknown"}
                            </span>
                            <p className="msg">
                            {this.props.message != null ? this.props.message :"Hello"}
                            </p>
                            
                               <span className="chat_time">
                               {this.props.time != null ? this.props.time :"00:00 PM"}
                               </span>
                            </div>
                            
                
            );
        }
        else{
            return (<div/>);
        }
    }
}
export default ChatMessage;