import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientError = ( ) => {
    return {
        type: actionTypes.FETCH_INGREDIENT_ERROR
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then((response) => {
                dispatch(setIngredient(response.data))
            }).catch((err) => {
                dispatch(fetchIngredientError())
        })
    }
}


