import React from 'react';

import Aux from '../../hoc/Auxillary';

import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Layout.module.css'; 

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
            <BurgerBuilder></BurgerBuilder>
        </main>        
    </Aux>

);

export default layout;