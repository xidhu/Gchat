import Login from './Login';
import "./App.css";
import PasswordReset from './PasswordReset'
import {auth} from "./firebase";
import { CircularProgress } from '@material-ui/core';
import {setProfile,clearProfile} from './save';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import React,{useEffect, useState} from "react";
import SignUp from "./SignUp";
import {userExists} from "./Authentication";
import ChatPage from './ChatPage';

function App() {


    const [isSignIn,setSignIn] = useState("0");
    const [online,setOnline] = useState(true);

    useEffect(()=>{
        auth.onAuthStateChanged(function (user) {
            if (user) {
                
                if(user.emailVerified){
                    if(userExists(user)){
                        clearProfile();
                        setProfile(user);
                        setSignIn("1");
                    }
                    
                    
                    
                }
                else{
                    
                    setSignIn("2");
                }
                
            } 
            
            else {
               
                setSignIn("2");
                clearProfile();
            }
          });
    },[isSignIn]);

    

      
        if(online){
            return isSignIn === "1" ? (
                <ChatPage/>
            ):isSignIn === "2"?
            (
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
            ):(
                <div className="app">
                <div className="app_body">
                    <div>
                        <CircularProgress color="secondary"  size={80} className="progress"/>
                    </div>
                        
                   </div>
                </div>
            );
        }
        else{
            location.reload();
        }
    
    
    
}

export default App;