import React from "react";
import { NavLink } from "react-router-dom";
import style from "./styles/Nav.module.css"
import logo from "./styles/logos/logo2.png"

export default function NavBar() {
	function handleClick2(e) {
		e.preventDefault();
		window.location.reload(false);
	}

	return (
		<div className={style.containerNav}>
			<div className={style.logo}>
				<img  className={style.logo} src={logo} alt="img not found" />
			</div>
			<div className={style.items}>
				<NavLink to='/recipes' className={style.link}>
					<button className={style.button}>Crear Receta</button>
				</NavLink>
				<NavLink to='/home' className={style.link}>
					<button className={style.button}>Recetas</button>
				</NavLink>
				<button className={style.button} onClick={e => { handleClick2(e) }}>Refrescar</button>
			</div>
		</div>
	)
};