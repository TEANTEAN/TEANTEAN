import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NextPage } from "next";
import Form, { TextField, } from "components/Form";


interface FormValues {
  username: String;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const Login: NextPage = () => {
  const classes = useStyles();
  const [submittedValues, setSubmittedValues] = React.useState<FormValues>(
    null
  );

  const onSubmit = (data: FormValues) => {
    setSubmittedValues(data);
  };

  return (
    <> 
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Typography gutterBottom variant="subtitle1">
                  Research Partner/ Peer Leader Sign In 
                </Typography>

      <Form<FormValues> onSubmit={onSubmit}>
               
          <TextField       
          name="username"
          label="Username"
          rules={{
            minLength: {
              value: 5,
              message: "Username must be 5 chars long",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          }}
        />

<TextField
          name="password"
          label="Password"
          rules={{
            minLength: {
              value: 5,
              message: "Password must be 5 chars long",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          }}
        />

      </Form>
      </Paper>
    </div>

    {submittedValues && (
        <Typography variant="body1">
          Submitted: {JSON.stringify(submittedValues)}
        </Typography>
      )}   
    </>
  );
};

export default Login;
