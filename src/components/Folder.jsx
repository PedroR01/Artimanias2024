import React from "react";

/* Images */
import pa_folder from "../assets/img/pa_folder.svg";
import rsi_folder from "../assets/img/rsi_folder.svg";
import fn_folder from "../assets/img/fn_folder.svg";
import ca_folder from "../assets/img/ca_folder.svg";
import sc_folder from "../assets/img/sc_folder.svg";
import no_folder from "../assets/img/no_folder.svg";
import ic_folder from "../assets/img/ic_folder.svg";
import artimanias_folder from "../assets/img/artimanias_folder.svg";

// El parametro fitIn solo se usa cuando se necesita mostrar la carpeta con otras dimensiones en otro lugar de la pantalla que no sea el escritorio
export default function Folder({ title, titleBg, fitIn, onFolderClick }) {
  const folderMap = {
    procesosyaprendizaje: pa_folder,
    redessocialeseinternet: rsi_folder,
    fantasíaynarrativa: fn_folder,
    controlyartificialidad: ca_folder,
    socialycultural: sc_folder,
    naturalyloorgánico: no_folder,
    identidadycuerpos: ic_folder,
    conocerartimañas: artimanias_folder,
  };

  let dimensions = "w-28 h-24";

  if (fitIn === "nav") {
    dimensions =
      "w-16 h-24 md:w-20 transition ease-in-out delay-150 hover:-translate-y-8 hover:scale-110 duration-300 xl:h-wb-fill xl:w-wb-fill";
  }

  return (
    <div className="text-wb-center hover:bg-blue-300 hover:bg-opacity-30 hover:shadow-lg cursor-pointer transition">
      <button
        className={"relative text-wb-center " + dimensions}
        onClick={() => onFolderClick()}
      >
        <div className="md:w-20">
          <img
            className="absolute w-3/4 h-20 left-1/4 top-[20%]"
            src={folderMap[title.replace(/\s+/g, "").toLowerCase()]}
            alt=""
          />
        </div>
      </button>
      {!fitIn && (<div className={"border-2 border-black rounded-md justify-self-center w-fit px-4 " + titleBg}><h3 className="text-center w-max bebas-neue-regular md:text-xl">
        {title.toUpperCase()}
      </h3> </div>

      )}
    </div>
  );
}
