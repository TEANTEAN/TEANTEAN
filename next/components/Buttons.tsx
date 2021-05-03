import React from "react";
import Button from "@material-ui/core/Button";
//import { Props } from "@material-ui/core"

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// Current mui button props that we are accepting to build all of our buttons from.
interface GeneralButtonProps {
	color?: "inherit" | "primary" | "secondary" | "default";
	disabled?: boolean;
	href?: string;
	variant?: "text" | "outlined" | "contained";
	size?: "small" | "medium" | "large";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	onClick?: ()=>void;
}

// The 
export const GeneralButton: React.FC<Props & GeneralButtonProps> = ({
	children,
	color,
	disabled,
	href,
	variant,
	size,
	startIcon,
	endIcon,
	onClick,
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
		>
			{children}
		</Button>
	);
};

// Interface for Basic/Secondary/Text buttons which restricts the props used
interface SimpleButtonProps {
	color?: "inherit" | "primary" | "secondary" | "default";
	onClick?: ()=> void;
}

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

// Props required for a button made of only an icon
interface LoneIconProps {
	size?: "small" | "medium";
	onClick?: ()=> void;
}

// Props that are always required for a button with an icon
interface IconProps {
	type: "delete" | "download" | "upload";
	fontSize?: "inherit" | "default" | "small" | "large";
}

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

// Props required for a button made of an icon and some text label
interface IconLabelProps {
	iconPosition: "start" | "end"
	color?:"inherit" | "primary" | "secondary" | "default";
	onClick?: ()=> void;
}

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
