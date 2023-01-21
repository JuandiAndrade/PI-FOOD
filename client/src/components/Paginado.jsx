import React from "react";
import style from "./styles/Paginado.module.css"

export default function Paginado({ allRecipes, paginado, currentPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allRecipes / 9); i++) {
    pageNumber.push(i)
  }


  if (currentPage === pageNumber.length + 1) {
    paginado(1)
  }


  return (

    <div className={style.paginado}>
      <button className={style.button} onClick={() => paginado(currentPage === 1 ? pageNumber.length : currentPage - 1)}> 🢀 </button>

      {pageNumber &&
        pageNumber.map(number => {

          return number < currentPage - 1 || number > currentPage + 1 ? null
            :
            (
              <button className={style.button} key={number} onClick={() => paginado(number)}>
                <p className={style.parrafo_paginado}>{currentPage === number ? <b>{number}</b> : number}</p>
              </button>
            )
        }
        )}
      <button className={style.button} onClick={() => paginado(currentPage === 0 ? pageNumber.length : currentPage + 1)}> 🢂 </button>

    </div>
  )
}