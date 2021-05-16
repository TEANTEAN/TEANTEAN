import React from "react";
import {NextPage} from "next";
import Head from "next/head";
import {GeneralButton} from "components/Buttons";
import Grid from "@material-ui/core/Grid";

const Home: NextPage = () => (
    <div>
        <Head>
            <title>Create Next App</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Grid container>
            {/* row 1 */}
            <Grid item xs={6}>
                <img src='/gn-logo.png' width='200px' />
            </Grid>
            <Grid item xs={6} style={{textAlign: "right"}}>
                <GeneralButton> Login </GeneralButton>
                <GeneralButton href="/"> Go Back </GeneralButton>
            </Grid>
            {/* row 2 */}
            <Grid item xs={6}>
                <iframe
                    width='560'
                    height='315'
                    src='https://www.youtube.com/embed/ZCs3NeBXg2E'
                    title='YouTube video player'
                    frameBorder='0'
                ></iframe>
            </Grid>
            <Grid item xs={6} style={{padding: "0 40px 0 40px"}}>
                <h2>An online peer-led focus group for unrivalled research </h2>
                <h3>
                    Roundtable is an opportunity for people with shared
                    commonalities to connect and discuss topics directly
                    involving their broader peer groups
                </h3>
                <GeneralButton> Enquire </GeneralButton>
            </Grid>
            {/* row 3 */}
            <Grid
                item
                xs={6}
                style={{padding: "0 40px 0 40px", textAlign: "right"}}
            >
                <h2> Trailed and tested </h2>
                <h3> Loved by researchers </h3>
            </Grid>
            <Grid item xs={6}>
                <h2 style={{textAlign: "center"}}> Endorsement Title </h2>
                <ul>
                    <li>
                        genyus Roundtable is an opportunity for people with
                        shared commonalities to connect and discuss research
                        which directly involves their broader peer groups.
                    </li>
                    <li>
                        These bespoke focus groups can discuss questions which
                        are co-designed by (but not guided by) reputable
                        research groups, to enhance the lived experience of the
                        focus group and their peers.
                    </li>
                    <li>
                        genyus Roundtable is hosted by a Peer with Lived
                        Expertise.
                    </li>
                    <li>
                        Peer Groups (people with shared commonalities) benefit
                        from participating by building confidence and
                        interpersonal connections plus enhancing self-advocacy
                        skills.
                    </li>
                    <li>
                        Research and Health Organisations who are looking to
                        better support their constituents1 also benefit from the
                        process of conducting a Roundtable by collecting non
                        biased research.
                    </li>
                </ul>
                <div style={{textAlign: "center"}}>
                    <p>
                        "We could never get this sort of research if we did it
                        on our own."
                    </p>
                    <p>
                        - Professor Natasha Lannin (PhD, BSc, GCIS, FAOTA,
                        FOTARA
                    </p>
                    <p> ⭐️⭐️⭐️⭐️⭐️ </p>
                </div>
            </Grid>
            {/* row 4 */}
            <h2> Research partners </h2>
            <Grid item xs={12} className='flex-container wrap'>
                <img src='/youn-stroke-project-logo.png' width='200px' />
                <img src='/laTrob-logo.png' width='200px' />
                <img src='/monash-logo.png' width='200px' />
            </Grid>
        </Grid>
    </div>
);

export default Home;
