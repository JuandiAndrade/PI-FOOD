import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./styles/Nav.module.css"
import logo from "./styles/logo2.png"

export default function NavBar() {
	function handleClick2(e) {
		e.preventDefault();
		window.location.reload(false);
	}

	return (
		<div className={style.containerNav}>
			<div className={style.logo}>
				<img src={logo} alt="img not found" />
			</div>
			<SearchBar />
			<div className={style.items}>
				<button className={style.button} onClick={e => { handleClick2(e) }}>Refrescar</button>
				<NavLink to='/home' className={style.link}>
					<button className={style.button}>Recetas</button>
				</NavLink>
				<NavLink to='/recipes' className={style.link}>
					<button className={style.button}>Crear Receta</button>
				</NavLink>
			</div>
		</div>
	)
};