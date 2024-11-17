import React, { useEffect, useState, useRef } from "react";
import leftArrowIcon from "../assets/img/icons/left_arrow_icon.svg";
import xIcon from "../assets/img/icons/x_icon.svg";
import minusIcon from "../assets/img/icons/minus_icon.svg";
import downloadIcon from "../assets/img/icons/downloadIcon.svg";
import folderImg from "../assets/img/folderCategory/artimanias_folder.svg";
import Folder from "./Folder";
import jsonData from "../assets/data/data.json";
import Slider from "./Slider";
import infoImg from "../assets/img/misc/artimañas-info.png";


// Recibe el nombre de la carpeta que se abrio (folderName) y en base a eso muestra el contenido acorde
// onAction es la funcion pasada por parametro y que se ejecuta al apretar algun boton de la ventaba abierta, además al hacer click
// pasa una cadena de texto como parametro (valor que es devuelto a la función que se ejecuto al llamar al componente Window).
export default function Window({ folderName, onAction }) {
  const [thesisList, setThesisList] = useState([]);
  const [thesis, setThesis] = useState(null);
  const [actualFolder, setActualFolder] = useState(folderName);
  const [seeMore, SetSeeMore] = useState(false);
  const [headerBg, setHeaderBg] = useState("");

  // Para referenciar el contenedor que se debe scrollear hacia arriba
  const scrollContainerRef = useRef(null);

  // hardCoding: Esto se repite en desktop. Habria que hacer otro archivo donde se importen estos nombres o algo para usarlo direc.
  const folders = {
    PA: "Procesos y Aprendizaje",
    RSI: "Redes Sociales e Internet",
    FN: "Fantasía y Narrativa",
    CA: "Control y Artificialidad",
    SC: "Sociedad y Cultura",
    NO: "Naturaleza y Lo orgánico",
    IC: "Identidad y Cuerpos",
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

    if (thesis)
      setActualFolder(thesis.obra);

    // Filtra las obras del JSON para mostrar la lista completa si se abre la categoría, o en el caso de que se abra una tesis, para cargar las obras relacionadas.
    const filteredItems = jsonData.filter(
      (thisThesis) => {
        if (thesis !== null)
          return thisThesis.categoria.toLowerCase() === thesis.categoria.toLowerCase();
        return thisThesis.categoria.toLowerCase() === actualFolder.toLowerCase();
      },
    );

    setThesisList(filteredItems);

    // Según la categoría o la categoria a la que pertenece la obra, es el color del Header
    if (folderName === folders.RSI || (thesis !== null && thesis.categoria === folders.RSI))
      setHeaderBg("bg-[#9EDEFC]");
    else if (folderName === folders.IC || (thesis !== null && thesis.categoria === folders.IC))
      setHeaderBg("bg-[#D1C1B4]");
    else if (folderName === folders.FN || (thesis !== null && thesis.categoria === folders.FN))
      setHeaderBg("bg-[#FF73FF]");
    else if (folderName === folders.NO || (thesis !== null && thesis.categoria === folders.NO))
      setHeaderBg("bg-[#27AE5F]");
    else if (folderName === folders.CA || (thesis !== null && thesis.categoria === folders.CA))
      setHeaderBg("bg-[#CBDF00]");
    else if (folderName === folders.SC || (thesis !== null && thesis.categoria === folders.SC))
      setHeaderBg("bg-[#8477FE]");
    else if (folderName === folders.PA || (thesis !== null && thesis.categoria === folders.PA))
      setHeaderBg("bg-[#FFDD6A]");
    else if (folderName === folders.ARTI || (thesis !== null && thesis.categoria === folders.ARTI))
      setHeaderBg("bg-[#F85031]");

    scrollToTop();
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

  // Animacion para scrollear de forma suave hacía arriba al cambiar la carpeta
  const scrollToTopSmooth = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollStart = container.scrollTop;
      const scrollEnd = 0;
      const duration = 500; // Duración de la animación en milisegundos
      let startTime;

      // Función para realizar el desplazamiento suave
      const animateScroll = (time) => {
        if (!startTime) startTime = time;
        const timeElapsed = time - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Normaliza el progreso
        container.scrollTop = scrollStart + (scrollEnd - scrollStart) * progress;

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll); // Sigue la animación
        }
      };

      // Inicia la animación
      requestAnimationFrame(animateScroll);
    }
  };

  const scrollToTop = () => {
    scrollToTopSmooth();
  }

  function InfoFolders(ids) { //Abrir una carpeta distinta según la id (para las carpetas de conocer atimañs)
    if (ids === 99) {
      return (
        <>
          <img src={infoImg} alt="Imagen info lugar" className="p-2" />
          <h1 className="baloo-2-regular text-lg mt-4 md:text-4xl">
            ¿Qué es Artimañas 2024?
          </h1>
          <p className="baloo-2-regular md:text-base mt-2">
            {thesis.parrafo1 + " "}
          </p>
        </>
      );
    } else if (ids === 98) {
      return (
        <article>
          <div className="ratio ratio-1x1">
            <iframe className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=2nrG3TBCHvAQrrgg"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <h1 className="baloo-2-regular text-lg mt-4 md:text-4xl">
            Esto es Artimañas 2024
          </h1>
        </article>
      )
    } else if (ids === 97) {
      return (<ul className="flex flex-wrap justify-evenly gap-9">
        <li
          className="md:ml-8 md:text-wb-center md:flex-wrap"
        >
          <Folder
            title={"Instagram"}
            onFolderClick={() => {
              window.open("https://www.instagram.com/festivalartimanas/", '_blank').focus();
            }}
          />
        </li>
      </ul>
      )
    } else if (ids === 96) {
      return (<ul className="flex flex-wrap justify-evenly gap-9">
        <li
          className="md:ml-8 md:text-wb-center md:flex-wrap"
        >
          <div className="text-wb-center cursor-pointer transition w-min hover:bg-opacity-25 hover:shadow-lg ">
            <div className="md:w-20">
              <img
                src={folderImg}
                alt=""
              />
            </div>
            <div className="justify-self-center w-fit px-4 ">
              <h3 className="baloo-2-regular text-center w-max md:text-xl">
                IMAGEN 1
              </h3>
            </div>
          </div>
        </li>
        <li
          className="md:ml-8 md:text-wb-center md:flex-wrap"
        >
          <div className="text-wb-center cursor-pointer transition w-min hover:bg-opacity-25 hover:shadow-lg ">
            <div className="md:w-20">
              <img
                src={folderImg}
                alt=""
              />
            </div>
            <div className="justify-self-center w-fit px-4 ">
              <h3 className="baloo-2-regular text-center w-max md:text-xl">
                IMAGEN 2
              </h3>
            </div>
          </div>
        </li>
        <li
          className="md:ml-8 md:text-wb-center md:flex-wrap"
        >
          <div className="text-wb-center cursor-pointer transition w-min hover:bg-opacity-25 hover:shadow-lg ">
            <div className="md:w-20">
              <img
                src={folderImg}
                alt=""
              />
            </div>
            <div className="justify-self-center w-fit px-4 ">
              <h3 className="baloo-2-regular text-center w-max md:text-xl">
                IMAGEN 3
              </h3>
            </div>
          </div>
        </li>
        <li
          className="md:ml-8 md:text-wb-center md:flex-wrap"
        >
          <div className="text-wb-center cursor-pointer transition w-min hover:bg-opacity-25 hover:shadow-lg ">
            <div className="md:w-20">
              <img
                src={folderImg}
                alt=""
              />
            </div>
            <div className="justify-self-center w-fit px-4 ">
              <h3 className="baloo-2-regular text-center w-max md:text-xl">
                IMAGEN 4
              </h3>
            </div>
          </div>
        </li>
      </ul>
      )
    } else {
      return (<article>
        <Slider
          video={
            "http://www.youtube.com/embed/" +
            thesis.video.split("?v=")[1] +
            "?modestbranding=1"
          }
          obra={thesis.obra}
        />
        <div className="flex mt-4">
          <img src={require('../assets/img/authors/' + thesis.nombreApellido.replace(/\s+/g, "").toLowerCase() + ".png")} alt="Foto autor" className="w-10" />
          <h3 className="baloo-2-regular mt-2 ml-4 md:text-lg">
            {thesis.nombreApellido}
          </h3></div>

        <h1 className="baloo-2-regular text-2xl mt-4 md:text-4xl">
          {thesis.obra}
        </h1>
        <p className="baloo-2-regular md:text-base mt-2">
          {thesis.parrafo1 + " "}
          {!seeMore && <button onClick={() => SetSeeMore(true)} className="baloo-2-bold md:text-base">Ver más...</button>}
        </p>
        {seeMore && <p className="baloo-2-regular md:text-base mb-8">
          {thesis.parrafo2}
        </p>}
        <h3 className="font-bold">Investigación</h3>
        <p className="mt-2">Nombre del documento</p>
        <button
          className="flex items-center justify-center border-2 border-black button-shadow w-full p-2 mb-5 rounded-md"
          onClick={downloadImage}
        >
          <img src={downloadIcon} alt="Download icon" />
          PDF
        </button>
        <div>
          <h3 className="mt-10 baloo-2-bold md:text-xl">
            Más de {thesis.categoria}
          </h3>
          <ul className="flex flex-wrap justify-evenly gap-9">
            {
              thesisList.filter((thisThesis) => thisThesis.obra !== thesis.obra).map((thisThesis) => (
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
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <section
        ref={scrollContainerRef}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        className="overflow-y-scroll bg-white h-[79%] ml-4 mr-4 w-full max-w-lg rounded-[15px] overflow-hidden border-2 border-black md:h-3/4 md:overflow-hidden"
      >
        {/* Barra superior */}
        <header className={"flex sticky top-0 z-10 items-center justify-between " + headerBg + " text-black p-4"}>
          <button
            aria-label="Go Back"
            className=" hover:text-gray-400"
            onClick={() => {
              // En el caso de que la ventana muestre una tesis
              if (thesis) {
                // Vuelve a la carpeta de categorías, retoma el nombre de carpeta de la categoría
                setActualFolder(thesis.categoria);
                setThesis(null);
              } // Sino se cierra
              else onAction("close");
            }}
          >
            <img className="w-4/5" src={leftArrowIcon} alt="" />
          </button>
          <h2
            id="modal-title"
            className="text-xl font-medium baloo-2-bold text-center md:text-2xl md:spa md:tracking-wider"
          >
            {actualFolder}
          </h2>
          <div className="flex space-x-2">
            <button
              aria-label="Minimize"
              className="hover:text-gray-400"
              onClick={
                // Si es una ventana tesis, además envia el nombre de la misma para que se minimice correctamente en el escritorio
                () => {
                  thesis
                    ? onAction("minimize", thesis.obra)
                    : onAction("minimize")
                }

              }
            >
              <img className="w-4/5" src={minusIcon} alt="" />
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
              <img className="w-4/5" src={xIcon} alt="" />
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main className="p-4 bg-[#FFFBF2] md:mx-8 md:max-h-[36rem] overflow-y-scroll">
          {/* Carpeta de la tesis */}
          {thesis ? (
            InfoFolders(thesis.id)
          ) : (
            // Carpeta de la categoria con el listado de tesis
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
