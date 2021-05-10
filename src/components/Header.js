import React from "react";
import headerStyle from "./Header.module.scss";

class Header extends React.Component {
  render() {
    return (
    <h1 className={headerStyle.header}>Share Touring Spot</h1>
    );
  }
}

export default Header;
