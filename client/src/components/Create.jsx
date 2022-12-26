import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from '../actions/index';


function validate(input){
  let errors = {};
  if (!input.name){
    errors.name = "se requiere nombre para receta"
  }else if (!input.summary){
    errors.summary = "Resumen debe ser completado"
  }
  return errors;
}

export default function Create() {

const dispatch = useDispatch()
// const history = useHistory()
const diets = useSelector((state)=> state.diets)
const [errors, setErrors] = useState({})

const [input, setInput] = useState({
  name: "",
  summary: "",
  healthScore: "",
  steps: "",
  diets:[]
})


function handleChange(e){
  setInput({
    ...input,
    [e.target.name] : e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name] : e.target.value
  }))
}
console.log(input)

// function handleCheck(e){
//   if(e.target.checked){
//     setInput({
//       ...input,
//       diets: e.target.value
//     })
//   }
// }
function handleSelect(e){
  setInput({
    ...input,
    diets: [...input.diets, e.target.value]
  })
}

function handleSubmit(e){
  e.preventDefault();
  console.log(input)
  dispatch(postRecipe(input))
  alert("Receta creada con exito")
  setInput({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diets:[]
  })
  // history.push('/home')
}

function handleDelete(el) {
  setInput({
    ...input,
    diets: input.diets.filter(diet => diet !== el)
  })
}


useEffect(()=>{
  dispatch(getDiets())
},[dispatch]);


return(
  <div>
    <Link to= '/home'><button>Inicio</button></Link>
    <h1>Crear Receta</h1>

    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label>Name:</label>
        <input 
        type= "text"
        value= {input.name}
        name="name"
        onChange={(e) => handleChange(e)}
        />
        {errors.name && (
          <p className="error">{errors.name}</p>)}

      </div>
      <br />
      <div>
      <label>summary:</label>
        <input 
        type= "text"
        value= {input.summary}
        name="summary"
        onChange={(e) => handleChange(e)}
        />
        {errors.summary && (
            <p className="error">{errors.summary}</p>)}
      </div>
      <br />
      <div>
      <label>healthScore:</label>
        <input 
        type= "number"
        value= {input.healthScore}
        name="healthScore"
        onChange={(e) => handleChange(e)}
        />
      </div>
      <br />
      <div>
      <label>steps:</label>
        <input 
        type= "text"
        value= {input.steps}
        name="steps"
        onChange={(e) => handleChange(e)}
        />
      </div>


      {/* <div>
      <label>diets:</label>
        <label><input 
        type= "checkbox"
        value= "gluten free"
        name="gluten free"
        onChange={(e)=> handleCheck(e)}
        />
        gluten free</label>

        <label><input 
        type= "checkbox"
        value= "dairy free"
        name="dairy free"
        onChange={(e)=> handleCheck(e)}
        />
        dairy free</label>

        <label><input 
        type= "checkbox"
        value= "lacto ovo vegetarian"
        name="lacto ovo vegetarian"
        onChange={(e)=> handleCheck(e)}
        />
        lacto ovo vegetarian</label>

        <label><input 
        type= "checkbox"
        value= "vegan"
        name="vegan"
        onChange={(e)=> handleCheck(e)}
        />
        vegan</label>

        <label><input 
        type= "checkbox"
        value= "paleolithic"
        name="paleolithic"
        onChange={(e)=> handleCheck(e)}
        />
        paleolithic</label>

        <label><input 
        type= "checkbox"
        value= "primal"
        name="primal"
        onChange={(e)=> handleCheck(e)}
        />
        primal</label>

        <label><input 
        type= "checkbox"
        value= "whole 30"
        name="whole 30"
        onChange={(e)=> handleCheck(e)}
        />
        whole 30</label>

        <label><input 
        type= "checkbox"
        value= "pescatarian"
        name="pescatarian"
        onChange={(e)=> handleCheck(e)}
        />
        pescatarian</label>

        <label><input 
        type= "checkbox"
        value= "ketogenic"
        name="ketogenic"
        onChange={(e)=> handleCheck(e)}
        />
        ketogenic</label>

          <label><input 
        type= "checkbox"
        value= "fodmap friendly"
        name="fodmap friendly"
        onChange={(e)=> handleCheck(e)}
        />
        fodmap friendly</label>

      </div> */}
      <br />
      <select onChange={(e) => handleSelect(e)}>
          <option value="Diets:">Diets:</option>
        {diets.map((el)=>(
          <option value={el}>{el}</option>
        ))}
      </select>
      {/* <li>{input.diets.map(el => "diets: "+ el + " ,")}</li> */}
      <button type="submit">Crear Receta</button>

    </form>
    {input.diets.map(el =>
        <div>
          <p>{el}</p>
          <button className="botonX" onClick={() => handleDelete(el)}>x</button>
        </div>
        )}
  </div>
)



};