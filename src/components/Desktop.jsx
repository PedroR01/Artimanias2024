import React, { useState } from "react";
import Navbar from "./Navbar";
import Folder from "./Folder";
import Window from "./Window";
import logoArti from "../assets/img/logo_arti.svg";
import pjRa from "../assets/img/ra_icon.svg";
import pjVj from "../assets/img/vj_icon.svg";
import cubo from "../assets/img/cubo_icon.svg";

export default function Desktop() {
  const [whichOpen, setWhichOpen] = useState(null);
  const [foldersMinimized, setFoldersMinimized] = useState([]);

  const folders = {
    RA: "Realidad Aumentada",
    AE: "Arte Electronico",
    VJ: "Videojuegos",
    MP: "Mapping",
  };

  const openFolder = (folderName) => {
    setWhichOpen(folderName); // Que carpeta/ventana se abre
  };

  const handleNavToDesk = (folderName) => {
    openFolder(folderName); // Abre la carpeta desde el Navbar
  };

  return (
    <>
      {whichOpen && (
        <Window
          folderName={whichOpen}
          isThesis={false}
          onAction={(action) => {
            if (action === "close") {
              if (foldersMinimized.includes(whichOpen))
                setFoldersMinimized(() =>
                  foldersMinimized.splice(
                    foldersMinimized.indexOf(whichOpen),
                    1,
                  ),
                );
            } else if (!foldersMinimized.includes(whichOpen)) {
              setFoldersMinimized((prevFolders) => [...prevFolders, whichOpen]);
            }
            setWhichOpen(null);
          }}
        />
      )}

    <div className="relative flex">

      {/* Logo y personajes */}
      <div className="-z-10 h-screen flex items-center justify-center">
        <div className="absolute inset-0 m-auto size-1/4">
          <img src={logoArti} alt=""/>
        </div>
        <div className="absolute bottom-[24%] right-[64%]">
          <div className="w-32 h-32 object-cover">
            <img src={cubo} alt="" className="" />
          </div>
        </div>

        <div className="absolute bottom-[20%] right-[12%]">
          <div className="w-32 h-32 object-cover">
            <img src={pjRa} alt="" className="scale-x-[-1] size-3/4" />
          </div>
        </div>

        <div className="absolute bottom-[12%] right-[20%]">
          <div className="w-32 h-32 object-cover">
            <img src={pjVj} alt="" className="size-3/4" />
          </div>
        </div>
      </div>
      
      <section className="relative z-10">
        <ul>
          <li>
            <Folder
              title={folders.RA}
              onFolderClick={() => openFolder(folders.RA)}
            />
          </li>
          <li>
            <Folder
              title={folders.AE}
              onFolderClick={() => openFolder(folders.AE)}
            />
          </li>
          <li>
            <Folder
              title={folders.VJ}
              onFolderClick={() => openFolder(folders.VJ)}
            />
          </li>
          <li>
            <Folder
              title={folders.MP}
              onFolderClick={() => openFolder(folders.MP)}
            />
          </li>
        </ul>
      </section>
    </div>

      <Navbar
        minimized={foldersMinimized}
        navToDesk={handleNavToDesk} // Pasa el nombre de la carpeta clickeada
      />
    </>
  );
}
