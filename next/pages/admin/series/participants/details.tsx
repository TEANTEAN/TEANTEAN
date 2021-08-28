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
import { Help } from "@material-ui/icons";
import Form, { TextField } from "components/Form";
import Image from "next/image";
import {
  BasicButton,
  SecondaryButton,
  GeneralButton,
  TextButton,
  IconLabelButton,
  LoneIconButton,
} from "components/Buttons";

const testData3:ParticipantTableData[] = [
   {participantName: "Any Body", contact: "9111111", email:"9111111@gmail.com", datePaid: new Date("2021-02-11T10:00"), dateCertified: new Date("2021-02-11T10:00")},
   {participantName: "Any Body2", contact: "9111111", email:"9111111@gmail.com", datePaid: new Date("2021-02-11T10:00"), dateCertified: new Date("2021-02-11T10:00")},
   {participantName: "Any Body3", contact: "9111111", email:"9111111@gmail.com", datePaid: new Date("2021-02-11T10:00"), dateCertified: new Date("2021-02-11T10:00")},
]

function ParticipantDetailsPage(): JSX.Element {
    return (
        <Grid container xs={12}>


            <Grid container xs={12} md={10} style={{padding: "24px"}} >
                 <Grid item container xs={12} md={6} style={{padding: "24px"}}>

                   <Grid item xs={12} md={6} >
                     <Typography variant="h4" >
                        PPE and Me
                     </Typography>
                   </Grid>

                   <Grid item xs={12} md={6} >
                      <GeneralButton> Edit </GeneralButton>
                   </Grid>


                   <Typography variant="h5" >
                      RoundTable1
                   </Typography>

                   <Grid item xs={12}  >
                     <Typography variant="h5" >
                        2021-01-30 14:00
                     </Typography>
                   </Grid>
                 </Grid>

            </Grid>

              <Grid item xs={12} md={1} style={{padding: "24px"}}>
                               <GeneralButton> BACK </GeneralButton>
              </Grid>

            <Grid container xs={12} style={{padding: "24px"}} >
               <Grid item container xs={12} md={6} style={{padding: "24px"}}>

                   <Grid  item xs={6} md={5} >
                     <Typography variant="h4" >
                        Carly Earles
                     </Typography>
                   </Grid>

                   <Grid item xs={6} md={5} >
                      <GeneralButton> Edit </GeneralButton>
                   </Grid>

                   <Typography variant="h5" >
                      lucywong@gmial.com
                   </Typography>

                   <Grid item xs={12}  >
                     <Typography variant="h5" >
                        0416 777 8888
                     </Typography>
                   </Grid>
               </Grid>

                 <Grid item xs={12} md={6} style={{padding: "24px"}}>
                   <GeneralButton> update </GeneralButton>
                 </Grid>
            </Grid>


            <Grid container item xs={12} style={{padding: "24px"}} >

               <Grid container xs={12} md={5} style={{padding: "24px 24px 0 24px"}}>
                   <Grid  xs={12} md={11} >
                     <Typography variant="h6" >
                        Update Certificate Status
                     </Typography>
                     <Typography variant="h6" >
                        sent  <GeneralButton > SEND </GeneralButton>
                     </Typography>
                   </Grid>

                   <Grid item container xs={12} md={11} style={{padding: "24px"}} >

                     <Grid  xs={12} md={3} >
                       <Typography variant="h6" >
                          Certificate
                       </Typography>
                       <GeneralButton > UPLOAD </GeneralButton>
                     </Grid>

                      <Grid item xs={12} md={3} >
                          this is a picture
                      </Grid>

                     <Grid  xs={12} md={3} >
                        <GeneralButton > DELETE </GeneralButton>
                     </Grid>

                   </Grid>

               </Grid>

               <Grid container xs={12} md={5} style={{padding: "24px 24px 0 24px"}}>
                   <Grid  xs={12} md={11} >
                     <Typography variant="h6" >
                        Update Payments Status
                     </Typography>
                     <Typography variant="h6" >
                        on processing
                     </Typography>
                   </Grid>

                   <Grid item container xs={12} md={11} style={{padding: "24px"}} >

                     <Grid  xs={12} md={3} >
                       <Typography variant="h6" >
                          Receipt
                       </Typography>
                       <GeneralButton > UPLOAD </GeneralButton>
                     </Grid>

                      <Grid item xs={12} md={3} >
                          this is a picture
                      </Grid>

                     <Grid  xs={12} md={3} >
                        <GeneralButton > DELETE </GeneralButton>
                     </Grid>

                   </Grid>

               </Grid>


            </Grid>

          <Grid container item xs={12} >
            <GeneralButton > UPDATE </GeneralButton>
          </Grid>
          
        </Grid>
    );
}

export default ParticipantDetailsPage;