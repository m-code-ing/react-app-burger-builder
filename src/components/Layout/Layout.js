import React from 'react';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

import Aux from '../../hoc/Auxillary';
import Burger from "../Burger/Burger";

import classes from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
        <BurgerBuilder></BurgerBuilder>
    </Aux>

);

export default layout;