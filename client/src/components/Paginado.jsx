import React from "react";
import style from "./styles/Paginado.module.css"

export default function Paginado({ allRecipes, paginado }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allRecipes / 9); i++) {
    pageNumber.push(i)
  }
  return (

    <div className={style.paginado}>
      {pageNumber &&
        pageNumber.map(number => (
          <button className={style.button} key={number}>
            <p onClick={() => paginado(number)}>{number}</p>
          </button>
        ))}
    </div>

  )
}