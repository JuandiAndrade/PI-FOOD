import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/LandinPage.module.css"
import logo1 from "./styles/logos/logo1.png"

export default function LandingPage() {
  return (
    <div className={style.fondo}>
      <div className={style.logo1}>
        <img clasName={style.logo1} src={logo1} alt="img not found" />
      </div>
      <div className={style.container}>
        <div className={style.sub_container}>
          <h2>Bienvenido a una experiencia FOOD</h2>
          <Link to='/home'>
            <button className={style.button}>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  )
};