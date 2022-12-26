import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "./CardRecipe";
import { getRecipe, filter, filter2, getDiets, filter3 } from '../actions';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Paginado from "./Paginado";


export default function Home() {
 
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state)=> state.diets)

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexLastRecipe = currentPage * recipesPerPage
  const indexFirstRecipe = indexLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  function handleFilter(e) {
    // e.preventDefault();
    dispatch(filter(e.target.value))
  }
  function handleFilter3(e) {
    // e.preventDefault();
    dispatch(filter3(e.target.value))
  }


  function handleSelect(e){
    dispatch(filter2(e.target.value))
  }

  useEffect(() => {     
    dispatch(getRecipe())
    dispatch(getDiets())
  }, [dispatch])

  
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipe());
  }


  return (
    <div>
      <Link to='/recipes'>
       <button>Crear Receta</button> 
      </Link>
      <h1>HOME</h1>
      <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />

      <SearchBar />

      <button onClick={e => { handleClick(e) }}>
        CARGAR RECETAS
      </button>
      <br/>
      <select onChange={e => handleFilter(e)}>
          <option value='all'>Todos</option>
          <option value='db'>Creados</option>
          <option value='api'>Existente</option>
      </select>
      <br/>


      <select onChange={(e) => handleSelect(e)}>
          <option value="Diets:">Diets:</option>
        {diets.map((el)=>(
          <option value={el}>{el}</option>
        ))}
      </select>

      <br/>

      <select onChange={e => handleFilter3(e)}>
          <option value='az'>AZ</option>
          <option value='za'>ZA</option>
          <option value='minMax'>MIN MAX</option>
          <option value='maxMin'>MAX MIN</option>
      </select>



      {currentRecipes?.map((c) => {
          return (
            <Fragment>  
                <Link to={"/home/" + c.id}>
                <CardRecipe name={c.name} image={c.image} key={c.id} diets={!c.createdInDb? c.diets : c.diets.map(el=>el.name)} /> 
                </Link>              
            </Fragment>
          )
        })
        }

    </div>
  )
};