import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDiets, postRecipe } from '../actions/index';
import style from "./styles/Create.module.css"


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
      <div className={style.containerTotal}>
    <div>
      <NavLink to={"/home"}>
      <button>Home</button>
      </NavLink>
      </div>  
        <h3>Crear Receta</h3>
        <form onSubmit={(e) => handleSubmit(e)}>



          <div className={style.item}>
            <label>Name:</label>
            <input
              // className={errors.name && "error"}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <p className="error">{errors.name}</p>)}
          </div>


          <div className={style.item}>
            <label>summary:</label>
            <textarea
              // className={errors.summary && "error"}
              type="text"
              value={input.summary}
              name="summary"
              rows="5" cols="80"
              onChange={(e) => handleChange(e)}
            />
            {errors.summary && (
              <p className="error">{errors.summary}</p>)}
          </div>

          <div className={style.item}>
            <label>healthScore:</label>
            <input
              // className={errors.healthScore && "error"}
              type="number"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
            />
            {errors.healthScore && (
              <p className="error">{errors.healthScore}</p>)}
          </div>

          <div className={style.item}>
            <label>steps:</label>
            <textarea
              type="text"
              value={input.steps}
              name="steps"
              rows="5" cols="80"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={style.item}>
            <label>dishTypes:</label>
            <input
              type="text"
              value={input.dishTypes}
              name="dishTypes"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={style.option}>
            <p>Seleccione una o varias opciones de dieta</p>
            <div className={style.diets}>
              {diets?.map(el => {
                return (
                  <div className={style.diet}>
                    <lu>{el}</lu>
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
          <div className={style.button}>
            {Object.keys(errors).length === 0 ? <button type="submit">Crear Receta</button> : null}
          </div>
        </form>
      </div>
    </div>
  )
};
