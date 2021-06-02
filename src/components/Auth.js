import React from 'react';
import firebase, {auth, providerTwitter} from "../Firebase";
import authStyle from "./auth.module.scss";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Auth extends React.Component{
  constructor(props){
    super(props);
  };

  handleLoginAnonymous = () => {
    let user = firebase.auth().currentUser;
    auth.signInAnonymously();
    this.props.updateState({isLogged: true, user: user});
  };

  handleLoginTwitter = () => {
    let currentUser = firebase.auth().currentUser;

    firebase.auth().languageCode = 'ja';

    auth
    .signInWithPopup(providerTwitter)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      
      this.props.updateState({isLogged: true, user: currentUser});
    }).catch((error) => {
      console.log(error);
    });
  }

  handleLogout = () => {
    auth.signOut().then(() => {
      console.log("success sign out");
    }).catch((error) => {
      console.log(error);
    });
    this.props.updateState({isLogged: false});
  };

  render(){
    let loginAnonymous;
    let loginTwitter;
    let logout;
    let user = this.props.isLogged;

    if (this.props.isLogged) {
      loginAnonymous = null;
      loginTwitter = null;
      logout = <button onClick={this.handleLogout} id="logout">Logout</button>;
      console.log(user);
    } else {
      loginAnonymous = <button onClick={this.handleLoginAnonymous} id="login" className={authStyle.login}>Login</button>;
      loginTwitter = <button onClick={this.handleLoginTwitter} id = "loginTwitter" className={`${authStyle.twitter} ${authStyle.login}`}><FontAwesomeIcon icon={faTwitter} className={authStyle.twitter} />Login with Twitter</button>
      logout = null;
      console.log(user);
    };
    
    return(
      <div>
        {loginAnonymous}
        {loginTwitter}
        {logout}
      </div>
    );
  }
};

export default Auth;
