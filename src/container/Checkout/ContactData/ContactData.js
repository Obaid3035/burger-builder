import React, {Component} from 'react'
import Button from "../../../component/UI/Button/Button";
import classes from './ContactData.css'
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import Spinner from "../../../component/UI/Spinner/Spinner";
import Input from "../../../component/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as action from '../../../store/actions/order'

class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Name'
                },
                value: ''
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Street'
                },
                value: ''
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'ZipCode'
                },
                value: ''
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Country'
                },
                value: ''
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                        ]
                },
                value: 'fastest'
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        console.log(formData.deliveryMethod)
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order, this.props.token)
    }
    inputChangedHandler (event, inputIdentifier) {
        console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm})
    }


    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {
                    formElementArray.map((formElement) => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))
                }
                <Button btnType={'Success'} clicked={this.orderHandler}>Order</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(action.purchaseBurger(orderData, token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
