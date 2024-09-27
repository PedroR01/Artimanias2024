import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import XIcon from "@heroicons/react/24/outline/XCircleIcon";
import MinusIcon from "@heroicons/react/24/outline/MinusIcon";
import Folder from "./Folder";
import jsonData from "../assets/data/data.json";

// Recibe el nombre de la carpeta que se abrio (folderName) y en base a eso muestra el contenido acorde
// onAction es la funcion pasada por parametro y que se ejecuta al apretar algun boton de la ventaba abierta, además al hacer click
// pasa una cadena de texto como parametro (valor que es devuelto a la función que se ejecuto al llamar al componente Window).
export default function Window({ folderName, isThesis, onAction }) {
  /* SIN IMPLEMENTAR */
  const [thesisList, setThesisList] = useState([]);

  useEffect(() => {
    if (isThesis) {
      // Si se abre una carpeta que no es una tesis, aquí se debe hacer un request a las diferentes tesis que deben mostrarse para poder abrir
      setThesisList(["Realidad Aumentada"]);
    } else {
      // Filter jsonData to match category to folder name
      const filteredItems = jsonData.filter(thesis => thesis.categoria.toLowerCase() === folderName.toLowerCase());

      console.log("Fetched data: ", jsonData); // Debug
      setThesisList(filteredItems);
    }
  }, []);
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
          <button aria-label="Go Back" className="hover:text-gray-400">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h2 id="modal-title" className="text-lg font-medium">
            {folderName}
          </h2>
          <div className="flex space-x-2">
            <button
              aria-label="Minimize"
              className="hover:text-gray-400"
              onClick={() => onAction("minimize")}
            >
              <MinusIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => onAction("close")}
              aria-label="Close"
              className="hover:text-gray-400"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main className="p-4 bg-[#FFFBF2]">
          {isThesis ? (
            <article>
              <header>
                <h2>Titulo tesis</h2>
                <img src="" alt="imagen de la obra" />
              </header>
              <p>Descripción y desarrollo de tesina</p>
            </article>
          ) : (
            <ul>
              {thesisList.map((thesis) => (
                <li key={thesis.id}>
                  <Folder
                    title={thesis.obra}
                    onFolderClick={() => {
                      //Codigo para abrir la otra carpeta, todavía hay que revisar si debería hacerlo así
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
