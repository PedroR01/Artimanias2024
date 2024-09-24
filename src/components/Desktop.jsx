import React, { useState } from "react";
import Navbar from "./Navbar";
import Folder from "./Folder";
import Window from "./Window";

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

      <section>
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

      <Navbar
        minimized={foldersMinimized}
        navToDesk={handleNavToDesk} // Pasa el nombre de la carpeta clickeada
      />
    </>
  );
}
