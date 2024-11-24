import React, { useEffect, useState, useRef } from "react";
import closeIcon from "../assets/img/icons/close_icon.svg";
import minimizeIcon from "../assets/img/icons/minimize_icon.svg";
import backArrow from "../assets/img/icons/back_arrow.svg";
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

  // Estados para las animaciones al abrir y minimizar
  const [windowExpanded, setWindowExpanded] = useState(false);
  const [windowMinimized, setWindowMinimized] = useState(false);

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
    openWindowAnimation();
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
      setHeaderBg("bg-[#E2A1FF]");

    scrollToTop();
  }, [thesis]);

  /* ------ */

  // Dispara la animación al abrirse la carpeta
  const openWindowAnimation = () => {
    setWindowExpanded(true);
  };

  // Maneja los estados para las animaciones al minimizar
  const handleMinimize = () => {
    setWindowMinimized(true);
    setWindowExpanded(false);
    setTimeout(() => {
      thesis
        ? onAction("minimize", thesis.obra)
        : onAction("minimize")
    }, 700);
  }

  const downloadPDF = (pdfURL) => {
    const extractDriveFileId = (driveLink) => {
      const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
      const match = driveLink.match(regex);
      return match ? match[1] : null; // Devuelve el ID si hay coincidencia, o null si no lo hay
    }
    if (pdfURL) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${extractDriveFileId(pdfURL)}`;
      const link = document.createElement("a");
      link.href = downloadUrl
      link.setAttribute("download", thesis.nombreApellido + "_investigación");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Animacion para scrollear de forma suave hacía arriba al cambiar la carpeta
  const scrollToTopSmooth = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollStart = container.scrollTop;
      const scrollEnd = 0;
      console.log(scrollStart);

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
        <li
          className="md:ml-8 md:text-wb-center md:flex-wrap"
        >
          <Folder
            title={"Facebook"}
            onFolderClick={() => {
              window.open("https://www.facebook.com/share/17fWXz1uSN/", '_blank').focus();
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
            thesis.video.split("?v=")[1]
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
          {!seeMore && <button onClick={() => SetSeeMore(true)} className="baloo-2-bold md:text-base mt-2.5 mb-2.5">Ver más...</button>}
        </p>
        {seeMore && <p className="baloo-2-regular md:text-base mb-8">
          <br></br>
          {thesis.parrafo2}
        </p>}
        <h3 className="font-bold">Investigación</h3>
        <p className="mt-2">{thesis.nombreApellido + " - Tesina"}</p>
        <button
          className="flex items-center justify-center bebas-neue-regular text-base gap-2 border-2 border-black button-shadow w-full p-2 mb-5 rounded-md transition duration-300 ease-in-out hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] hover:shadow-md active:shadow-none"
          onClick={() => { downloadPDF(thesis.pdf) }}
        >
          <img src={downloadIcon} alt="Download icon" />
          DESCARGAR
        </button>
        <div>
          <h3 className="mt-10 baloo-2-bold md:text-xl">
            Más de {thesis.categoria}
          </h3>
          <ul className="flex flex-wrap thesis-folder-rgap">
            {
              thesisList.filter((thisThesis) => thisThesis.obra !== thesis.obra).map((thisThesis) => (
                <li
                  className="w-1/2 justify-items-center  md:text-wb-center md:flex-wrap"
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
        className={`w-full overflow-y-scroll transform  h-[79%] ml-4 mr-4  max-w-lg rounded-[15px] hide-scroll border-2 border-black transition-all duration-700 ease-in-out ${windowExpanded ? "h-[79%] w-full scale-100" : "scale-0"} ${!windowMinimized ? "" : "translate-y-[70%] md:-translate-x-[110%]"}`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Barra superior */}
        <header className={"flex sticky top-0 z-50 items-center justify-between " + headerBg + " text-black p-4"}>
          <button
            aria-label="Go Back"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
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
            <img className="w-[25%]" src={backArrow} alt="Icon" />
          </button>
          <h2
            id="modal-title"
            className="text-base font-medium baloo-2-bold text-center md:text-xl md:spa md:tracking-wider"
          >
            {actualFolder}
          </h2>
          <div className="flex space-x-2">
            <button
              aria-label="Minimize"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFFBF2]
               border-2 border-black button-shadow 
               transition duration-300 ease-in-out 
               hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
               hover:shadow-lg active:shadow-none"
              onClick={
                // Si es una ventana tesis, además envia el nombre de la misma para que se minimice correctamente en el escritorio
                handleMinimize
              }
            >
              <img className="w-3/5" src={minimizeIcon} alt="" />
            </button>
            <button
              aria-label="Close"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
              onClick={
                // Misma logica que en el caso de minimizar
                () =>
                  thesis ? onAction("close", thesis.obra) : onAction("close")
              }
            >
              <img className="w-3/5" src={closeIcon} alt="" />
            </button>
          </div>
        </header>

        {/* Contenido */}
        <main
          ref={scrollContainerRef}
          className="p-4 h-full bg-[#FFFBF2] md:h-[90%] overflow-y-scroll hide-scroll">
          {/* Carpeta de la tesis */}
          {thesis ? (
            InfoFolders(thesis.id)
          ) : (
            // Carpeta de la categoria con el listado de tesis
            <ul className="flex flex-wrap thesis-folder-rgap">
              {thesisList.map((thisThesis) => (
                <li
                  className="w-1/2 justify-items-center  md:text-wb-center md:flex-wrap"
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
