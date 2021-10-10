/* eslint-disable */
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LoadingScreen from "components/LoadingScreen";
import {
  Box,
  Link,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import gnAxiosClient from "util/gnAxiosClient";
import { getFullDate } from "util/formatDate";
import { getDriveFolderUrl } from "util/createDriveUrl";

const useStyles = makeStyles({
  heading: {
    lineHeight: 3,
  },
});

interface FormValues {
  certificateSent: boolean;
  paid: boolean;
  receiptSent: boolean;
}

const ParticipantPage = () => {
  const [formTouched, setFormTouched] = React.useState(false);
  const [paid, setPaid] = React.useState(false);
  const [certificateSent, setCertificateSent] = React.useState(false);
  const [receiptSent, setReceiptSent] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const router = useRouter();
  const classes = useStyles();

  const { series_id, roundtable_id, participant_id } = router.query;

  const participantLabel =
    router.query["participant_id--label"] ?? "Participant";
  const seriesLabel = router.query["series_id--label"];
  const roundtableLabel = router.query["roundtable_id--label"];

  const participantDetails = useQuery<Participant>(
    `participant-${participant_id}`,
    async () =>
      (await gnAxiosClient.get(`/participants/${participant_id}`)).data
  );

  const roundtableDetails = useQuery<Roundtable>(
    `roundtable-${roundtable_id}`,
    async () => (await gnAxiosClient.get(`/roundtables/${roundtable_id}`)).data
  );

  React.useEffect(() => {
    if (participantDetails.isSuccess) {
      setCertificateSent(participantDetails.data.certificateSent);
      setPaid(participantDetails.data.paid);
      setReceiptSent(participantDetails.data.receiptSent);
    }
  }, [participantDetails.isSuccess, participantDetails.isFetched]);

  const handleChange = async (data: { [changedField: string]: boolean }) => {
    try {
      setPending(true);
      const request = {
        paid,
        certificateSent,
        receiptSent,
        ...data,
      };
      console.log("sending request: ", request);
      await gnAxiosClient.put(`/participants/${participant_id}`, request);
      participantDetails.refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
    }
  };

  if (!(participantDetails.isSuccess && roundtableDetails.isSuccess)) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Typography variant="h4" className={classes.heading}>
        {participantDetails.data?.name}'s Details
      </Typography>
      <Box maxWidth="600px">
        <Card>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Series</TableCell>
                  <TableCell>{seriesLabel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Booking Start</TableCell>
                  <TableCell>
                    {getFullDate(roundtableDetails.data?.start_time)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Booking End</TableCell>
                  <TableCell>
                    {getFullDate(roundtableDetails.data?.end_time)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{participantDetails?.data?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact</TableCell>
                  <TableCell>{participantDetails?.data?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>{participantDetails?.data?.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
      <Box>
        <Typography variant="h5" className={classes.heading}>
          Tracking {pending && <CircularProgress size={16} />}
        </Typography>
        <Card>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Link to Drive folder</TableCell>
                  <TableCell>
                    <a
                      href={getDriveFolderUrl(
                        participantDetails.data.participantFolderId
                      )}
                      target="_blank"
                    >
                      {getDriveFolderUrl(
                        participantDetails.data.participantFolderId
                      )}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Certificate sent?</TableCell>
                  <TableCell>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="certificateSent"
                        value={certificateSent ? "yes" : "no"}
                        onChange={(_, value) => {
                          setCertificateSent(value === "yes");
                          handleChange({ certificateSent: value === "yes" });
                        }}
                      >
                        <FormControlLabel
                          disabled={pending}
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          disabled={pending}
                          value="no"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paid?</TableCell>
                  <TableCell>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="paid"
                        value={paid ? "yes" : "no"}
                        onChange={(_, value) => {
                          setPaid(value === "yes");
                          handleChange({ paid: value === "yes" });
                        }}
                      >
                        <FormControlLabel
                          disabled={pending}
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          disabled={pending}
                          value="no"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Receipt sent?</TableCell>
                  <TableCell>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="receiptSent"
                        value={receiptSent ? "yes" : "no"}
                        onChange={(_, value) => {
                          setReceiptSent(value === "yes");
                          handleChange({ receiptSent: value === "yes" });
                        }}
                      >
                        <FormControlLabel
                          disabled={pending}
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          disabled={pending}
                          value="no"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
      <Box>
        <Typography variant="h5" className={classes.heading}>
          Questionnaire Responses
        </Typography>
        <Card>
          <TableContainer>
            <Table>
              <TableBody>
                {participantDetails.data?.questions_and_answers?.map((qa) => {
                  return (
                    <TableRow>
                      <TableCell>{qa.question}</TableCell>
                      <TableCell>{qa.answer}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
};

export default ParticipantPage;
