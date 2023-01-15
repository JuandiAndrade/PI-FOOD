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
				recipes: action.payload
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
				diets: [...action.payload, "verde"]
			}
		case 'POST_RECIPE':
			return {
				...state
			}
		case 'GET_FILTERED':
			return {
				...state,
				recipes: action.payload
			}
		default:
			return state;
	}

};

export default rootReducer;