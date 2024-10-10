import React, { useEffect, useState } from "react";
import xIcon from "../assets/img/x_icon.svg";
import minusIcon from "../assets/img/minus_icon.svg";
import infoImg from "../assets/img/artimañas-info.png";
import Logo from "../assets/img/logo_arti.svg";
// Recibe el nombre de la carpeta que se abrio (folderName) y en base a eso muestra el contenido acorde
// onAction es la funcion pasada por parametro y que se ejecuta al apretar algun boton de la ventaba abierta, además al hacer click
// pasa una cadena de texto como parametro (valor que es devuelto a la función que se ejecuto al llamar al componente Window).
export default function Info({ isKnowMore, onAction }) {
  const [knowMore, setKnowMore] = useState(isKnowMore);

  /* ------ */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <section
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        className="w-full max-w-lg rounded-md overflow-hidden"
      >
        {/* Contenido */}
        {/* Pestaña con info */}
        <main>
          {knowMore ? ( //Cambiar de pestañas con el bool KnowMore
            <article className="m-6 items-center justify-center rounded-md shadow-lg outline bg-[#E2A1FF]">
              <img
                src={Logo}
                alt="Imagen logo artimañias"
                className="px-10 pt-5 pb-8 object-top"
              />
              <div className="flex px-6 pb-10 justify-center">
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.{" "}
                </p>
              </div>
              <div className="flex pb-5 justify-center">
                <button
                  className="w-3/4 py-3 px-15 bg-white rounded-2xl outline text-black text-center font-bold text-2xl hover:text-gray-300 hover:outline-gray-300"
                  onClick={() => {
                    //boton Conocer mas
                    setKnowMore(false);
                  }}
                >
                  CONOCÉ MÁS
                </button>
              </div>
            </article>
          ) : (
            /* Pestaña imagen con info */
            <article className="m-10 bg-white rounded-md shadow-lg outline">
              <header className="flex items-center justify-end bg-[#9EDEFC] text-black p-4 rounded-md">
                <div className="flex space-x-2">
                  <button
                    aria-label="Minimize"
                    className="hover:text-gray-400"
                    onClick={() => {
                      setKnowMore(true);
                    }}
                  >
                    <img className="h-6 w-6" src={minusIcon} alt="" />
                  </button>
                  <button
                    onClick={() => onAction("close")}
                    aria-label="Close"
                    className="hover:text-gray-400"
                  >
                    <img className="h-6 w-6" src={xIcon} alt="" />
                  </button>
                </div>
              </header>
              <img src={infoImg} alt="Imagen info lugar" className="p-2" />
              <div className="flex p-2 bg-[#D1C1B4] rounded-md">
                <h3 className="font-bold text-white">
                  {" "}
                  SEDE FONSECA - DIAGONAL 78 ESQ. 62{" "}
                </h3>
              </div>
            </article>
          )}
        </main>
      </section>
    </div>
  );
}
