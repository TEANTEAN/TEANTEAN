import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import LoadingButton from "components/LoadingButton";
import easySnackbar from "components/EasySnackbar";

import Form, { TextField } from "components/Form";

import { LoneIconButton } from "components/Buttons";
import { Grid } from "@material-ui/core";

import gnFetch from "../../util/gnAxiosClient";

interface FormValues {
  name: String;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex-container",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    margin: "auto",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "flex",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const updateOrg = async (updatedOrgData: FormValues, orgId: String) => {
  const data = {
    name: updatedOrgData.name,
  };
  // eslint-disable-next-line no-useless-catch
  try {
    await gnFetch.put(`/organisations/${orgId}`, data);
  } catch (e) {
    throw e;
  }
};

const postNewOrg = async (newOrgData: FormValues) => {
  const data = {
    name: newOrgData.name,
  };
  // eslint-disable-next-line no-useless-catch
  try {
    await gnFetch.post("/organisations", data);
  } catch (e) {
    throw e;
  }
};

interface OrganisationFormProps {
  isCreateOrg: boolean;
  orgUnderEdit: Organisation;
  handleClose: () => void;
  onSubmitSettled: () => void;
}

const OrganisationForm: React.FC<OrganisationFormProps> = ({
  isCreateOrg,
  orgUnderEdit,
  handleClose,
  onSubmitSettled,
}) => {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  const [submitSuccessful, setSubmitSuccessful] = React.useState(false);
  const methods = useForm<FormValues>();
  const onClose = () => handleClose();
  const { easyEnqueueSnackbar } = easySnackbar();
  const onSubmit = async (data: FormValues) => {
    setPending(true);
    try {
      let message = "";
      if (!isCreateOrg) {
        await updateOrg(data, orgUnderEdit.id);
        message = "Organisation updated";
      } else {
        await postNewOrg(data);
        message = "Organisation created";
      }
      setSubmitSuccessful(true);
      easyEnqueueSnackbar(message, {
        severity: "success",
        duration: 6000,
        position: "TOP-RIGHT",
      });
    } catch (e) {
      let { message } = e;
      if (e?.response?.status === 400) {
        message =
          e.response.data?.data[0]?.messages[0]?.message ||
          "Something has gone wrong!";
      }
      easyEnqueueSnackbar(message, {
        severity: "error",
        duration: 6000,
        position: "TOP-RIGHT",
      });
    } finally {
      setPending(false);
    }
  };

  // Moved 'onSubmitSettled' out of the finally block, it was
  // executing before the states could update in try catch block
  if (submitSuccessful) onSubmitSettled();

  return (
    <>
      <Box className={classes.root}>
        <Typography gutterBottom variant="subtitle1">
          {isCreateOrg ? "Organisation Creation" : "Organisation Management"}
        </Typography>
        <LoneIconButton
          type="close"
          className={classes.closeButton}
          onClick={onClose}
        />
        {isCreateOrg && (
          <Typography variant="body1">
            Don&apos;t forget after creating an organisation click the
            &quot;upload image&quot; button on the table on the organisation
            page
          </Typography>
        )}
        <Form<FormValues> methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                control={methods.control}
                name="name"
                label="Organisation Name"
                defaultValue={orgUnderEdit?.name ?? ""}
                rules={{
                  minLength: {
                    value: 1,
                    message: "Organisation needs a name",
                  },
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                isloading={pending}
                type="submit"
                variant="contained"
                color="primary"
              >
                {isCreateOrg ? "Create Organisation" : "Update Organisation"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </>
  );
};

export default OrganisationForm;
