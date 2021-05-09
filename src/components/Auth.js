import React from 'react';
import firebase, {providerTwitter} from "../Firebase";

class Auth extends React.Component{
  handleLogin = () => {
    firebase.auth().signInWithPopup(providerTwitter)
    .then(res => {
      console.log(res);
      //TODO: ex. storeに送信, DB保存,...
    }).catch(error => {
      console.log(error);
    });
  };

  handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log("Sucsess sign in")
    }).catch((error) => {
      console.log(error);
    });
  };

  render(){
    return(
      <div>
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleLogout}>Logout</button>        
      </div>
    );
  }
};

export default Auth;
