import axios from "axios";


export function getRecipe() {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: 'GET_RECIPES',
        payload: json.data
      })
    }
  }

  export function getNameCharacters(name) {
    return async function (dispatch) {
      try {
        var json = await axios.get('http://localhost:3001/recipes?name=' + name);
        return dispatch({
          type: 'GET_NAME_CHARACTERS',
          payload: json.data
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  export function getDetail(id) {
    return async function(dispatch){
      try {
        var json = await axios.get("http://localhost:3001/recipes/" + id);
        return dispatch({
          type: "GET_DETAILS",
          payload: json.data
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  export function getDiets(){
    return async function(dispatch){
      var json = await axios.get('http://localhost:3001/diets');
      return dispatch({
        type: 'GET_DIETS',
        payload: json.data
      })
    }
  }

  export function postRecipe(payload){
    return async function(){
      const response = await axios.post("http://localhost:3001/recipes", payload)
      return response
    }
  }

  export function filter(payload){
    return async function(dispatch){
      const json = await axios.get("http://localhost:3001/filtered?dbApi=" + payload)
      return dispatch({
        type: 'GET_FILTER',
        payload: json.data
      })
    }
  }

  export function filter2(payload){
    return async function(dispatch){
      const json = await axios.get("http://localhost:3001/filtered2?type=" + payload)
      return dispatch({
        type: 'GET_FILTER2',
        payload: json.data
      })
    }
  }

  export function filter3(payload){
    return async function(dispatch){
      const json = await axios.get("http://localhost:3001/filtered3?order=" + payload)
      return dispatch({
        type: 'GET_FILTER3',
        payload: json.data
      })
    }
  }