import React from "react";
import folderImages from "../assets/scripts/folderImages"

// El parametro fitIn solo se usa cuando se necesita mostrar la carpeta con otras dimensiones en otro lugar de la pantalla que no sea el escritorio
export default function Folder({ title, isCategory, titleBg, hoverBg, fitIn, onFolderClick }) {
  // w-28 h-24

  let dimensions = "max-w-28 md:w-auto md:h-auto";
  let titleBox = "";
  let folderShadow = " thesis-folder-shadow ";
  let thesisFolderStyle = " border-black border-2 rounded-md ";
  let titleFont = " baloo-2-bold ";

  if (isCategory) {
    titleBox = " border-2 border-black rounded-md ";
    folderShadow = "";
    thesisFolderStyle = "";

    titleFont = " bebas-neue-regular ";
  }
  // w-16 h-24 md:w-24
  if (fitIn === "nav") {
    dimensions =
      "h-wb-fill w-wb-fill transition ease-in-out delay-150 hover:-translate-y-8 hover:scale-110 duration-300";
    if (title === "Procesos y Aprendizaje" || title === "Redes Sociales e Internet" || title === "Fantasía y Narrativa" || title === "Sociedad y Cultura" || title === "Naturaleza y Lo orgánico" || title === "Identidad y Cuerpos" || title === "Control y Artificialidad" || title === "Conocer Artimañas") {
      folderShadow = "";
      thesisFolderStyle = "";
    }

  }


  return (
    <div className={"text-wb-center cursor-pointer transition  hover:bg-opacity-25 hover:shadow-lg " + hoverBg} >
      <button
        className={"relative text-wb-center " + dimensions}
        onClick={() => onFolderClick()}
      >
        <div className={"w-9/12 md:w-11/12 " + folderShadow + thesisFolderStyle}>
          <img
            className=""
            src={folderImages[title.replace(/[\s.()]+/g, "").toLowerCase()]}
            alt=""
          />
        </div>
      </button>
      {!fitIn && (<div className={titleBox + "justify-self-center w-fit px-4 " + titleBg}><h3 className={titleFont + "w-wb-fill text-center text-sm  md:text-base"}>
        {title.toUpperCase()}
      </h3> </div>

      )}
    </div>
  );
}
