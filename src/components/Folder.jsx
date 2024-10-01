import React from "react";

/* Images */
import folder from "../assets/img/folder.png";
import ra_folder from "../assets/img/ra_icon.svg";
import ae_folder from "../assets/img/ae_icon.svg";
import mp_folder from "../assets/img/mp_icon.svg";
import vj_folder from "../assets/img/vj_icon.svg";

export default function Folder({ title, fitIn, onFolderClick }) {
  const folderMap = {
    realidadaumentada: ra_folder,
    arteelectronico: ae_folder,
    mapping: mp_folder,
    videojuegos: vj_folder,
  };

  let dimensions = "w-28 h-24 mt-10";

  if (fitIn === "nav") {
    dimensions = "w-16 h-24 ";
  }

  return (
    <div className="hover:bg-blue-300 hover:bg-opacity-30 hover:shadow-lg cursor-pointer transition">
      <button
        className={"relative ml-4 text-wb-center " + dimensions}
        onClick={() => onFolderClick()}
      >
        <div className="">
          <img className="w-fit h-fit" src={folder} alt="" />
          <img
            className="absolute w-1/2 h-16 left-1/4 top-[20%]"
            src={folderMap[title.replace(/\s+/g, "").toLowerCase()]}
            alt=""
          />
        </div>
      </button>
      {!fitIn && (
        <h3 className="pl-5 font-bold tracking-wider font-mono w-min text-center">
          {title.toUpperCase()}
        </h3>
      )}
    </div>
  );
}
