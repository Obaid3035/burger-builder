import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import * as action from '../../store/actions/index'

class Checkout extends Component {


    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    render() {
        let summary = <Redirect to={'/'}/>
        const purchaseRedirect = this.props.purchase ? <Redirect to={'/'}/> : null
        if (this.props.ings) {
            summary = (
                <div>
                    {console.log(this.props.purchase)}
                    {purchaseRedirect}
                    <CheckoutSummary
                        checkoutContinue={this.checkoutContinueHandler}
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                    />
                    <Route
                        path={this.props.match.path+ '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchase: state.order.purchase
    }
}


export default connect(mapStateToProps)(Checkout)
