import "./App.css";
import Sidebar from "./Sidebar";
import ChatBox from './ChatBox';
import Login from './Login';
import PasswordReset from './PasswordReset'
import {
    BrowserRouter as Router,
    Switch,
    Route, 
  } from "react-router-dom";
import React from "react";
import SignUp from "./SignUp";
import {getProfile,eraseProfile} from "./save";

function App() {

    let isSignIn = false;
    let user = getProfile();
    if(user != null){
        if(user.isVerified){
            isSignIn = true;
        }
        else{
            eraseProfile();
        }
    }
    else{
            eraseProfile();
    }

      
    
    
    return isSignIn ? (
        <div className="app">
        <div className="app_body">
            <Router>
            <Switch>
                <Route path="/">
                    <Sidebar/>
                    <ChatBox/>
                </Route>
            </Switch>
            
            </Router>
           </div>
        </div>
    ):(
        <Router>
            <Switch>
                <Route path="/signup">
                    <SignUp/>
                </Route>
            </Switch>
            <Switch>
                <Route path="/forgot">
                    <PasswordReset/>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;