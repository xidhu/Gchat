import React from "react";
import Sidebar from "./Sidebar";
import "./App.css";

function ChatPage(){

    return (

        <div className="app">
        <div className="app_body">
                <Sidebar/>
                <div className="bg"/>
           </div>
        </div>
    );
}

export default ChatPage;