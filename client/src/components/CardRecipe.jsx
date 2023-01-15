import React from "react";
import { NavLink } from "react-router-dom";
import style from "./styles/CardRecipe.module.css"


export default function CardRecipe({ name, image, diets, id, healthScore }) {
  return (
    <div className={style.sup}>
      <NavLink to={"/home/" + id} className={style.link}>
        <div className={style.card}>
          <div className={style.card_image_wrapper}>
            <div className={style.card_view}>
              <p>View Recipe</p>
            </div>
            <div className={style.card_view}>
              <p>View Recipe</p>
            </div>
            <img className={style.card_image} src={image} alt="img not found" />
          </div>
          <div className={style.card_content_wrapper}>
            <h1 className={style.card_title}>{name}</h1>
            <div className={style.card_recipe_info}>
              <h2 className={style.card_recipe_category}>Health Score: {healthScore}</h2>
            </div>
            <div className={style.card_description}><h3>Diets:</h3> {diets?.map((el, i) => <p key={i}>{el}</p>)}</div>
          </div>
        </div>
      </NavLink>
    </div>







    // <div className={style.card}>     
    //   <NavLink to={"/home/" + id} className={style.link}>
    //   <img className={style.img} src={image} alt="img not found"/>
    //   <div className={style.md}>
    //   <h4>{name}</h4>   
    //   <div><h5>Health Score: {healthScore}</h5></div>
    //   <div className={style.tx}><h5>Diets:</h5> {diets?.map((el, i)=> <p key={i}>{el}</p> )}</div>
    //   </div>
    //   </NavLink>
    // </div>
  )
}





