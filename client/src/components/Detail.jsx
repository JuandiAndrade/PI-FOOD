import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";



export default function Detail(props) {
  
  const dispatch = useDispatch()
  const {id} = useParams()
  
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch])
  
  
  const myRecipe = useSelector((state) => state.detail)
  
  
  return (
    <div>
      {
        myRecipe.length > 0 ?
          <div>
            <h2>{myRecipe[0].name}</h2>
            <img src={myRecipe[0].image} alt='Imágen de la receta' width='300px' height='300px' />
            <h4>Type: {myRecipe[0].dishTypes}</h4>
            <h4>Diets: {!myRecipe[0].createdInDb? myRecipe[0].diets + ' ' : myRecipe[0].diets.map(el => el.name + (' '))}</h4>
            <p>Summary: {myRecipe[0].summary}</p>
            <h4>HealthScore: {myRecipe[0].healthScore}</h4>
            <p>Steps: {!myRecipe[0].createdInDb? myRecipe[0].steps.map(el => el.number + (":") + el.step) : myRecipe[0].steps }</p>
          </div>
          : <p>Loading...</p>
      }
      <Link to='/home'>
        <button>Volver</button>
      </Link>
    </div>
  )
};