import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      "&$selected": {
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiListItemIcon-root": {
          color: "white",
        },
        "& .MuiTypography-root": {
          color: "white",
        },
      },
    },
    selected: {},
    listItemIcon: {
      minWidth: "40px",
    },
    list: {},
  })
);

interface SideNavItemProps {
  text: string;
  icon: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

const SideNavItem: React.FC<SideNavItemProps> = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const checkSelected = () => {
    if (props.link) {
      return router.asPath.includes(props.link);
    }
    return false;
  };

  return (
    <>
      {!!props.link && (
        <Link href={props.link} passHref>
          <ListItem
            key={props.link}
            button
            classes={{ root: classes.listItem, selected: classes.selected }}
            selected={checkSelected()}
          >
            <ListItemIcon className={classes.listItemIcon}>
              {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text} />
          </ListItem>
        </Link>
      )}
      {!!props.onClick && (
        <ListItem button key={props.text} onClick={props.onClick}>
          <ListItemIcon className={classes.listItemIcon}>
            {props.icon}
          </ListItemIcon>
          <ListItemText primary={props.text} />
        </ListItem>
      )}
    </>
  );
};

export default SideNavItem;
