import  React, { Component } from "react";
import BurgerIngredient from "../../Burger/BurgerIngredients/BurgerIngredient";

import classes from "./Burger.module.css";

class Burger extends Component {
    render (){
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                <BurgerIngredient type="cheese"/>
                <BurgerIngredient type="meat"/>
                <BurgerIngredient type="bread-bottom"/>
            </div>
        );
    }
}

export default Burger;