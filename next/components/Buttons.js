import React from "react";
import { Button } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

/** A general button that can do most things.
 * @param {string} color Choice of Primary or Secondary based on the theme.
 * @param {boolean} disabled To dissallow clicking of the button.
 * @param {string} href a link to a url
 * @param {string} variant (contained | outlined | text) type of button
 * @param {string} size (smaall | medium | large) size of the button
 */
export const GeneralButton = ({
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

// Basic primary button with out all the customisability as the GeneralButton
export const BasicButton = ({ children, color, onClick }) => {
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
export const SecondaryButton = ({ children, color, onClick }) => {
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
export const TextButton = ({ children, color, onClick }) => {
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
export const LoneIconButton = ({ fontSize, size, type, onClick }) => {
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
export const IconLabelButton = ({
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
const IconMaker = ({ type, fontSize }) => {
	let icon = null;
	if (type == "delete")
		icon = <DeleteIcon fontSize={fontSize ? fontSize : "default"} />;
	if (type == "download")
		icon = <ArrowDownwardIcon fontSize={fontSize ? fontSize : "default"} />;
	if (type == "upload")
		icon = <CloudUploadIcon fontSize={fontSize ? fontSize : "default"} />;

	return icon;
};
