import React from 'react';
import firebase from "../Firebase";

class Auth extends React.Component{
  handleLogin = () => {
      loginWithTwitter();
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
