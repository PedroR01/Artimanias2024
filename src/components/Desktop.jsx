import React from "react";
import Folder from "./Folder";
import logoArti from "../assets/img/logo_arti.png";

export default function Desktop() {
  return (
    <section>
      <div class="relative">
        <div class="absolute top-0 right-0 h-16 w-16">
          <img src={logoArti} alt="" />
        </div>
      </div>
      <ul>
        <li>
          <Folder title="Realidad Aumentada" />
        </li>
        <li>
          <Folder title="Arte Electronico" />
        </li>
        <li>
          <Folder title="Videojuegos" />
        </li>
        <li>
          <Folder title="Mapping" />
        </li>
      </ul>
    </section>
  );
}
