import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
    return(
	<div className={classes.BuildControls}>
		<p><strong>Current Price: $ {props.price.toFixed(2)} 
		</strong> </p>
		{props.purchasable}
	    {controls.map(ctrl => {
			return (				
				<BuildControl
					key={ctrl.label} 
					label={ctrl.label}
					added={() =>props.ingredientAdded(ctrl.type)}
					disabled = {props.disabled[ctrl.type]}
					removed={()=>props.ingredientRemoved(ctrl.type)} />

			);
		})}
		<button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
	</div>
        
    );
}

export default buildControls;