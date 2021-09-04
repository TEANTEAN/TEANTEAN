import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { DataType } from "components/ResponsiveTable";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: "32px",
  },
});

interface SingleCardProps {
  data: DataType;
}

const SingleCard = (props: SingleCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.data.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Calories
        </Typography>
        <Typography variant="body2" component="p">
          {props.data.calories}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Carbs
        </Typography>
        <Typography variant="body2" component="p">
          {props.data.carbs}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Fat
        </Typography>
        <Typography variant="body2" component="p">
          {props.data.fat}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Protein
        </Typography>
        <Typography variant="body2" component="p">
          {props.data.protein}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface CardViewProps {
  rows: DataType[];
}

export default function CardView(props: CardViewProps) {
  return (
    <>
      {props.rows.map((row) => (
        <SingleCard data={row} />
      ))}
    </>
  );
}
