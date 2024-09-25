import React from "react";
import logoArti from "../assets/img/logo_arti.svg";

const Logo = () => {
  return (
    <div className="relative -z-10 h-screen flex items-center justify-center">
      <div className="absolute inset-0 m-auto size-1/4">
        <img src={logoArti} alt=""/>
      </div>
    </div>
  );
};

export default Logo;
