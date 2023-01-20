const initialState = {
	recipes: [],
	detail: [],
	diets: []
};

function rootReducer(state = initialState, action) {
	switch (action.type) {

		case 'GET_RECIPES':
			return {
				...state,
				recipes: action.payload,
			}

		case 'GET_NAME_RECIPES':
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
				diets: [...action.payload]
			}

		case 'POST_RECIPE':
			return {
				...state
			}

		case 'GET_FILTERED':
			console.log("action.payload en reducer:", action.payload)
			return {
				...state,
				recipes: action.payload
			}

		case 'DELETE_RECIPE':
			const result = state.recipes.filter(el => el.id !== action.payload)
			return {
				...state,
				recipes: result
			}

		default:
			return state;
	}

};

export default rootReducer;