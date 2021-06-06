import React, {Component} from 'react';
import Input from "../../component/UI/Input/Input";
import Button from "../../component/UI/Button/Button";
import * as actions from '../../store/actions/index'
import Spinner from "../../component/UI/Spinner/Spinner";
import {connect} from "react-redux";
import classes from './Auth.css'

class Auth extends Component {

    state = {
        control: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: ''
            },
        },
        isSignUp: true
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.control,
            [controlName]: {
                ...this.state.control[controlName],
                value: event.target.value
            }
        };
        this.setState({control: updatedControls})
        console.log(updatedControls)

    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.control.email.value)
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignUp: !prevState.isSignUp}
        })
    }


    render() {
        const formElementArray = [];
        for(let key in this.state.control) {
            formElementArray.push({
                id: key,
                config: this.state.control[key]
            })
        }
        let form = formElementArray.map((formElement) => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>)
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form>
                    {form}
                    <Button type={'submit'} clicked={this.submitHandler} btnType={'Success'}>Submit</Button>
                </form>
                <Button btnType={'Danger'} clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'} </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
