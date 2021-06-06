import * as actionType from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            console.log(state.ingredients[action.ingredientName])
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false
            };
        case actionType.FETCH_INGREDIENT_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default burgerBuilder


