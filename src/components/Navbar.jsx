import React, { useState } from "react";
import logoNav from "../assets/img/logo_nav.svg";
import Folder from "./Folder";

// Se pasa el arreglo de carpetas minimizadas a la navbar para que las muestre
// Al hacer click en una de las carpetas minimizadas se ejecuta la función pasada por parametro (navToDesk),
// a la cual se le envía por parametro el nombre de la carpeta que fue clickeada para abrir o cerra la que corresponda.
export default function Navbar({ minimized, navToDesk, navToInfo }) {
  //xl:bottom-7

  return (
    <nav className="sticky mx-auto bottom-4 w-5/6 p-2 text-white z-10 bg-[#cddf00c5] shadow  rounded-lg  xl:h-24 ">
      <ul className="items-center flex container mx-auto xl:h-fit">
        <li className="h-full w-1/6 xl:w-24 ">
          <div className="relative right-2 bottom-2 h-2 w-28 rounded-lg bg-[#ff73ffc5] xl:h-full menu">
            <button
              className={
                "transition ease-in-out delay-150 hover:-translate-y-8 hover:scale-110 duration-300 xl:h-wb-fill xl:w-wb-fill "
              }
              onClick={() => navToInfo(true)}
            >
              <img
                src={logoNav}
                alt=""
                className="w-full sm:w-1/2 h-3/4 xl:relative xl:w-24 xl:left-2 xl:p-3"
              />
            </button>
          </div>
        </li>
        <li className="md:ml-6">
          <ul className="justify-between items-center flex container mx-auto">
            {minimized.map((folder) => (
              <li className="md:ml-3" key={folder}>
                <Folder
                  title={folder}
                  fitIn={"nav"}
                  onFolderClick={() => navToDesk(folder)} // Pasa el nombre de la carpeta clickeada
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
