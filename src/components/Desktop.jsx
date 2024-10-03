import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Folder from "./Folder";
import Window from "./Window";
import Info from "./Info";
import logoArti from "../assets/img/logo_arti.svg";
import pjRa from "../assets/img/ra_icon.svg";
import pjVj from "../assets/img/vj_icon.svg";
import cubo from "../assets/img/cubo_icon.svg";

export default function Desktop() {
  const [whichOpen, setWhichOpen] = useState(null);
  const [foldersMinimized, setFoldersMinimized] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      // Si el ancho de la ventana es menor a 768px, lo consideramos móvil.
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Llamada inicial para establecer el estado según el tamaño actual
    handleResize();

    // Limpia el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Si se abre una tesis minimizada, tiene que volver a tomar los datos de la misma
  useEffect(() => {}, [whichOpen]);

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

  const handleMinimized = (folderName) => {
    if (foldersMinimized.includes(folderName)) return;

    setFoldersMinimized((prevFolders) => {
      // Si es móvil y ya hay 3 carpetas minimizadas, aplica LIFO (Last In First Out). Max 6 carpetas minimizadas si es ver. desktop
      if ((isMobile && prevFolders.length >= 3) || prevFolders.length >= 6) {
        return [...prevFolders.slice(1), folderName]; // Elimina la primera y agrega la nueva
      }

      // Si no, simplemente agrega la nueva carpeta minimizada
      return [...prevFolders, folderName];
    });
  };

  const handleNavToInfo = () => {
    setInfoOpen((prevInfoOpen) => !prevInfoOpen); // Alterna el estado de info
  };

  return (
    <>
      {whichOpen && (
        <Window
          folderName={whichOpen}
          onAction={(action, whichFolder) => {
            // Si se recibio el parametro whichFolder, quiere decir que se abrio otra capa más de navegación
            // por ende se minimiza o cierra dicha carpeta.
            let folderName = whichOpen;
            if (whichFolder) folderName = whichFolder;
            if (action === "close") {
              if (foldersMinimized.includes(folderName)) {
                setFoldersMinimized((prevFolders) =>
                  prevFolders.filter((folder) => folder !== folderName),
                );
              }
            } else if (action === "minimize") {
              handleMinimized(folderName); // Minimiza la ventana
            }
            setWhichOpen(null);
          }}
        />
      )}

      {infoOpen && ( //Abrir pestaña info
        <Info
          isKnowMore={true}
          onAction={(action) => {
            if (action === "close") {
              setInfoOpen(false);
            }
          }}
        />
      )}

      <div className="relative flex">
        {/* Logo y personajes */}
        <div className="-z-10 h-screen flex items-center justify-center">
          <div className="absolute inset-0 m-auto size-1/4">
            <img src={logoArti} alt="" />
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
        navToInfo={handleNavToInfo} // Pasa el estado del booleano del boton
      />
    </>
  );
}
