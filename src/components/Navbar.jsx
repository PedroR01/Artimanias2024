import React from "react";
import logoNav from "../assets/img/logo_nav.png";
import folder from "../assets/img/folder.png";

const Navbar = () => {
  return (
    <nav className="sticky mt-20 mx-auto bottom-0 w-5/6 p-2 text-white z-10 bg-[#CBDF00] rounded-lg">
      <ul className="justify-between items-center flex container mx-auto">
        <li className="h-full">
          <div className="">
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
