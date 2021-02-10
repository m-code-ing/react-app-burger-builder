import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../Layout/UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary'

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    console.log(props.open);

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>

            </div>
        </Aux>
    );
};

export default sideDrawer;