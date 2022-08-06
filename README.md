# This is [WeMeet](https://meetup-hg.herokuapp.com/), a MeetUp knockoff

## Introduction

The purpose of this clone is to replicate the operation and appearance of [meetup](https://www.meetup.com). 

Live Site: [WeMeet](https://meetup-hg.herokuapp.com/)

## Tech Stack

Frameworks, Platforms, and Libraries:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Database:

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

Hosting:

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Preview

### Landing Page

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765699/WeMeet/Landing-Page_oom1v8.png)

### Events Page

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765699/WeMeet/Events-Page_mur9mp.png)

### Groups Page

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765699/WeMeet/Groups-Page_omh3na.png)

### Event Details Page

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765699/WeMeet/Event-Details_eiehok.png)

### Group Details Page

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765699/WeMeet/Group-Details-Page_gsxlcc.png)

### Create Group Page

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765699/WeMeet/Creat-Group-Page_fzzdgh.png)

### Database Schema

![image](https://res.cloudinary.com/hansenguo/image/upload/v1659765866/WeMeet/dataBaseSchema_i267nt.png)

## Run Locally

- Clone/download this repo
- Open up two terminals, one for the backend, and one for the frontend
- In the first terminal, cd into the backend folder, run `npm install` to install the necessary dependencies, and then run `npm start`
- In the second terminal, cd into the frontend folder, run `npm install` to install the necessary dependencies, and then run `npm start`

### Environment Variables

To run this project, you need to add the following enviroment variables to your .env file in your backend folder.

```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
```

### Database setup

To deploy this project run

```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

## To-do-list

- Images feature
- Event Attendees feature
- Group Members feature
- Venues feature

All to-do features include fully working database tables and API routes. Only the user interface remains to be built.

## The main difficulties

* The most hard challenge on the backend server was appropriately correlating database tables.
* Complex organizations and the authorisation relationships that go with them

## Improvements

* Clean up the backend code and consider adding some middleware to handle issues.
* Change the names of several database columns and tables to make it more clear what they are for.
