import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxillary/Auxillary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders'
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

	state = {
		// ingredients: {
		// 	salad: 0,
		// 	bacon: 0,
		// 	cheese: 0,
		// 	meat: 0
		// },
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		console.log(this.props);
		axios.get('https://react-burger-app-34ff2-default-rtdb.firebaseio.com/ingredietns.json')
			.then((response) => {
				this.setState({ ingredients: response.data });
			})
			.catch((error) => {
				this.setState({ error: true })
			});
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

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purcchaseContinueHandler = () => {
		// alert('You continue!');

		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render() {
		const disableInfo = {
			...this.props.ings
		}

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		let orderSummary = < OrderSummary
			ingredients={this.props.ings}
			price={this.props.price}
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
				<Burger ingredients={this.props.ings}></Burger>
				<BuildControls
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					disabled={disableInfo}
					purchasable={this.state.purchasable}
					price={this.props.price}
					ordered={this.purchaseHandler}
				/>
			</Aux >
		);
	}
};
const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price : state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));