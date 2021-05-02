import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// Even with all these type 'errors', the app will still run just fine.
// every .ts (or .tsx for react components) will compile to a vanilla .js file
// so it can be run on the browser.
// The errors given to us by the TS compiler are just there to help us write nice code. 

interface GeneralButtonProps {
	// We can add custom props here, otherwise no need to redefine existing MUI types
	// when we can either: 
	// 1. extend their type instead with `interface GeneralButtonProps extends ButtonProps`
	// 2. use an intersection of types as done below (which I prefer, extending types can get messy)

	// // Declare a prop like this:
	// requiredProp: number;
	// // You can add optional props with a '?' like below
	// optionalProp?: string;
	// // You can declare prop types as either of multiple types:
	// stringOrNumber?: string | number;
	// // or two types joined together
	// stringAndNumber?: string & number;

	children: React.ReactNode;
	color?: "inherit" | "primary" | "secondary" | "default";
	disabled?: boolean;
	href?: string;
	variant?: "text" | "outlined" | "contained";
	size?: "small" | "medium" | "large";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	onClick?: ()=>void;
}

// Interface for Basic/Secondary/Text buttons which restricts the props used
interface SimpleButtonProps {
	children: React.ReactNode;
	color?: "inherit" | "primary" | "secondary" | "default";
	onClick?: ()=> void;
}

// Props that are always required for a button with an icon
interface IconProps {
	type: "delete" | "download" | "upload";
	fontSize?: "inherit" | "default" | "small" | "large";
}

// Props required for a button made of only an icon
interface LoneIconProps {
	size?: "small" | "medium";
	onClick?: ()=> void;
}

// Props required for a button made of an icon and some text label
interface IconLabelProps {
	children: React.ReactNode;
	iconPosition: "start" | "end"
	color?:"inherit" | "primary" | "secondary" | "default";
	onClick?: ()=> void;
}


// Here we've told TS that this component is a React Functional Component (React.FC) accepts the props
// from both GeneralButtonProps and ButtonProps (MUI's exposed props)
// The ':' can be placed after any variable declaration to define the type, but TS is pretty damn great
// at inferring types so you often don't need to unless TS hasn't been able to infer the type. 
export const GeneralButton: React.FC<GeneralButtonProps> = ({
	children,
	color,
	// You can highlight over these props and should now see types
	disabled,
	href,
	variant,
	size,
	startIcon,
	endIcon,
	onClick,
	// If you try adding a prop here that isn't in GeneralButtonProps or ButtonProps,
	// It'll give you an error

	//adding this in means any other props not specified here will be passed through to the Button component
	//...rest
}) => {
	return (
		<Button
			color={color ? color : "primary"}
			disabled={disabled ? disabled : false}
			href={href ? href : undefined}
			variant={variant ? variant : "contained"}
			size={size ? size : "medium"}
			startIcon={startIcon ? startIcon : undefined}
			endIcon={endIcon ? endIcon : undefined}
			onClick={onClick ? onClick : undefined}
			// Adding in this ...rest means any other props passed to GeneralButton will flow through to Button
			//{...rest}
		>
			{children}
		</Button>
	);
};

// Basic primary button with out all the customisability as the GeneralButton
export const BasicButton: React.FC<SimpleButtonProps> = ({ children, color, onClick }) => {
	return (
		<GeneralButton
			variant="contained"
			color={color ? color : "primary"}
			onClick={onClick ? onClick : undefined}
		>
			{children}
		</GeneralButton>
	);
};

// Basic outlined button. Outlined buttons are medium-emphasis buttons.
// They contain actions that are important, but aren’t the primary action in an app.
export const SecondaryButton: React.FC<SimpleButtonProps> = ({ children, color, onClick }) => {
	return (
		<GeneralButton
			variant="outlined"
			color={color ? color : "secondary"}
			onClick={onClick ? onClick : undefined}
		>
			{children}
		</GeneralButton>
	);
};

// Button that only contains text with no outlines
export const TextButton: React.FC<SimpleButtonProps> = ({ children, color, onClick }) => {
	return (
		<GeneralButton
			variant="text"
			color={color ? color : "primary"}
			onClick={onClick ? onClick : undefined}
		>
			{children}
		</GeneralButton>
	);
};

// A button that only contains an icon and no text
export const LoneIconButton: React.FC<IconProps & LoneIconProps> = ({ fontSize, size, type, onClick }) => {
	return (
		<IconButton
			aria-label="delete"
			size={size ? size : "medium"}
			onClick={onClick ? onClick : undefined}
		>
			<IconMaker fontSize={fontSize ? fontSize : "default"} type={type} />
		</IconButton>
	);
};

// A button that contains text and an icon on a specified side
export const IconLabelButton: React.FC<IconProps & IconLabelProps> = ({
	children,
	type,
	iconPosition,
	fontSize,
	color,
	onClick,
}) => {
	let icon = <IconMaker fontSize={fontSize} type={type} />;

	return (
		<GeneralButton
			variant="contained"
			color={color ? color : "primary"}
			startIcon={iconPosition == "start" ? icon : undefined}
			endIcon={iconPosition == "end" ? icon : undefined}
			onClick={onClick ? onClick : undefined}
		>
			{children}
		</GeneralButton>
	);
};

// Returns the material ui icon of a certain type
const IconMaker: React.FC<IconProps> = ({ type, fontSize }) => {
	let icon = null;
	if (type == "delete")
		icon = <DeleteIcon fontSize={fontSize ? fontSize : "default"} />;
	if (type == "download")
		icon = <ArrowDownwardIcon fontSize={fontSize ? fontSize : "default"} />;
	if (type == "upload")
		icon = <CloudUploadIcon fontSize={fontSize ? fontSize : "default"} />;

	return icon;
};
