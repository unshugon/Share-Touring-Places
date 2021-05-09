import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Print from "./Print";
import Send from "./Send";
import Auth from"./Auth";

class Main extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <Auth />
        <Send />
        <Print />
        <Footer />
      </div>
    );
  }
}

export default Main;
