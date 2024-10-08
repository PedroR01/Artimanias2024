import React from "react";
import logoNav from "../assets/img/logo_nav.svg";
import Folder from "./Folder";

// Se pasa el arreglo de carpetas minimizadas a la navbar para que las muestre
// Al hacer click en una de las carpetas minimizadas se ejecuta la función pasada por parametro (navToDesk),
// a la cual se le envía por parametro el nombre de la carpeta que fue clickeada para abrir o cerra la que corresponda.
export default function Navbar({ minimized, navToDesk, navToInfo }) {
  return (
    <nav className="sticky mx-auto bottom-4 w-5/6 p-2 text-white z-10 bg-[#CBDF00] rounded-lg">
      <ul className="items-center flex container mx-auto">
        <li className="h-full w-1/6">
          <div className="">
            <button onClick={() => navToInfo(true)}>
              <img src={logoNav} alt="" className="w-full sm:w-1/2 h-3/4" />
            </button>
          </div>
        </li>
        <li>
          <ul className="justify-between items-center flex container mx-auto">
            {minimized.map((folder) => (
              <li key={folder}>
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
