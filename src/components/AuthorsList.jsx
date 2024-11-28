import React, { useEffect, useState } from "react";
import closeIcon from "../assets/img/icons/close_icon.svg";
import jsonData from "../assets/data/data.json";
import Window from "./Window";

export default function AuthorsList({ onAction }) {
    const [authors, setAuthors] = useState([]);
    const [authorThesis, setAuthorThesis] = useState(null);

    // Estados para las animaciones al abrir y minimizar
    const [windowExpanded, setWindowExpanded] = useState(false);

    useEffect(() => {
        // Obtiene toda la info de los autores y sus obras.
        const authorsData = jsonData.filter((thisAuthor) => thisAuthor.nombreApellido);
        authorsData.sort((authorA, authorB) => (authorA.nombreApellido.localeCompare(authorB.nombreApellido)));
        setAuthors(authorsData);
        windowAnimation();
    }, []);

    // Dispara la animación al abrirse la carpeta
    const windowAnimation = () => {
        setWindowExpanded(!windowExpanded);
    };

    const handleClose = () => {
        windowAnimation();
        setTimeout(() => {
            onAction("close")
        }, 500);
    }

    // Guarda el autor clickeado para manejar la llamada a su obra
    const handleAuthorThesis = (author) => {
        setAuthorThesis(author);
    }

    return (
        authorThesis === null ?
            (<section
                className={`fixed bottom-16 justify-center items-center overflow-y-scroll bg-white rounded-t-3xl border-t-2 border-x-2 border-black z-10 hide-scroll  transition-all duration-700 ease-in-out md:w-[40%] ${windowExpanded ? "h-[72%] w-11/12 md:w-[40%]" : "h-0 w-11/12 md:w-[40%]"}`}
            >
                {/* Barra superior */}
                <header className="flex sticky top-0 z-10 items-center justify-between border-b-[1px] border-black bg-[#F85031] text-black p-4 ">
                    <h2
                        id="modal-title"
                        className="text-xl font-medium baloo-2-bold md:text-xl md:spa md:tracking-wider"
                    >
                        Menu de Autores
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            aria-label="Close"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
                            onClick={
                                // Misma logica que en el caso de minimizar
                                handleClose
                            }
                        >
                            <img className="w-3/5" src={closeIcon} alt="" />
                        </button>
                    </div>
                </header>
                <main className="px-4 pt-4 pb-8 bg-[#FFFBF2] h-[90%] md:h-[91%] overflow-y-scroll  custom-scrollbar">
                    <ul className="flex flex-wrap authors-list-rgap justify-between">
                        {authors.map((thisAuthor, index) => (
                            <li
                                className="justify-items-center text-center w-1/2 pt-2 rounded-lg transition duration-300 ease-in-out 
 hover:bg-[#D1C1B4] hover:folder-window-shadow md:text-wb-center md:flex-wrap"
                                key={index}
                            >
                                <button className="justify-items-center w-24 rounded-full border-2 border-black button-shadow transition duration-300 ease-in-out 
  hover:button-shadow 
 hover:shadow-lg active:shadow-none md:w-24" onClick={() => handleAuthorThesis(thisAuthor)}>
                                    <img src={require('../assets/img/authors/' + thisAuthor.nombreApellido.replace(/\s+/g, "").toLowerCase() + ".png")} alt="Imagen Autor" />
                                </button>
                                <span className="flex text-center baloo-2-bold">{thisAuthor.nombreApellido}</span>
                            </li>
                        ))}
                    </ul>
                </main>
            </section>) : <Window
                folderName={authorThesis.obra}
                onAction={(action) => {
                    onAction(action, authorThesis.obra);
                    setAuthorThesis(null);
                }}
            />
    );
}
