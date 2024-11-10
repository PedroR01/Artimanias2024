import React, { useEffect, useState } from "react";
import xIcon from "../assets/img/x_icon.svg";
import jsonData from "../assets/data/data.json";


export default function AuthorsList({ onAction }) {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const authorsData = jsonData.filter((thisAuthor) => thisAuthor.nombreApellido);
        /*
        authorsData.forEach(author => {
            setAuthors((prevAuthors) => [...prevAuthors, author.nombreApellido]);

        });
        */
       setAuthors(authorsData);
       console.log("Authors data: ", authorsData);
    }, []);

    return (
        <section
            className="fixed bottom-16 justify-center items-center overflow-y-scroll bg-white h-1/2 w-11/12 max-w-lg  rounded-t-3xl  overflow-hidden border-t-2 border-x-2 border-black z-10 md:h-3/4 md:overflow-hidden"
        >
            {/* Barra superior */}
            <header className="flex sticky top-0 z-10 items-center justify-between border-b-[1px] border-black bg-[#F85031] text-black p-4 ">
                <h2
                    id="modal-title"
                    className="text-xl font-medium bebas-neue-regular md:text-xl md:spa md:tracking-wider"
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
            <main className="p-4 bg-[#FFFBF2] md:mx-8 md:max-h-[36rem] overflow-y-scroll">
                <ul className="flex flex-wrap justify-evenly gap-9">
                    {authors.map((thisAuthor, index) => (
                        <li
                            className="md:ml-8 md:text-wb-center md:flex-wrap"
                            key={index}
                        >
                            <img className="max-h-16" src={require('../assets/img/Authors/' + thisAuthor.nombreApellido.replace(/\s+/g, "").toLowerCase() + ".png")} alt="Imagen Autor" />
                            <span>{thisAuthor.nombreApellido}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
}
