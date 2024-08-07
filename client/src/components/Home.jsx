import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "./CardRecipe";
import Paginado from "./Paginado";
import style from "./styles/Home.module.css";
import SearchBar from "./SearchBar";
import Filtered from "./Filtered";
import { getRecipe, getDiets } from '../actions';

export default function Home() {

  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9
  const indexLastRecipe = currentPage * recipesPerPage
  const indexFirstRecipe = indexLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getRecipe())
    dispatch(getDiets())
  }, [dispatch])


  return (
    <div className={style.home}>
      <div className={style.container_search}>
        <SearchBar
          paginado={paginado}
        />
      </div>
      <div className={style.container_pag_inf}>
        <Paginado
          currentPage={currentPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
      <div className={style.container}>
        <div className={style.filtered}>
          <Filtered
            paginado={paginado} />
        </div>
        <div className={style.container_inf}>

        </div>
        <div className={style.cards}>
          {currentRecipes?.map((c) => {
            return (
              <div key={c.id}>
                <CardRecipe
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  healthScore={c.healthScore}
                  image={c.image}
                  diets={c.diets}
                  createdInDb={c.createdInDb}
                />
              </div>
            )
          })
          }
        </div>
      </div>
      <div className={style.container_pag_inf}>
        <Paginado
          currentPage={currentPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
    </div>
  )
};

















// // MOUNT
// useEffect(() => {
//   // alert("cuando se monta este alert se dispara")
// }, []);

// // MIXT cdo se MOUNT + la action o function que se ejecuta
// useEffect(() => {
//   // alert("cuando se monta este alert se dispara")
// }, [dispatch]);

// // UPDATE
// useEffect(() => {
//   // alert("cuando se actualiza este alert se dispara")
// }); // <-

// // DISMOUNT
// useEffect(() => {
//   return; // return es equivaqlente al desmontar
//   // alert("cuando se desmonta este alert se dispara")
//   // locura [1.000.000] locura =[]
//   });