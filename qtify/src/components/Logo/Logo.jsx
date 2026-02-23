import React from "react";
import LogoImage from "../../assets/logo.png";
import {Link} from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src={LogoImage} alt="logo" width={67} />
    </Link>
  )
}
