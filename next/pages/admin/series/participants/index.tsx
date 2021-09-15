import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { NextPage } from "next";
import SeriesTable, { SeriesData } from "components/SeriesTable";
import ParticipantTable, { ParticipantTableData } from "components/ParticipantTable";
import {
  BasicButton,
  SecondaryButton,
  GeneralButton,
  TextButton,
  IconLabelButton,
  LoneIconButton,
} from "components/Buttons";

const buttonToParticipantsDetails = <GeneralButton href="/admin/series/participants/details">Detail</GeneralButton>;

const testData3:ParticipantTableData[] = [
   {
    participantName: "Any Body",
    contact: "9111111",
    email:"9111111@gmail.com",
    datePaid: new Date("2021-02-11T10:00"),
    dateCertified: new Date("2021-02-11T10:00"),
    children1: buttonToParticipantsDetails,
   },

   {
    participantName: "Any Body2",
    contact: "9111111",
    email:"9111111@gmail.com",
    datePaid: new Date("2021-02-11T10:00"),
    dateCertified: new Date("2021-02-11T10:00"),
    children1: buttonToParticipantsDetails,
   },
   {
   participantName: "Any Body3",
   contact: "9111111",
   email:"9111111@gmail.com",
   datePaid: new Date("2021-02-11T10:00"),
   dateCertified: new Date("2021-02-11T10:00"),
   children1: buttonToParticipantsDetails,
   },
]

function ParticipantPage(): JSX.Element {
    return (
        <Grid container xs={12}>

            <Grid container xs={12} >
                 <Grid item xs={6} style={{padding: "24px"}}>
                   <Typography variant="h4" >
                     PPE and Me
                   </Typography>
                   <Typography variant="h5" >
                      RoundTable1
                   </Typography>
                   <Typography variant="h5" >
                      2021-01-30 14:00
                   </Typography>

                 </Grid>

                 <Grid item xs={6} style={{padding: "24px"}}>
                   <GeneralButton href="/admin/series/"> BACK </GeneralButton>
                 </Grid>
            </Grid>

            <Grid container item md={10} xs={12} >
               <Grid item xs={12} style={{padding: "24 24px 0 24px"}}>
                  <ParticipantTable data={testData3} />
               </Grid>
            </Grid>

        </Grid>
    );
}

export default ParticipantPage;