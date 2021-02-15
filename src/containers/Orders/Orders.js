import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; commented this as this is not working.. see previous commit message
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: null
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch((err) => {
                this.setState({ loading: false, error: err});
            });
    }
    render() {
        return (
            <div>
                <Modal
                    show={this.state.error}
                    // show
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                {this.state.orders.map((order) => {
                    return <Order 
                    key={order.key}
                    ingredients={order.ingredients}
                    price={order.price}
                     />
                })}
            </div>
        )
    }
}

export default Orders;