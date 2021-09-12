# SWEN90013 Masters Advanced Software Project  

*Year:* 2021  
*Team name*: Team GN  

| Sprint | Tag URL |
| - | - |
| Inception sprint tag | <https://github.com/SWEN90013-2021-GN/GN/releases/tag/Inception> |
| Sprint 1a tag | <https://github.com/SWEN90013-2021-GN/GN/releases/tag/1a> |
| Sprint 1b tag | <https://github.com/SWEN90013-2021-GN/GN/releases/tag/1b> |
| Sprint 2a tag* | <https://github.com/SWEN90013-2021-GN/GN/releases/tag/2a> |
| Sprint 2b tag | <https://github.com/SWEN90013-2021-GN/GN/releases/tag/2b> |
| Sprint 3a tag | TBA |
| Sprint 3b tag | TBA |

## Project Summary

### genyus Roundtable

An online peer-led focus group for unrivalled research — genyus Roundtable is an opportunity for people with shared commonalities to connect and discuss research which directly involves their broader peer groups. These bespoke focus groups can discuss questions which are co-designed by (but not guided by) reputable research groups, to enhance the lived experience of the focus group and their peers. The Roundtable is hosted by a Peer with Lived Expertise.
Peer Groups (people with shared commonalities) benefit from participating by building confidence and interpersonal connections plus enhancing self-advocacy skills, while Research and Health Organisations who are looking to better support their constituents also benefit from the process of conducting a Roundtable by collecting non-biased research.

The project solution will encompass all current processes involved in the genyus Roundtable:

- Creation of a branded landing page for each focus group, in partnership with Research and Health Organisation Partners;
- The branded landing page will feature: information on the focus group, dates and times for each Roundtable, the ability for participants to self-allocate into a Roundtable or email support with a request to add additional Roundtables;
- The ability for genyus admin to approve or decline participants who register for a Roundtable;
- Sending confirmation emails to participants approved for a session time with a calendar event invite and video conference link;
- Sending gratitude emails to participants who have participated in a Roundtable, as well as Certificate of attendance and payment; and  
- Creation of a Research and Health Organisation Partners landing page that will display Roundtable video recordings, as well as other documents.  

### About the Team

| Name | Email | Student ID |
| - | - | - |
| Luke Rosa | lrosa@student.unimelb.edu.au | 319522 |
| Yang Zhou | yangz7@student.unimelb.edu.au | 693507 |
| Joel Launder | jlaunder@student.unimelb.edu.au | 910495 |
| "Chuan" Chuanyuan Liu | liuchuanyuan@gmail.com | 884140 |
| "Eric" Pei-Chen Chen | peichenc@student.unimelb.edu.au | 860261 |
| "William" Zhentao He | zhentaoh2@student.unimelb.edu.au | 951916 |
| "Max" Jiacheng Ye | jiachengy1@student.unimelb.edu.au | 904973 |
| Nicolas Montorio | nmontorio@student.unimelb.edu.au | 911211 |
| "Jason" Mingyu Su | msu2@student.unimelb.edu.au | 912474 |
| Sam Webster | swebster1@student.unimelb.edu.au | 639399 |
| "Tean" Surasak Janeiad | sjaneiad@student.unimelb.edu.au | 1146826 |
| Callum Dowling | dowlingcj@student.unimelb.edu.au | 1009257 |  

## Troubleshooting

If at any point a weird error is preventing you from running any node application after pulling or merging a new branch, you may need to reinstall your dependencies. Navigate to the relevant directory (`/next` or `/strapi/app`) and run the following:
```shell
npx rimraf -r node_modules
yarn install
```
This removes and reinstalls your dependencies.

## Setup Instructions

- Pull this project to your local machine with

```shell
git clone https://github.com/SWEN90013-2021-GN/GN.git
```

If you don't have Git installed, do this now. If you're working on Windows, make sure you install Git Bash as part of the Git installation.  

### Extra Steps for Windows Users

- Make sure either Git Bash is installed (this is generally an option when you first install git) or you have a different method of running bash scripts
- If you want to run scripts in powershell or windows terminal, add our project's root directory to your PATH and restart your computer (<https://helpdeskgeek.com/windows-10/add-windows-path-environment-variable/>)

## Front-End Development Setup

- Navigate to the `/next` directory

```shell
cd next
```

- Make sure you have the necessary environment files, these can be found [here in the #frontend channel on slack](https://gn-yl2021.slack.com/archives/C01U8KE0P1D/p1630295829001800)

- Install our project dependencies (only once at setup)

```shell
yarn install
```

- Run the project in development mode

```shell
yarn dev
```

- Access the app at  <http://localhost:3000>

## Back-End Development Setup

- Navigate to the `/strapi/app` directory

```shell
cd strapi/app
```

- Make sure you have the necessary environment files, these can be found [here in the #backend channel on slack](https://gn-yl2021.slack.com/archives/C02CX3M1ZCL/p1630296065009400)

- Install our project dependencies (only once at setup)

```shell
yarn install
```

- Run the project in development mode

```shell
yarn develop
```

- Access the app at  <http://localhost:1337>
- Login to the Strapi admin panel using credentials found [here on Confluence](https://confluence.cis.unimelb.edu.au:8443/display/SWEN900132021GN/Project+Credentials)

## Adding a Feature to the Frontend

- Start the front end server using the instructions in [Front-End Development Setup](#front-end-development-setup).
- If developing features that use the backend, also run the backend using instructions in [Back-End Development Setup](#back-end-development-setup).

- Ensure that your changes also run in a production environment by running

```shell
yarn build
yarn start
```

- Please note any type errors will prevent the application from building
- You can now commit and push your changes

## Adding a Feature to the Backend

Start the backend server in development mode using the instructions in [Back-End Development Setup](#back-end-development-setup).

- Make any changes you want
- Ensure strapi builds

```shell
yarn build
yarn start
```

***(Temporary until we have migration scripts setup)***  
If making changes to the database models, please ensure you note down these changes in your pull request in detail. They will need to be replicated in production immediately before merging your PR to main.*

- You can now commit and push your changes
