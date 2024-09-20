import React from "react";
import Folder from "./Folder";

export default function Desktop() {
  return (
    <section>
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
