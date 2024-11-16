import React, { useEffect, useState } from "react";
import xIcon from "../assets/img/x_icon.svg";
import jsonData from "../assets/data/data.json";
import Window from "./Window";

export default function AuthorsList({ onAction }) {
    const [authors, setAuthors] = useState([]);
    const [authorThesis, setAuthorThesis] = useState(null);
    const [whichThesis, setwhichThesis] = useState(null);

    useEffect(() => {
        const authorsData = jsonData.filter((thisAuthor) => thisAuthor.nombreApellido);
        setAuthors(authorsData);
    }, []);

    useEffect(() => {
        if (authorThesis !== null) {
            const thesisData = jsonData.find((thesis) => thesis.nombreApellido === authorThesis);
            setwhichThesis(thesisData);
        }
    }, [authorThesis]);

    const handleAuthorThesis = (author) => {
        setAuthorThesis(author);
    }

    return (
        whichThesis === null ?
            (<section
                className="fixed bottom-16 justify-center items-center overflow-y-scroll bg-white h-1/2 w-11/12 max-w-lg  rounded-t-3xl border-t-2 border-x-2 border-black z-10 md:h-3/4"
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
                            onClick={
                                // Misma logica que en el caso de minimizar
                                () => onAction("close")
                            }
                            aria-label="Close"
                            className="hover:text-gray-400"
                        >
                            <img className="h-6 w-6" src={xIcon} alt="" />
                        </button>
                    </div>
                </header>
                <main className="p-4 bg-[#FFFBF2] h-[85%]  md:mx-8 md:max-h-[36rem] overflow-y-scroll overflow-hidden  custom-scrollbar">
                    <ul className="flex flex-wrap justify-between">
                        {authors.map((thisAuthor, index) => (
                            <li
                                className="justify-items-center w-1/2 pb-4 md:ml-8 md:text-wb-center md:flex-wrap"
                                key={index}
                            >
                                <button className="justify-items-center w-wb-fill" onClick={() => handleAuthorThesis(thisAuthor)}>
                                    <img className="max-h-16" src={require('../assets/img/Authors/' + thisAuthor.nombreApellido.replace(/\s+/g, "").toLowerCase() + ".png")} alt="Imagen Autor" />
                                    <span className="inline-flex text-center">{thisAuthor.nombreApellido}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </main>
            </section>) : <Window
                folderName={authorThesis}
                onAction={() => {
                    setAuthorThesis(null);
                }}
            />
    );
}
