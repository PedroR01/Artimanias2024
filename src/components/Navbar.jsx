import React from "react";
import logoNav from "../assets/img/logo_nav.png";
import Folder from "./Folder";

// Se pasa el arreglo de carpetas minimizadas a la navbar para que las muestre
// Al hacer click en una de las carpetas minimizadas se ejecuta la función pasada por parametro (navToDesk),
// a la cual se le envía por parametro el nombre de la carpeta que fue clickeada para abrir o cerra la que corresponda.
export default function Navbar({ minimized, navToDesk }) {
  return (
    <nav className="sticky mt-20 mx-auto bottom-4 w-5/6 p-2 text-white z-10 bg-[#CBDF00] rounded-lg">
      <ul className="justify-between items-center flex container mx-auto">
        <li className="h-full">
          <div className="">
            <img src={logoNav} alt="" />
          </div>
        </li>
        <li>
          <ul className="justify-between items-center flex container mx-auto">
            {minimized.map((folder) => (
              <li key={folder}>
                <Folder
                  title={folder}
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
