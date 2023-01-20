import React from "react";
import { NavLink } from "react-router-dom";
import style from "./styles/CardRecipe.module.css"
import { deleteRecipe } from '../actions';
import { useDispatch } from "react-redux";


export default function CardRecipe({ name, image, diets, id, healthScore, createdInDb }) {

  const dispatch = useDispatch();
  function handleClickCard(id) {
    dispatch(deleteRecipe(id));
  }


  return (
    <div className={style.sup}>
      <div className={style.card}>
        <div className={style.container_button}>
          {createdInDb && createdInDb ? <button className={style.button} onClick={() => { handleClickCard(id) }}>Borrar</button> : null}
        </div>
        <div className={style.card_image_wrapper}>
          <NavLink to={"/home/" + id} className={style.link}>
            <div className={style.card_view}>
              <p className={style.parrafo}>Ver Detalles</p>
            </div>
            <img className={style.card_image} src={image} alt="img not found" />
          </NavLink>
        </div>
        <div className={style.card_content_wrapper}>
          <h1 className={style.card_title}>{name}</h1>
          <div className={style.card_recipe_info}>
            <h2 className={style.card_recipe_category}>Health Score: {healthScore}</h2>
          </div>
          <div className={style.card_description}><h4>Diets:</h4> {diets?.map((el, i) => <p key={i}>{el}</p>)}</div>
        </div>
      </div>
    </div>
  )
}





