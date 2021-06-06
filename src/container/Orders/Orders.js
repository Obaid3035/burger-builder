import React, {Component} from 'react'
import Order from "../../component/Order/Order";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from '../../store/actions/index'
import Spinner from "../../component/UI/Spinner/Spinner";
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder(this.props.token);
    }

    render() {
        let order = <Spinner />;
        if (!this.props.loading) {
            order =this.props.orders.map((order) => {
                return (
                    <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                )
            })
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token) => dispatch(action.fetchOrder(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
