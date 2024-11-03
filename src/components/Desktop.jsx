import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Folder from "./Folder";
import Window from "./Window";
import Info from "./Info";
import AuthorsList from "./AuthorsList";

export default function Desktop() {
  const [whichOpen, setWhichOpen] = useState(null);
  const [foldersMinimized, setFoldersMinimized] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);
  const [authorsOpen, setAuthorsOpen] = useState(false);
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

  const folders = {
    PA: "Procesos y aprendizaje",
    RSI: "Redes sociales e internet",
    FN: "Fantasía y narrativa",
    CA: "Control y artificialidad",
    SC: "Social y cultural",
    NO: "Natural y lo orgánico",
    IC: "Identidad y cuerpos",
    ARTI: "Conocer Artimañas"
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

  const handleNavToAuthors = () => {
    setAuthorsOpen((prevAuthorsOpen) => !prevAuthorsOpen); // Alterna el estado de info
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
        <section className="relative w-full z-10">
          <ul className="grid grid-cols-2 auto-rows-fr gap-4 items-center mt-8 md:ml-12">
            <li>
              <Folder
                title={folders.RSI}
                titleBg={"bg-[#9EDEFC]"}
                onFolderClick={() => openFolder(folders.RSI)}
              />
            </li>
            <li>
              <Folder
                title={folders.IC}
                titleBg={"bg-[#D1C1B4]"}
                onFolderClick={() => openFolder(folders.IC)}
              />
            </li>
            <li>
              <Folder
                title={folders.FN}
                titleBg={"bg-[#FF73FF]"}
                onFolderClick={() => openFolder(folders.FN)}
              />
            </li>
            <li>
              <Folder
                title={folders.NO}
                titleBg={"bg-[#27AE5F]"}
                onFolderClick={() => openFolder(folders.NO)}
              />
            </li>
            <li>
              <Folder
                title={folders.CA}
                titleBg={"bg-[#CBDF00]"}
                onFolderClick={() => openFolder(folders.CA)}
              />
            </li>
            <li>
              <Folder
                title={folders.SC}
                titleBg={"bg-[#8477FE]"}
                onFolderClick={() => openFolder(folders.SC)}
              />
            </li>
            <li>
              <Folder
                title={folders.PA}
                titleBg={"bg-[#FFDD6A]"}
                onFolderClick={() => openFolder(folders.PA)}
              />
            </li>
            <li className="absolute -bottom-24 right-9">
              <Folder
                title={folders.ARTI}
                titleBg={"bg-[#F85031]"}
                onFolderClick={() => openFolder(folders.ARTI)}
              />
            </li>
          </ul>
        </section>
      </div>

      {authorsOpen && ( //Abrir pestaña info
        <AuthorsList
          onAction={(action) => {
            if (action === "close") {
              setAuthorsOpen(false);
            }
          }}
        />
      )}
      <Navbar
        minimized={foldersMinimized}
        navToDesk={handleNavToDesk} // Pasa el nombre de la carpeta clickeada
        navToAuthors={handleNavToAuthors} // Pasa el estado del booleano del boton
      />
    </>
  );
}
