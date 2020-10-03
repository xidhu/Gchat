import React from "react";
import Sidebar from "./Sidebar";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import ChatBox from "./ChatBox";

function ChatPage(){

    return (

        <div className="app">
        <div className="app_body">
        
                <Router>
                    <Sidebar/>
                    <Switch>
                        <Route exact path="/">  
                            <div className="bg"/>
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path="/chats/:uid">
                            <ChatBox/>
                        </Route>
                    </Switch>
                </Router>
                
           </div>
        </div>
    );
}

export default ChatPage;