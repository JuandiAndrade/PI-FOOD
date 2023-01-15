import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDiets, postRecipe } from '../actions/index';
import style from "./styles/Create.module.css"
import logo from "./styles/logo2.png"


function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name requiere ser completado"
  } else if (!input.summary) {
    errors.summary = "summary requiere ser completado"
  } else if (input.healthScore > 100 || input.healthScore < 0) {
    errors.healthScore = 'el valor tiene que encontrarse entre 0 y 100';
  }
  return errors;
}

export default function Create() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)
  const [errors, setErrors] = useState({
    name: "",
    healthScore: "",
    summary: ""
  })

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    dishTypes: "",
    diets: []
  })


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log("aca esta el erro", errors)
  }
  console.log(input)

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
    console.log("check", e.target.checked)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postRecipe(input))
    alert("Receta creada con exito")
    setInput({
      name: "",
      summary: "",
      healthScore: "",
      steps: "",
      dishTypes: "",
      diets: []
    })
    setErrors({
      name: "",
      summary: "",
      healthScore: ""
    })
    console.log("este es el e del submit", e.target[4].checked)

    for (let index = 4; index < e.target.length; index++) {
      if (e.target[index].checked) {
        e.target[index].checked = false
      }
    }
    // navigate("/home")
  }

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch]);


  return (
    <div className={style.sup}>




      <div className={style.containerNav}>
        <div className={style.logo}>
          <img src={logo} alt="img not found" />
        </div>
        <div className={style.items}>
          <NavLink to={"/home"}>
            <button className={style.button}>Recetas</button>
          </NavLink>
        </div>






      </div>
      <div className={style.containerTotal}>
        <div>
        </div>
        <h2>Crear Receta</h2>
        <form onSubmit={(e) => handleSubmit(e)}>



          <div className={style.item}>
            <label>Nombre de Receta</label>
            <input
              // className={errors.name && "error"}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <p className={style.error}>{errors.name}</p>)}
          </div>


          <div className={style.item}>
            <label>Resumen</label>
            <textarea
              // className={errors.summary && "error"}
              type="text"
              value={input.summary}
              name="summary"
              rows="5" cols="80"
              onChange={(e) => handleChange(e)}
            />
            {errors.summary && (
              <p className={style.error}>{errors.summary}</p>)}
          </div>

          <div className={style.item}>
            <label>Nivel de Salud</label>
            <input
              // className={errors.healthScore && "error"}
              type="number"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
            />
            {errors.healthScore && (
              <p className={style.error}>{errors.healthScore}</p>)}
          </div>

          <div className={style.item}>
            <label>Pasos</label>
            <textarea
              type="text"
              value={input.steps}
              name="steps"
              rows="5" cols="80"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={style.item}>
            <label>Tipo de Plato</label>
            <input
              type="text"
              value={input.dishTypes}
              name="dishTypes"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={style.option}>
            <label>Seleccione Tipo de Dieta</label>
            <div className={style.diets}>
              {diets?.map(el => {
                return (
                  <div className={style.diet}>
                    <lu className={style.lista}>{el}</lu>
                    <label>
                      <input
                        type="checkbox"
                        value={el}
                        name={el}
                        onChange={(e) => handleCheck(e)} />
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={style.buttonsubmit}>
            {Object.keys(errors).length === 0 ? <button className={style.button} type="submit">Crear Receta</button> : null}
          </div>
        </form>
      </div>
    </div>
  )
};
