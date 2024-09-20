import React from "react";
import logoNav from "../assets/img/logo_nav.png";
import folder from "../assets/img/folder.png";

const Navbar = () => {
  return (
    <nav className="sticky mt-8 mx-auto bottom-0 w-full p-2 text-white z-10 bg-[#CBDF00] ">
      <ul className="justify-between items-center flex container mx-auto">
        <li className="h-full">
          <div className="bg-[#FF73FF]">
            <img src={logoNav} alt="" />
          </div>
        </li>
        <li>
          <ul className="justify-between items-center flex container mx-auto">
            <li>
              <img className="w-14 h-12" src={folder} alt="" />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
