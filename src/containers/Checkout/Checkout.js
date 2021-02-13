import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/UI/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log(this.props.location);
        console.log('URLSearchParams : ' + query);
        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            ingredients[param[0]] = +param[1];
            console.log(ingredients);
        }
        this.setState({ ingredients: ingredients });
    }


    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData} />
            </div>
        )
    }
}
export default Checkout;