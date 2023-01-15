import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtered } from '../actions';
import { useState } from "react";
import style from "./styles/Filtered.module.css"


export default function Filtered() {

    const dispatch = useDispatch();

    const diets = useSelector((state) => state.diets)

    const [dbApi, setDbapi] = useState("")
    const [type, setType] = useState("")
    const [order, setOrder] = useState("")

    const changeDbApi = (e) => {
        e.preventDefault();
        setDbapi(e.target.value)
    }
    const changeType = (e) => {
        setType(e.target.value)
    }
    const changeOrder = (e) => {
        e.preventDefault();
        setOrder(e.target.value)
    }
    function handleClick1(e) {
        e.preventDefault();
        dispatch(filtered(dbApi, order, type));
    }

    function handleClick2(e) {
        e.preventDefault();
        window.location.reload(false);
    }

    return (
        <div className={style.filtered2}>
            <select onChange={e => changeDbApi(e)}>
                <option value='all'>Todas las Recetas</option>
                <option value='db'>Recetas Creadas</option>
                <option value='api'>Recetas Existentes</option>
            </select>
            <select onChange={e => changeType(e)}>
                <option value="vacio">Tipo de Dieta</option>
                {diets.map((el, i) => (
                    <option key={i} value={el}>{el}</option>
                ))}
            </select>
            <select onChange={e => changeOrder(e)}>
                <option value='vacio'>Orden</option>
                <option value='az'>Alfabetico: A-Z</option>
                <option value='za'>Alfabetico: Z-A</option>
                <option value='minMax'>Salud: MIN A MAX</option>
                <option value='maxMin'>Salud: MAX A MIN</option>
            </select>
            <button className={style.button} onClick={e => { handleClick1(e) }}>Aplicar filtros</button>
            <button className={style.button} onClick={e => { handleClick2(e) }}>Reset</button>
        </div>
    )
};