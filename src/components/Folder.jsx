import React from "react";

import folderImages from "../assets/scripts/folderImages"

// El parametro fitIn solo se usa cuando se necesita mostrar la carpeta con otras dimensiones en otro lugar de la pantalla que no sea el escritorio
export default function Folder({ title, isCategory, titleBg, hoverBg, fitIn, onFolderClick }) {

  let dimensions = "w-28 h-24";
  let titleBox = "";
  let folderShadow = " thesis-folder-shadow ";
  let titleFont = " baloo-2-bold ";

  if (isCategory) {
    titleBox = " border-2 border-black rounded-md ";
    folderShadow = "";
    titleFont = " bebas-neue-regular ";
  }

  if (fitIn === "nav") {
    dimensions =
      "w-16 h-24 md:w-20 lg:w-32 transition ease-in-out delay-150 hover:-translate-y-8 hover:scale-110 duration-300 xl:h-wb-fill xl:w-wb-fill";
  }


  return (
    <div className={"text-wb-center cursor-pointer transition w-min hover:bg-opacity-25 hover:shadow-lg " + hoverBg} >
      <button
        className={"relative text-wb-center " + dimensions}
        onClick={() => onFolderClick()}
      >
        <div className={"md:w-20" + folderShadow}>
          <img
            src={folderImages[title.replace(/[\s.]+/g, "").toLowerCase()]}
            alt=""
          />
        </div>
      </button>
      {!fitIn && (<div className={titleBox + "justify-self-center w-fit px-4 " + titleBg}><h3 className={titleFont + "text-center w-max md:text-xl"}>
        {title.toUpperCase()}
      </h3> </div>

      )}
    </div>
  );
}
