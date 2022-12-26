import React from "react";


export default function CardRecipe({ name, image, diets}) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="img not found" width="200px" height="250px" />
      <h4>{diets.map(el=> <li>{el}</li> )}</h4>
    </div>
  )
}