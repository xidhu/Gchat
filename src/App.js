import "./App.css";
import Sidebar from "./Sidebar";
import ChatBox from './ChatBox';
import Login from './Login';
import PasswordReset from './PasswordReset'
import {auth} from "./firebase";
import {
    BrowserRouter as Router,
    Switch,
    Route, 
  } from "react-router-dom";
import React,{useEffect, useState} from "react";
import SignUp from "./SignUp";

function App() {


    const [isSignIn,setSignIn] = useState(false);

    useEffect(()=>{
        auth.onAuthStateChanged(function (user) {
            if (user) {
                window.user = user;
                setSignIn(true);
            } else {
                window.user = null;
                setSignIn(false);
            }
          });
    },[isSignIn]);


    

      
        return isSignIn ? (
            <div className="app">
            <div className="app_body">
                <Router>
                <Switch>
                    <Route exact path="/">
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