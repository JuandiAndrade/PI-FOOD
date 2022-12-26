import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  console.log("console.log = Estamos en landing")
  return (
    <div>
      <h1>Ingrese y explote de sabor</h1>
      <Link to='/home'>
        <button>Ingresar</button>
      </Link>
    </div>
  )
};