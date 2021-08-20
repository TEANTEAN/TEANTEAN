import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { NextPage } from "next";
import Form, {
  TextField,
  AutocompleteField,
  DatePickerField,
} from "components/Form";


interface FormValues {
  title: String;
  description: string;
  org: Org;
  photo: File;
  vedio: File;
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

const orgs: Org[] = [
  { id: 1,
    org: "The University of Melbourne",
  },
  { id: 2,
    org: "Young Stroke Foundation",
  },
  { id: 3,
    org: "Monash University",
  },
];

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

const CreateSeries: NextPage = () => {
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
                  Series Management
                </Typography>

      <Form<FormValues> onSubmit={onSubmit}>

             <Typography gutterBottom variant="subtitle2">
                  Series Information
                </Typography>

          <TextField       
          name="title"
          label="Series Name"
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
        />

        <TextField       
          name="title"
          label="Series Description"
          
        //  multiline
       //   rows={4}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
        />


        <AutocompleteField<Org>
          name="org"
          label="Organisation"
          options={orgs}
          getOptionLabel={(org) => org.org}
          getOptionValue={(org) => org.id}
        />

<Typography gutterBottom variant="subtitle2">
                  Preview Vedio & Photo Upload
                </Typography>

                <div className={classes.root}>
      <input
        accept="image/*"
        //className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <input accept="image/*" 
      //className={classes.input} 
      id="icon-button-file" 
      type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>

    <Typography gutterBottom variant="subtitle2">
                  Roundtable Management (Calendly)
                </Typography>

       <DatePickerField 
          name="date" 
          label="Date Roundtable" 
          defaultValue={new Date()} />

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

export default CreateSeries;