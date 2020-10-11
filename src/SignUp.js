import React,{Component} from 'react';
import {signUpWithEmail} from "./Authentication";
import './SignUp.css';
import {Link,Redirect} from "react-router-dom";
import {Button,Input,IconButton} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
class SignUp extends Component{

    constructor(){
      super();
      this.hasChanged = this.hasChanged.bind(this);
      this.signUpPressed = this.signUpPressed.bind(this);
      this.state = {
        em_err : false,
        pass_err : false,
        pass_con_err :false,
        val_email : false,
        val_pass : false,
        val_pass_con :false,
        email:"",
        password:"",
        isSignUp:false,
        name : "",
      };
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
      else if(e.placeholder === "Confirm password"){
           this.setState({val_pass_con: false}); 
          if(this.state.password === e.value){
            this.setState({pass_con_err : false,val_pass_con: true});
          }
          else{
            this.setState({pass_con_err : true});
          }
          if(e.value === ""){
            this.setState({pass_con_err : false});
          }
      }
      else if(e.placeholder === "Name"){
          this.setState({name:e.value});
      }
      
    }

    signUpPressed = () =>{

      if(this.state.name !== ""){
        if(this.state.val_email){
          if(this.state.val_pass_con){
            signUpWithEmail(this.state.email,this.state.password,this.state.name);
            this.setState({isSignUp:true});
          }
          else if(this.state.val_pass === false){
            alert("Password Should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
          }
          else if(this.state.val_pass_con === false){
            alert("Password do not match..!");
          }
        }
        else{
          alert("Enter Valid Email..!");
        }
      }
      else{
          alert("Enter Your Name..!");
      }

    }


    render(){
      return !this.state.isSignUp ? (
        <div className="sign_up">
          <div className="signup_body">
              <Link to="/">
              <IconButton>
                <ArrowBackIcon style={{fontSize : "36px"}} className="bk"/>
            </IconButton>
              </Link>
             
                
    
              <div className="signup_input_fields">
              <p className="signup_chat_text">SignUp</p>
                <Input  onChange={(e) => this.hasChanged(e.target)} className="signup_input" placeholder="Name" type="text" />
                <Input error={this.state.em_err} onChange={(e) => this.hasChanged(e.target)} className="signup_input" placeholder="Email" type="email" />
                <Input error={this.state.pass_err} onChange={(e) => this.hasChanged(e.target)} className="signup_input" placeholder="Password" type="password"/> 
                <Input error={this.state.pass_con_err} onChange={(e) => this.hasChanged(e.target)} className="signup_input" placeholder="Confirm password" type="password"/> 
                <Button className="signup_button" onClick={this.signUpPressed} >Sign Up</Button>
                <p className="signup_text">©Xidhu 2020,All Rights Reserved</p>
                
              </div>
               
              
          </div>
          
      </div>
    ):(
      <Redirect to="/"/>
    );
}
}

export default SignUp;