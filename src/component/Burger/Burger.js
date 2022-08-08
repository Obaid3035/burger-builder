import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((igkey) => {
        return [...Array(props.ingredients[igkey])].map(( _, i ) => {
            return <BurgerIngredient key={igkey + i } type={igkey}/>
        })
        console.log(props.ingredients)
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add an ingredient</p>
    }

    return(
        <div className={classes.Burger}>
            <p>Burger</p>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>


    );
};

export default burger;