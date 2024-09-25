import React from "react";

/* Images */
import folder from "../assets/img/folder.png";
import ra_folder from "../assets/img/ra_icon.svg";
import ae_folder from "../assets/img/ae_icon.svg";
import mp_folder from "../assets/img/mp_icon.svg";
import vj_folder from "../assets/img/vj_icon.svg";

export default function Folder({ title, onFolderClick }) {
  const folderMap = {
    realidadaumentada: ra_folder,
    arteelectronico: ae_folder,
    mapping: mp_folder,
    videojuegos: vj_folder,
  };

  return (
    <>
      <button onClick={() => onFolderClick()}>
        <div className="pl-4 relative w-48 h-28 mt-10">
          <img className="absolute w-32 h-24" src={folder} alt="" />
          <img
            className="absolute w-1/2 h-16 left-8 top-5"
            src={folderMap[title.replace(/\s+/g, "").toLowerCase()]}
            alt=""
          />
        </div>
      </button>
      <h3 className="pl-4 font-bold">{title.toUpperCase()}</h3>
    </>
  );
}
