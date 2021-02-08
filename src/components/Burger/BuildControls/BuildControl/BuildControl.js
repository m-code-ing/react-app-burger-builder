import React from "react";

import classes from "./BuildControl.module.css";

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <button>Less</button>
            <button>More</button>
            <div>Ingredient</div>
        </div>
    );
}
export default buildControl;