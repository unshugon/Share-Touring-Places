import React from "react";
import footerStyle from "./footer.module.scss";

class Footer extends React.Component {
  render() {
    return(
      <div className={footerStyle.footer}>
        ©︎ 2021 Share Touring Spot
      </div>
    );
  };
}

export default Footer;
