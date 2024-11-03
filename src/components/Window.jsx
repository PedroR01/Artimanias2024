import React, { useEffect, useState } from "react";
import leftArrowIcon from "../assets/img/left_arrow_icon.svg";
import xIcon from "../assets/img/x_icon.svg";
import minusIcon from "../assets/img/minus_icon.svg";
import Folder from "./Folder";
import jsonData from "../assets/data/data.json";
import Slider from "./Slider";

// Recibe el nombre de la carpeta que se abrio (folderName) y en base a eso muestra el contenido acorde
// onAction es la funcion pasada por parametro y que se ejecuta al apretar algun boton de la ventaba abierta, además al hacer click
// pasa una cadena de texto como parametro (valor que es devuelto a la función que se ejecuto al llamar al componente Window).
export default function Window({ folderName, onAction }) {
  const [thesisList, setThesisList] = useState([]);
  const [thesis, setThesis] = useState(null);
  const [actualFolder, setActualFolder] = useState(folderName);

  // hardCoding: Esto se repite en desktop. Habria que hacer otro archivo donde se importen estos nombres o algo para usarlo direc.
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

  // Si se abre una tesis minimizada es importante verificar esto para volver a obtener los datos de la misma
  useEffect(() => {
    if (
      folderName !== folders.PA &&
      folderName !== folders.RSI &&
      folderName !== folders.FN &&
      folderName !== folders.CA &&
      folderName !== folders.SC &&
      folderName !== folders.NO &&
      folderName !== folders.IC &&
      folderName !== folders.ARTI
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
      folderName === folders.PA ||
      folderName === folders.RSI ||
      folderName === folders.FN ||
      folderName === folders.CA ||
      folderName === folders.SC ||
      folderName === folders.NO ||
      folderName === folders.IC ||
      folderName === folders.ARTI
    ) {
      // Filter jsonData to match category to folder name
      const filteredItems = jsonData.filter(
        (thisThesis) => thisThesis.categoria.toLowerCase() === folderName.toLowerCase(),
      );

      console.log("Fetched data: ", jsonData); // Debug
      setThesisList(filteredItems);
    }
  }, [thesis]);
  /* ------ */

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href =
      "https://drive.google.com/uc?export=download&id=1h77DQMMhs5GJeayOrQZGal-RF0M60Y9b";
    link.setAttribute("download", "image.jpg"); // Puedes cambiar el nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <section
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        className="overflow-y-scroll bg-white h-1/2 ml-4 mr-4 w-full max-w-lg rounded-md folder-window-shadow overflow-hidden border-2 border-black md:h-3/4 md:overflow-hidden"
      >
        {/* Barra superior */}
        <header className="flex sticky top-0 z-10 items-center justify-between bg-[#FF73FF] text-black p-4 ">
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
            <img className="h-6 w-6" src={leftArrowIcon} alt="" />
          </button>
          <h2
            id="modal-title"
            className="text-xl font-medium bebas-neue-regular md:text-xl md:spa md:tracking-wider"
          >
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
              <img className="h-6 w-6" src={minusIcon} alt="" />
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
              <img className="h-6 w-6" src={xIcon} alt="" />
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main className="p-4 bg-[#FFFBF2] md:mx-8 md:max-h-[36rem] overflow-y-scroll">
          {thesis ? (
            <article>
              <h1 className="bebas-neue-regular text-2xl md:text-4xl">
                {thesis.obra}
              </h1>
              <h2 className="bebas-neue-regular md:text-lg">
                {thesis.nombreApellido}
              </h2>
              <Slider
                video={
                  "http://www.youtube.com/embed/" +
                  thesis.video.split("?v=")[1] +
                  "?modestbranding=1"
                }
                obra={thesis.obra}
              />
              <p className="baloo-2-regular md:text-base mt-8">
                {thesis.parrafo1}
              </p>
              <p className="baloo-2-regular md:text-base mb-8">
                {thesis.parrafo2}
              </p>
              <button
                className="bg-[#FF73FF] w-2/6 p-2 mb-5 rounded-md"
                onClick={downloadImage}
              >
                PDF
              </button>
              <div>
                <h2 className="bebas-neue-regular md:text-xl">
                  Más de {thesis.categoria}
                </h2>
                <ul className="flex flex-wrap justify-evenly gap-9">
                  {thesisList.map((thisThesis) => (
                    <li
                      className="md:ml-8 md:text-wb-center md:flex-wrap"
                      key={thisThesis.id}
                    >
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
              </div>
            </article>
          ) : (
            <ul className="flex flex-wrap justify-evenly gap-9">
              {thesisList.map((thisThesis) => (
                <li
                  className="md:ml-8 md:text-wb-center md:flex-wrap"
                  key={thisThesis.id}
                >
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
