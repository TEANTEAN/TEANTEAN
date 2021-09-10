import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export type subTitleData = {
    subTitleContent: string,
}

export type subTitleProps = {
    data: subTitleData,
}
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function Subtitle({data}: subTitleProps): JSX.Element {
  const classes = useStyles();
  const {subTitleContent} = data;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>

        <Typography variant="h5" component="h2">
          {subTitleContent}
        </Typography>

      </CardContent>
    </Card>
  );
}