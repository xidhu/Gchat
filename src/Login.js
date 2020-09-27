import React from "react";
import './Login.css'
import {Button,Input} from '@material-ui/core';
import {Link} from "react-router-dom";
import {signInWithEmail} from "./Authentication";
import {Redirect} from "react-router-dom";
class Login extends React.Component{

  constructor(){
    super();
    this.state = {
      em_err : false,
      pass_err : false,
      val_email : false,
      email:"",
      password:"",
      isSignIn : false,
    };
    this.hasChanged = this.hasChanged.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  hasChanged = (e) => {
      
    if(e.placeholder === "Email"){
      this.setState({val_email : false});
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(String(e.value).toLowerCase())){
          this.setState({em_err : false,
                          email : e.value,
                        val_email :true});
          
      }
      else{
        this.setState({em_err : true});
      }
      if(e.value === ""){
        this.setState({em_err : false});
      }


    }
    else if(e.placeholder === "Password"){
      this.setState({val_pass: false});
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(re.test(String(e.value))){
          this.setState({pass_err : false,password : e.value,val_pass: true});
      }
      else{
        this.setState({pass_err : true});
      }
      if(e.value === ""){
        this.setState({pass_err : false});
      }
    }
  }

  loginClicked = () => {

    if(this.state.val_email){
      if(this.state.val_pass){
        signInWithEmail(this.state.email,this.state.password);
        this.setState({isSignIn:true});
      }
      else{
        alert("Password is incorrect");
      }
    }
    else{
      alert("Enter Valid Email..!");
    }

  }

    
  render(){
    return !this.state.isSignIn ?(
      <div className="login">
          <div className="login_body">
              
              
              <div className="input_fields">
                <p className="chat_text">GChat</p>
                <p className="login_text">Login</p>
                <Input className="login_input" type="email" placeholder="Email" onChange={(e) => {this.hasChanged(e.target)}} error={this.state.em_err}/>
                <Input className="login_input" type="password" placeholder="Password" onChange={(e) => {this.hasChanged(e.target)}} error={this.state.pass_err}/> 
                <Button className="login_button" onClick={this.loginClicked}>Login</Button>
                <span className="signup_text"><Link to="/forgot">Forgot Password?</Link></span>
                <span className="signup_text">Don't You Have An account? 
                <Link to="/signup">Sign Up Now</Link>
                </span>
                <p className="signup_text">©Galexy inc 2020,All Rights Reserved</p>
                
              </div>
               
              
          </div>
          
      </div>
  ):(<Redirect to="/"/>);
  }
}

export default Login;