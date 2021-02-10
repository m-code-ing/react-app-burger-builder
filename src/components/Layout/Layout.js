import React, { Component } from 'react'


import Aux from '../../hoc/Auxillary';

import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawer: true
    }

    sieDrawerClosedHandler = () => {
        this.setState({sideDrawer: false });
    }
    render() {
        // console.log(this.state.sideDrawer);
        return (
            <Aux>
                <Toolbar open={this.state.sideDrawer} sideDrawer={this.backdropToggle} />
                <SideDrawer open={this.state.sideDrawer} closed={this.sieDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                    <BurgerBuilder></BurgerBuilder>
                </main>
            </Aux>
        )
    }
}


export default Layout;