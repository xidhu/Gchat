import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './PasswordReset.css'
import {Button} from '@material-ui/core';
import './index.css';

try{
  var online = navigator.onLine;
  localStorage.getItem("");
  if(online){
    ReactDOM.render(
      <App/>
      ,
      document.getElementById('root')
    );
  }
  else{
    ReactDOM.render(
      <div className="reset">
          <div className="reset_body">'
              <p className="reset_chat_text">Internet Not Found</p>
              <div className="reset_input_fields">
              <Button className="reset_button" onClick={() =>{location.reload();}} >Retry</Button>
                <p className="reset_text_p">©Galexy inc 2020,All Rights Reserved</p>
              </div>
               
              
          </div>
          
      </div>
      ,
      document.getElementById('root')
    );
  }
}
catch(e){
  ReactDOM.render(
    <div className="reset">
          <div className="reset_body">'
              <p className="reset_chat_text">Cookies Not Enabled..!</p>
              <div className="reset_input_fields">
              <Button className="reset_button" onClick={() =>{location.reload();}}>Enable Cookies</Button>
                <p className="reset_text_p">©Galexy inc 2020,All Rights Reserved</p>
              </div>
               
              
          </div>
          
      </div>
    ,
    document.getElementById('root')
  );
  confirm("This Application Can't Run without allowing cookies");
}


