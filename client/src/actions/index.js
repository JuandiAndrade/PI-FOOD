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

export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/recipes?name=' + name);
      return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getDetail(id) {
  return async function (dispatch, getState) {
    try {
      if(id === "clear"){
        return dispatch({
          type: "GET_DETAILS",
          payload: {}
        })
      }
      const recipes = await getState().recipes
      const detail = recipes.filter(e => e.id === Number(id))
      console.log(recipes)
      console.log("detail:", detail)
      return dispatch({
        type: "GET_DETAILS",
        payload: detail
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/diets');
    return dispatch({
      type: 'GET_DIETS',
      payload: json.data
    })
  }
}

export function postRecipe(payload) {
  return async function () {
    const response = await axios.post("http://localhost:3001/recipes", payload)
    return response
  }
}

export function filtered(dbApi, order, type) {
  const db = dbApi === "" ? "all" : dbApi
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/filtered?dbApi=" + db + "&order=" + order + "&type=" + type)
    return dispatch({
      type: 'GET_FILTERED',
      payload: json.data
    })
  }
}



export function deleteRecipe(id){
  return {type:'DELETE_RECIPE', payload: id}
}