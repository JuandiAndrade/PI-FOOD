const initialState = {
    recipes: [],
    detail: [],
    diets: []
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_NAME_CHARACTERS':
            return {
                ...state,
                recipes: action.payload
            }
        case "GET_DETAILS":
        return { 
            ...state,
            detail: action.payload
            }
        case 'GET_DIETS':
        return {
            ...state,
            diets: action.payload
        }
        case 'POST_RECIPE':
            return {
              ...state
        }
        case 'GET_FILTER':
            return {
               ...state,
               recipes: action.payload 
            }
        case 'GET_FILTER2':
            return {
               ...state,
               recipes: action.payload 
            }
        case 'GET_FILTER3':
            return {
                ...state,
                recipes: action.payload 
            }
        default:
        return state;
    }
    
};

export default rootReducer;