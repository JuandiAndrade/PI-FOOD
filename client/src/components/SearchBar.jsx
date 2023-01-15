import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNameRecipes } from "../actions";
import style from "./styles/Home.module.css"

export default function SearchBar() {
  const dispach = useDispatch(" ")
  const [name, setName] = useState(" ")

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispach(getNameRecipes(name))
    setName("")
  }
  return (
    <div className={style.search}>
      <input
        className={style.input_search}
        type='text'
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
        value={name}
      />
        <button className={style.button_search} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>

  )
}