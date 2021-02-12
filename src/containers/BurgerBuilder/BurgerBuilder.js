import React, { Component } from 'react';

import Aux from "../../hoc/Auxillary/Auxillary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}
				, 0);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceReduction = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceReduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purcchaseContinueHandler = () => {
		// alert('You continue!');
		this.setState({loading: true});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice.toFixed(2),
			customer: {
				name: 'Mayank',
				address: {
					street: 'Teststreet 1',
					zipCode: '123412',
					country: 'Canada'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false, purchasing: false});
			})
			.catch(error => {
				this.setState({loading: false, purchasing: false});
			});
	}

	render() {
		const disableInfo = {
			...this.state.ingredients
		}

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		let orderSummary = < OrderSummary
			ingredients={this.state.ingredients}
			price={this.state.totalPrice}
			checkout={this.purcchaseContinueHandler} />

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disableInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
				/>
			</Aux >
		);
	}
};

export default withErrorHandler(BurgerBuilder, axios);