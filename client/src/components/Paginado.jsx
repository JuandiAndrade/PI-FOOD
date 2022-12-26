import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i)
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
          pageNumber.map(number => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a> 
            </li>
          ))}
      </ul>
    </nav>
  )
}