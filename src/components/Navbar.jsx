import React from "react";
import logoNav from "../assets/img/misc/logo_nav.svg";
import Folder from "./Folder";

// Se pasa el arreglo de carpetas minimizadas a la navbar para que las muestre
// Al hacer click en una de las carpetas minimizadas se ejecuta la función pasada por parametro (navToDesk),
// a la cual se le envía por parametro el nombre de la carpeta que fue clickeada para abrir o cerra la que corresponda.
export default function Navbar({ minimized, navToDesk, navToAuthors }) {

  return (
    <nav className="fixed bottom-0 w-full border-t-2 border-black text-white z-10 bg-[#CBDF00] shadow lg:h-20 ">
      <ul className="items-center flex container h-16 lg:h-wb-fill nav-list">
        <li className="h-full w-1/5 md:w-1/6 lg:w-32">
          <div className="h-wb-fill w-wb-fill text-center border-r-2 border-black bg-[#F85031] md:w-32  menu">
            <button
              className={
                "h-wb-fill w-3/4 transition ease-in-out delay-150 hover:-translate-y-8 hover:scale-110 duration-300 xl:h-auto "
              }
              onClick={() => navToAuthors(true)}
            >
              <img
                src={logoNav}
                alt=""
                className="w-full h-3/4  xl:w-20 xl:p-3"
              />
            </button>
          </div>
        </li>
        <li className="ml-3 lg:ml-0">
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
