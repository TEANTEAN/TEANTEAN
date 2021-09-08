/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import LoadingButton from "components/LoadingButton";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { NextPage } from "next";
import Form, {
  TextField,
  PasswordField,
} from "components/Form";
import withAuth from "../../util/hooks/withAuth";
import gnFetch from "../../util/gnAxiosClient";

interface FormValues {
    username: String;
    password: string;
    email: string;
    firstname: String;
    lastName: String;
    phone: String;
    level: Level;
    org: Org;
    date: Date;
}
  
interface Level {
    id: number;
    level: string;
}
  
interface Org {
    id: number;
    org: string;
}

const levels: Level[] = [
    { id: 1, level: "Peer Leader" },
    { id: 2, level: "genyus Admin" },
    { id: 3, level: "Research Partner" },
  ];
  
  const orgs: Org[] = [
    { id: 1, org: "The University of Melbourne" },
    { id: 2, org: "Young Stroke Foundation" },
    { id: 3, org: "Monash University" },
  ];
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  }));

const updatePassword = async (newUserData: FormValues) => {
    const data = {
      username: newUserData.username,
      password: newUserData.password,
    };
    try {
      //Find if the username is existed in strapi 
      //and get its ID then update the password

      // Get user ID based on username admin entered
      const allUsers = await gnFetch.get(`/users-permissions/search/${newUserData.username}`);
      if(allUsers){
            const result = allUsers.data.filter(item => item.username === data.username).map(e => e.id);
            if(result.length){
                //ID found, update password.
                // New password value to assign to the body
                const newBody = { password: data.password };
                // Update the user password 
                const putRes = await gnFetch.put(`/users/${result}`, newBody);
                if(putRes.status == 200){
                    //update success
                    return "success";
                }else{
                    //update fail
                    return "error"
                }
            }else{
                return "notFound";
            }
      }
    } catch (e) {
      console.log(e);
      return "error";
    }
  };

const resetPassword: NextPage = () => {
    const classes = useStyles();
    const [pending, setPending] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const { session, haveAuthenticated } = withAuth({
      redirectTo: "/dashboard",
      permittedRole: "genyus admin",
    });
    const [submittedValues, setSubmittedValues] =
      React.useState<FormValues>(null);
    const methods = useForm<FormValues>();
    const onSubmit = async (data: FormValues) => {
      setPending(true);
      setSubmittedValues(data);
      try {
        const result = await updatePassword(data);
        if(result === "success"){
            setSuccess(true);
        }else if(result === "notFound"){
            setNotFound(true);
        }else if(result === "error"){
            setError(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setPending(false);
      }
    };

    //Close the pop up snackbar
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if(reason === 'clickaway'){
            return;
        }
        setSuccess(false);
        setError(false);
        setNotFound(false);
    };
  
    if (session && haveAuthenticated()) {
      return (
        <>
          <Box className={classes.root}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="subtitle1">
                Reset user's Password
              </Typography>
              <Form<FormValues> methods={methods} onSubmit={onSubmit}>
                <TextField
                  control={methods.control}
                  name="username"
                  label="Username - (the username that you want to reset password for)"
                  rules={{
                    minLength: {
                      value: 1,
                      message: "Username must be 5 chars long",
                    },
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
  
                <PasswordField
                  control={methods.control}
                  name="password"
                  label="New Password"
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

                <LoadingButton
                  isloading={pending}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </LoadingButton>
              </Form>
            </Paper>

          </Box>
  
          {submittedValues && (
            <Typography variant="body1">
              Submitted: {JSON.stringify(submittedValues)}
            </Typography>
          )}

          
          <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" onClose={handleClose}>
                Password update success!
            </Alert>
          </Snackbar>

          <Snackbar open={notFound} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="warning" onClose={handleClose}>
                This username does not exist! Please check and try again...
            </Alert>
          </Snackbar>

          <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose}>
                There is an error, Try again later... if there is still error please contact develop team..
            </Alert>
          </Snackbar>

        </>
        
      );
    }
    return (
      <Typography variant="h1" component="h1">
        Loading...
      </Typography>
    );
  };

export default resetPassword;