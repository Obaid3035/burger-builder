import React from 'react';
import classes from './Order.css'

const Order = ( props ) => {
    const ingredients = [];

    for( let ingredientsName in props.ingredients) {
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        })
    }

    const ingredientsOutput =  ingredients.map((ig) => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>
            {ig.name} ({ig.amount})
        </span>
    })
    return (

    <div className={classes.Orders}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
