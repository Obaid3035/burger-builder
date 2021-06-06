import React, { Component } from 'react';
import { connect } from "react-redux";
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import Aux from '../../hoc/Aux/Aux';
import Burger from "../../component/Burger/Burger";
import classes from "../../component/Burger/BurgerIngredient/BurgerIngredient.css";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from '../../component/UI/Modal/Modal'
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary'
import Spinner from "../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as action from "../../store/actions";



class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredient();
    }

    updatePurchaseState = () => {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients).map((ingKey) => {
            return ingredients[ingKey];
        }).reduce((prev, el) => {
            return prev + el;
        }, 0)
        this.setState({purchasable: sum > 0 })
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }
    render() {

        let orderSummary = null

        const disabledInfo = {
            ...this.props.ings
        }
        for (let k in disabledInfo) {
            disabledInfo[k] = disabledInfo[k] <= 0;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />


        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <div className={classes.BreadBottom}/>
                    <BuildControls price={this.props.price}
                                   ingredientAdded={(this.props.onIngredientAdded)}
                                   ingredientRemoved={(ingName) => this.props.onIngredientRemoved(ingName)}
                                   purchasable={this.updatePurchaseState}
                                   disabled={disabledInfo}
                                   ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         purchaseCanceled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler}
                                         price={this.props.price}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase: () => dispatch(action.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
