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

             <Grid item container>
                  <Grid item xs={8} style={{ paddingBottom: "50px" }}>
                             <Typography variant="h3" gutterBottom>
                                  Participants Details
                             </Typography>
                  </Grid>
                  <Grid item xs={2}>
                      <GeneralButton variant="contained" href="/admin/series/participants/">
                          Back
                      </GeneralButton>
                  </Grid>
             </Grid>


         <Paper>

            <Grid item container xs={12} md={10} style={{padding: "12px"}} >
                   <Grid item container xs={12} md={6} style={{padding: "24px"}}>

                       <Grid item xs={12} md={6} >
                            <Typography variant="h4" >
                                PPE and Me
                            </Typography>
                       </Grid>

                       <Grid item xs={12} md={6} >
                             <GeneralButton href="/admin/series/"> Edit </GeneralButton>
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


            <Grid item container xs={12} style={{padding: "12px"}} >
                  <Grid item container xs={12} md={6} style={{padding: "24px"}}>

                        <Grid  item xs={6} md={5} >
                             <Typography variant="h4" >
                                   Carly Earles
                             </Typography>
                        </Grid>

                        <Grid item xs={6} md={5} >
                             <GeneralButton href="/admin/accounts/"> Edit </GeneralButton>
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

                  <Grid item container xs={12} md={6}  >
                        <Grid item xs={12} md={2}>
                         <Image src="/Cal-2-WP-crazy-massive-banner.png" width="144px" height= "144px"/>
                        </Grid>
                        <Grid item xs={12} md={1}  style={{padding: "96px 0px 0px 6px"}}>
                          <GeneralButton > Update </GeneralButton>
                        </Grid>
                  </Grid>
            </Grid>

            <Grid item container xs={12} style={{padding: "12px"}} >

                  <Grid item container xs={12} md={5} style={{padding: "24px 24px 0 24px"}}>
                         <Grid item container xs={12} md={11} >

                                 <Grid item xs={12} md={12}>
                                         <Typography variant="h5" >
                                             Update Certificate Status
                                         </Typography>
                                 </Grid>

                                 <Grid item xs={12} md={4}>
                                      <Typography variant="h6" >
                                          sent
                                      </Typography>
                                 </Grid>
                                 <Grid item xs={12} md={8} >
                                      <GeneralButton > SEND </GeneralButton>
                                 </Grid>
                         </Grid>

                         <Grid item container xs={12} md={11}  style={{padding: "24px 0px 0px 0px"}}  >

                                <Grid item container xs={12} md={4} >
                                          <Grid item xs={12} md={12}>
                                                <Typography variant="h6" >
                                                    Certificate
                                                </Typography>
                                          </Grid>

                                          <Grid item xs={12} md={12} style={{padding: "6px 0px 0px 0px"}}>
                                                    <input
                                                      accept="image/*"
                                                      // className={classes.input}
                                                      id="icon-button-file"
                                                      type="file"
                                                    />
                                          </Grid>

                                          <Grid item xs={12} md={12} style={{padding: "12px 0px 0px 0px"}}>
                                                 <label htmlFor="contained-button-file" >
                                                     <GeneralButton >
                                                          Upload
                                                     </GeneralButton>
                                                 </label>
                                          </Grid>
                                </Grid>

                                <Grid item container xs={12} md={3}  >
                                        <Grid item xs={12} md={11}>
                                                  <Image src="/Cal-2-WP-crazy-massive-banner.png" width="96px" height= "96px"/>
                                        </Grid>
                                        <Grid item xs={12} md={1}  style={{padding: "48px 0px 0px 0px"}}>
                                               <GeneralButton > DELETE </GeneralButton>
                                        </Grid>
                                </Grid>
                         </Grid>
                  </Grid>

                  <Grid item container xs={12} md={5} style={{padding: "24px 24px 0 24px"}}>
                         <Grid item container xs={12} md={11} >

                                 <Grid item xs={12} md={12}>
                                         <Typography variant="h5" >
                                             Update Payment Status
                                         </Typography>
                                 </Grid>

                                 <Grid item xs={12} md={4}>
                                      <Typography variant="h6" >
                                          on Processing
                                      </Typography>
                                 </Grid>
                                 <Grid item xs={12} md={8} >
                                      <GeneralButton > SEND </GeneralButton>
                                 </Grid>
                         </Grid>

                         <Grid item container xs={12} md={11}  style={{padding: "24px 0px 0px 0px"}}  >

                                <Grid item container xs={12} md={4} >
                                          <Grid item xs={12} md={12}>
                                                <Typography variant="h6" >
                                                    Receipt
                                                </Typography>
                                          </Grid>

                                          <Grid item xs={12} md={12} style={{padding: "6px 0px 0px 0px"}}>
                                                    <input
                                                      accept="image/*"
                                                      // className={classes.input}
                                                      id="icon-button-file"
                                                      type="file"
                                                    />
                                          </Grid>

                                          <Grid item xs={12} md={12} style={{padding: "12px 0px 0px 0px"}}>
                                                 <label htmlFor="contained-button-file" >
                                                     <GeneralButton >
                                                          Upload
                                                     </GeneralButton>
                                                 </label>
                                          </Grid>
                                </Grid>

                                <Grid item container xs={12} md={3}  >
                                        <Grid item xs={12} md={11}>
                                                  <Image src="/Cal-2-WP-crazy-massive-banner.png" width="96px" height= "96px"/>
                                        </Grid>
                                        <Grid item xs={12} md={1}  style={{padding: "48px 0px 0px 0px"}}>
                                               <GeneralButton > DELETE </GeneralButton>
                                        </Grid>
                                </Grid>
                         </Grid>

                  </Grid>

            </Grid>



         </Paper>

             <Grid container item xs={12} style={{padding: "72px 0px 0px 24px"}}>
                 <GeneralButton > UPDATE </GeneralButton>
             </Grid>

        </Grid>
    );
}

export default ParticipantDetailsPage;