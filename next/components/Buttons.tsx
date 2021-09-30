/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from '@material-ui/icons/Close';

// Current mui button props that we are accepting to build all of our buttons from.
interface GeneralButtonProps {
  color?: "inherit" | "primary" | "secondary" | "default";
  disabled?: boolean;
  href?: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

// The multipurpose button, allows you do everything that the mui button can
// Some props have been removed.
export const GeneralButton: React.FC<GeneralButtonProps> = ({
  children,
  color,
  disabled,
  href,
  variant,
  size,
  startIcon,
  endIcon,
  onClick,
}) => (
  <Button
    color={color || "primary"}
    disabled={disabled || false}
    href={href || undefined}
    variant={variant || "contained"}
    size={size || "medium"}
    startIcon={startIcon || undefined}
    endIcon={endIcon || undefined}
    onClick={onClick || undefined}
  >
    {children}
  </Button>
);

// Interface for Basic/Secondary/Text buttons which restricts the props used
interface SimpleButtonProps {
  color?: "inherit" | "primary" | "secondary" | "default";
  onClick?: () => void;
}

// Basic primary button with out all the customisability as the GeneralButton
export const BasicButton: React.FC<SimpleButtonProps> = ({
  children,
  color,
  onClick,
}) => (
  <GeneralButton
    variant="contained"
    color={color || "primary"}
    onClick={onClick || undefined}
  >
    {children}
  </GeneralButton>
);

// Basic outlined button. Outlined buttons are medium-emphasis buttons.
// They contain actions that are important, but aren’t the primary action in an app.
export const SecondaryButton: React.FC<SimpleButtonProps> = ({
  children,
  color,
  onClick,
}) => (
  <GeneralButton
    variant="outlined"
    color={color || "secondary"}
    onClick={onClick || undefined}
  >
    {children}
  </GeneralButton>
);

// Button that only contains text with no outlines
export const TextButton: React.FC<SimpleButtonProps> = ({
  children,
  color,
  onClick,
}) => (
  <GeneralButton
    variant="text"
    color={color || "primary"}
    onClick={onClick || undefined}
  >
    {children}
  </GeneralButton>
);

// Props required for a button made of only an icon
interface LoneIconProps {
  size?: "small" | "medium";
  onClick?: () => void;
  className?: string;
}

// Props that are always required for a button with an icon
interface IconProps {
  type: "delete" | "download" | "upload" | "add" | "close";
  fontSize?: "inherit" | "default" | "small" | "large";
}

// Returns the material ui icon of a certain type
const IconMaker: React.FC<IconProps> = ({ type, fontSize }) => {
  let icon = null;
  if (type === "delete") icon = <DeleteIcon fontSize={fontSize || "default"} />;
  if (type === "download")
    icon = <ArrowDownwardIcon fontSize={fontSize || "default"} />;
  if (type === "upload")
    icon = <CloudUploadIcon fontSize={fontSize || "default"} />;
  if (type === "add") icon = <AddIcon fontSize={fontSize || "default"} />;
  if (type === "close") icon = <CloseIcon fontSize={fontSize || "default"} />;
  return icon;
};

// A button that only contains an icon and no text
export const LoneIconButton: React.FC<IconProps & LoneIconProps> = ({
  fontSize,
  size,
  type,
  className,
  onClick,
}) => (
  <IconButton
    aria-label="delete"
    size={size || "medium"}
    onClick={onClick || undefined}
    className={className}
  >
    <IconMaker fontSize={fontSize || "default"} type={type} />
  </IconButton>
);

// Props required for a button made of an icon and some text label
interface IconLabelProps {
  iconPosition: "start" | "end";
  color?: "inherit" | "primary" | "secondary" | "default";
  onClick?: () => void;
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
  const icon = <IconMaker fontSize={fontSize} type={type} />;

  return (
    <GeneralButton
      variant="contained"
      color={color || "primary"}
      startIcon={iconPosition === "start" ? icon : undefined}
      endIcon={iconPosition === "end" ? icon : undefined}
      onClick={onClick || undefined}
    >
      {children}
    </GeneralButton>
  );
};
