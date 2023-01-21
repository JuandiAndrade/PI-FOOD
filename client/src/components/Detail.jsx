import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";
import style from "./styles/Detail.module.css"

export default function Detail() {

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])


  ////////// IMPLEMENTARLO CON GETDETAIL DE LAS ACTION////////////
  ////// PARA QUE SE DESMONTE CUANDO SALGO DEL DETALLE Y NO ME QUEDE LA IMAGEN CUANDO CARGO EL DETALLE DE OTRA DIETA///
  //   useEffect(() => {
  //     return dispatch(getDetail("clear"))                 
  // eslint-disable-next-line react-hooks/exhaustive-deps   
  //   }, [])

  const myRecipe = useSelector((state) => state.detail)

  console.log(myRecipe)
  return (

    <div>
      {
        myRecipe?.length > 0 ?
          <div>
            <div className={style.container}>
              <div><img className={style.img} src={myRecipe[0]?.image} alt='Imágen de la receta' width='400px' height='400px' /></div>
              <div className={style.subcontainer1}>
                <div><h2>{myRecipe[0]?.name}</h2></div>
                <div><h3>Dieta </h3><p>{myRecipe[0]?.diets + ' '}</p></div>
                <div><h3>Nivel de Salud</h3><p> {myRecipe[0]?.healthScore}</p></div>
                <div><h3>Tipos de Platos:</h3> <p>{!myRecipe[0]?.createdInDb ? myRecipe[0]?.dishTypes.map(el => el + (", ")) : myRecipe[0]?.dishTypes}</p></div>
              </div>
            </div>
            <div className={style.resumen}><h3>Resumen</h3> <p>{myRecipe[0]?.summary}</p></div>
            <div className={style.pasos}><h3>Pasos</h3> <p>{!myRecipe[0]?.createdInDb ? myRecipe[0]?.steps?.map(el => <li>{el.number + (": ") + el.step}</li>) : myRecipe[0]?.steps}</p></div>
          </div>
          : <p>Loading...</p>
      }
    </div>
  )
};