import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import XIcon from "@heroicons/react/24/outline/XCircleIcon";
import MinusIcon from "@heroicons/react/24/outline/MinusIcon";
import Folder from "./Folder";
import jsonData from "../assets/data/data.json";

// Recibe el nombre de la carpeta que se abrio (folderName) y en base a eso muestra el contenido acorde
// onAction es la funcion pasada por parametro y que se ejecuta al apretar algun boton de la ventaba abierta, además al hacer click
// pasa una cadena de texto como parametro (valor que es devuelto a la función que se ejecuto al llamar al componente Window).
export default function Window({ folderName, onAction }) {
  const [thesisList, setThesisList] = useState([]);
  const [thesis, setThesis] = useState(null);
  const [actualFolder, setActualFolder] = useState(folderName);

  // hardCoding: Esto se repite en desktop. Habria que hacer otro archivo donde se importen estos nombres o algo para usarlo direc.
  const folders = {
    RA: "Realidad Aumentada",
    AE: "Arte Electronico",
    VJ: "Videojuegos",
    MP: "Mapping",
  };

  // Si se abre una tesis minimizada es importante verificar esto para volver a obtener los datos de la misma
  useEffect(() => {
    if (
      folderName !== folders.AE &&
      folderName !== folders.RA &&
      folderName !== folders.VJ &&
      folderName !== folders.MP
    ) {
      const thesisData = jsonData.find(
        (thisThesis) => thisThesis.obra === folderName,
      );
      setThesis(thesisData);
    }
  }, []);

  useEffect(() => {
    if (thesis) {
      setActualFolder(thesis.obra);
    } // Si se abre una carpeta que no es una tesis, aquí se debe hacer un request a las diferentes tesis que deben mostrarse para poder abrir
    else if (
      folderName === folders.AE ||
      folderName === folders.RA ||
      folderName === folders.VJ ||
      folderName === folders.MP
    ) {
      // Filter jsonData to match category to folder name
      const filteredItems = jsonData.filter(
        (thisThesis) =>
          thisThesis.categoria.toLowerCase() === folderName.toLowerCase(),
      );

      console.log("Fetched data: ", jsonData); // Debug
      setThesisList(filteredItems);
    }
  }, [thesis]);
  /* ------ */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <section
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        className="bg-white w-full max-w-lg rounded-md shadow-lg overflow-hidden"
      >
        {/* Barra superior */}
        <header className="flex items-center justify-between bg-[#FF73FF] text-black p-4">
          <button
            aria-label="Go Back"
            className="hover:text-gray-400"
            onClick={() => {
              // En el caso de que la ventana muestre una tesis
              if (thesis) {
                // Vuelve a la carpeta de categorías, retoma el nombre de carpeta de la categoría
                setActualFolder(folderName);
                setThesis(null);
              } // Sino se cierra
              else onAction("close");
            }}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h2 id="modal-title" className="text-lg font-medium">
            {actualFolder}
          </h2>
          <div className="flex space-x-2">
            <button
              aria-label="Minimize"
              className="hover:text-gray-400"
              onClick={
                // Si es una ventana tesis, además envia el nombre de la misma para que se minimice correctamente en el escritorio
                () =>
                  thesis
                    ? onAction("minimize", thesis.obra)
                    : onAction("minimize")
              }
            >
              <MinusIcon className="h-6 w-6" />
            </button>
            <button
              onClick={
                // Misma logica que en el caso de minimizar
                () =>
                  thesis ? onAction("close", thesis.obra) : onAction("close")
              }
              aria-label="Close"
              className="hover:text-gray-400"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main className="p-4 bg-[#FFFBF2]">
          {thesis ? (
            <article>
              <img src="" alt="imagen de la obra" />
              <p>{thesis.parrafo1}</p>
              <iframe
                width="350"
                height="400"
                src={"http://www.youtube.com/embed/" + thesis.video.split("?v=")[1] + "?modestbranding=1"}
                title={thesis.obra}
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
              <p>{thesis.parrafo2}</p>
            </article>
          ) : (
            <ul>
              {thesisList.map((thisThesis) => (
                <li key={thisThesis.id}>
                  <Folder
                    title={thisThesis.obra}
                    onFolderClick={() => {
                      // Al abrir la carpeta, se guarda la misma con todo su contenido como objeto
                      setThesis(thisThesis);
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </main>
      </section>
    </div>
  );
}
