import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../component/Burger/Burger";
import classes from "../../component/Burger/BurgerIngredient/BurgerIngredient.css";

class BurgerBuilder extends Component {
    render() {
        console.log(classes.BreadBottom);
        return (
            <Aux>
                <Burger />
                <div className={classes.BreadBottom}/>
                <h2>Build Control</h2>
            </Aux>
        )
    }
}

export default BurgerBuilder
