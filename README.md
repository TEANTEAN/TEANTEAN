# SWEN90013 Masters Advanced Software Project<br />

*Year:* 2021<br />
*Team name*: Team GN<br />
*Inception sprint tag*: Inception Sprint <https://github.com/SWEN90013-2021-GN/GN/releases/tag/Inception><br />
*Sprint 1 tag*: TBA<br />
*Sprint 2 tag*: TBA<br />
*Sprint 3 tag*: TBA<br />
*Sprint 4 tag*: TBA<br /><br />

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

<br />

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

<br />

### Changelog

| Change | Description |
| - | - |
| Project scope | - Project scope was confirmed in conjunction with the client
| Requirements | Created:<br/>- Motivational Goal Model<br/>- Personas<br/>- User Stories<br/>- Acceptance Criteria<br/>
| Design concept | Created:<br/>- Mood Board<br/>- Wireframes<br/>- Design Notebook<br/>|
| 4+1 Architecture View | Created:<br/>- Logical View<br/>- Physical View<br/>- Development/Implementation View<br/>- Scenarios/Use Cases View<br/>
| Testing and Quality Assurance | Created:<br/>- Acceptance Testing<br/>- Accessibility Testing<br/>- Functional Testing<br/>- Integration Testing<br/>- Unit Testing |

<br />

### Setup Instructions (draft)
- Navigate into docker directory
- Ensure docker and docker-compose are installed correctly <https://docs.docker.com/compose/install/>
- Use command: docker-compose up -d, this will download all required images and make 3 seperate services, strapi, mongo, and nextjs
- By default nextjs is running on port 3000 and strapi in port 1337 but these details can be viewed in the docker-compose yml
- It will also sort out the dns settings as docker can use networks, so for example the nextjs container can access the strapi container by juse using strapi:3000 instead of an ip address

## Using lifesaver script
- Lifesaver script provides some common operations 
- USAGE: ./lifesaver.sh <args>
		up - brings up docker container
		down - brings down containers
		destroy - clean docker slate including removing volumes
		save front - save changes to frontend
		save back - save changes to backend

## Add feature to frontend
1. When you build a docker image, it will copy the required files for you, this takes about 30 seconds so it might be a good idea to test your changes on a local next build.
2. Then, you can simple rebuild image with docker-compose up -d --build, the changes will be reflected on the docker next version on port 3000.
3. Commit your changes

## Testing next locally
1. Ensure node and yarn are installed on your system.
2. Run next locally by navigating to the next directory and running yarn dev -p 2999 (note nextjs uses port 3000 by default, so we need to use different one to avoid conflict)
3. Alternatively , to do this you can use yarn next build (in next directory), then yarn start -p 2999 (note nextjs uses port 3000 by default, so we need to use different one to avoid conflict)

## Add backend feature without db model change AND Add backend feature with db model change
1. Access strapi frontend (localhost:1337)
2. make some changes
3. docker ps, find the hash of the mongo container
4. navigate to the /docker/mongo directory
5. docker exec -t <hash> mongodump -u strapi -p password --out /backup/
6. rebuild with docker-compose up -d --build or push to git

