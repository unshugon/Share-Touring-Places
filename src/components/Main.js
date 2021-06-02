import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Print from "./Print";
import Send from "./Send";
import Auth from"./Auth";
import mainStyle from "./main.module.scss";

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogged: false,
      user: null,
      send: null,
      print: null
    }
  }

  updateState(state) {
    this.setState(state);
  }

  render() {
    let send;
    let print;
    let voidHeight;
    if(this.state.isLogged){
      send = <Send user={this.state.user}/>;
      print = <Print />;
      voidHeight = null;
    }
    else{
      send = null;
      print = null;
      voidHeight = <div className={mainStyle.voidHeight}></div>
    }

    return(
      <div>
        <Header />
        <Auth updateState={this.updateState.bind(this)} isLogged={this.state.isLogged} />
        {send}
        {print}
        {voidHeight}
        <Footer />
      </div>
    );
  };
}

export default Main;
