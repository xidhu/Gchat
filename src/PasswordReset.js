import React from "react";
import './PasswordReset.css'
import {resetPassword} from './Authentication';
import {Button,Input,IconButton} from '@material-ui/core';
import {Link} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Redirect} from "react-router-dom";
class PasswordReset extends React.Component{

    constructor(){
        super();
        this.state = {
            val_email : false,
            email:"",
            isReset:false,
        };
        this.hasChanged = this.hasChanged.bind(this);
        this.resetClicked = this.resetClicked.bind(this);
        

    }
    hasChanged = (e) => {
        
        if(e.placeholder === "Enter Registered Email"){
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
    }
    resetClicked = () => {

      if(this.state.val_email){
        resetPassword(this.state.email);
        this.setState({isReset:true});
      }
      else{
        alert("Enter Valid Email..!");
      }
  
    }
  render(){
    return !this.state.isReset ? (
      <div className="reset">
          <div className="reset_body">'
          <Link to="/">
              <IconButton>
                <ArrowBackIcon style={{fontSize : "36px"}} className="bk"/>
            </IconButton>
              </Link>
              <div className="reset_input_fields">
              <p className="reset_chat_text">Password Reset</p>
                <Input className="reset_input" placeholder="Enter Registered Email" type="email"
                onChange={(e) => {this.hasChanged(e.target)}} error={this.state.em_err}/>
                
                <Button className="reset_button" onClick={this.resetClicked}>Reset</Button>
                <p className="reset_text">©Xidhu 2020,All Rights Reserved</p>
                
              </div>
               
              
          </div>
          
      </div>
  ):(
    <Redirect to="/"/>
  );
  }
}

export default PasswordReset;