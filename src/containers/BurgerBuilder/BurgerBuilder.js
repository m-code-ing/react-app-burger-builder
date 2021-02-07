import React, { Component } from 'react';

import Aux from "../../hoc/Auxillary";
import BuildControl from '../../components/Burger/BuildControls/BuildControl';
import Burger from "../../components/Burger/Burger";


class BurgerBuilder extends Component {
    render () {
        return (
            <Aux>
                <Burger></Burger>
                <BuildControl></BuildControl>
                <div>Build Controls</div>
            </Aux>
        );
    }
};

export default BurgerBuilder;