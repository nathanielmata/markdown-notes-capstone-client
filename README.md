# Markdown Notes Capstone 

'Markdown Notes' is a note taking app that lets you create notes in a markdown editor and preview the html output, then save the note to your user account.  

# Features  

- Take notes using basic markdown syntax
- Save notes to an account
- Delete notes from an account
- Preview the html output of your markdown

## Technology  

- Front-End: HTML5, CSS3, JavaScript ES6, React
- Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
- Prodcution Environment: Heroku, Vercel

## Working Prototype  

You can access a working prototype of the:

  React(Client) app here:  
    https://markdown-notes-capstone-client.vercel.app  
    
  Node/Express(Server) API here:  
    https://infinite-sea-85899.herokuapp.com/api  


## User Stories  

This app is for two types of users: a REGISTERED USER and an UNREGISTERED USER  

#### Landing Page  

- as a REGISTERED USER
- I want to go to a landing page that introduces the app and explains its features and provides links to sign-in page, sign-up page.
- So I can learn more about the app and how it works

---

#### Login  

- as a REGISTERED USER
- I want to login to my account with my unique username and password and start a logged in session
- So I can view my user dashboard and decide where to navigate in my account

---

#### How-to page  

- as an UNREGISTERED/REGISTERED USER
- I want to go to a How-to page to help me understand how to use the app
- So I can effectively use the app

---


#### User dasboard page  

- as a REGISTERED USER
- I want to view my user dashboard
- So I can view and search a list of my saved Markdown notes

---

#### User dasboard page(Logout)  

- as a REGISTERED USER
- I want to logout of my account
- So I can limit access to my account

---

#### User new note page  

- as a REGISTERED USER
- I want to create a new Markdown note
- So I can edit and save the Markdown note in the editor while previewing the output HTML

---

#### User edit note page  

- as a REGISTERED USER
- I want to edit a saved Markdown note
- So I can save the Markdown note in the editor while previewing the output HTML


### Wireframes

Landing Page  
:-------------------------:
![Landing Page](./github-images/wireframes/landing-page-wireframe3.png)

Sign up Page
:-------------------------:
![Sign up Page](./github-images/wireframes/signup-page-wireframe.png)

Login Page  
:-------------------------:
![Login Page](./github-images/wireframes/login-page-wireframe.png)

User public Page  
:-------------------------:
![User public Page](./github-images/wireframes/user-public-page-wireframe.png)

User dashboard `new doc` Page
:-------------------------:
![User dashboard `new doc` Page](./github-images/wireframes/dashboard-new-page-wireframe.png)

| User dashboard `notes list` Page                                                                  | Mobile                                                                                                   |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ![User dashboard `notes list` Page](./github-images/wireframes/dashboard-list-page-wireframe.png) | ![User dashboard `notes list` Page](./github-images/wireframes/dashboard-list-page-wireframe_mobile.png) |

| User dashboard `editor` Page                                                               | Mobile Editor                                                                                         | Mobile Preview                                                                                         |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ![User dashboard `editor` Page](./github-images/wireframes/dashboard-editor-wireframe.png) | ![User dashboard `notes list` Page](./github-images/wireframes/dashboard-editor-wireframe_mobile.png) | ![User dashboard `notes list` Page](./github-images/wireframes/dashboard-preview-wireframe_mobile.png) |

User dashboard `export dropdown` Page  
:-------------------------:
![User dashboard `export dropdown` Page](./github-images/wireframes/dashboard-export-page-wireframe.png)

User dashboard `user preferences dropdown` Page  
:-------------------------:
![User dashboard `user preferences dropdown` Page](./github-images/wireframes/dashboard-profile-logout-page-wireframe.png)

## Screenshots

Landing Page
:-------------------------:
![Landing Page](https://user-images.githubusercontent.com/1923736/100743793-095cf800-339a-11eb-8116-9a063ab55064.jpg)

Dashboard Page
:-------------------------:
![Dashboard Page](https://user-images.githubusercontent.com/1923736/100743716-ed595680-3399-11eb-8d8d-3c75394a97ec.jpg)

Sign-in Page
:-------------------------:
![Sign-in Page](https://user-images.githubusercontent.com/1923736/100743888-2c87a780-339a-11eb-9084-0140ebac920d.jpg)

Edit Note Page
:-------------------------:
![Edit Note Page](https://user-images.githubusercontent.com/1923736/100743757-fd713600-3399-11eb-879a-e36fa7a03684.jpg)

New Note Page
:-------------------------:
![New Note Page](https://user-images.githubusercontent.com/1923736/100743829-17ab1400-339a-11eb-8cbd-c87d678f6ef9.jpg)

Sidebar
:-------------------------:
![Sidebar](https://user-images.githubusercontent.com/1923736/100743856-22fe3f80-339a-11eb-886f-d9d723c80eed.jpg)

## API Documentation 

POST /api/auth/login  
- post's a user's credentials for login

GET /api/notes  
- get a user's notes  

POST /api/notes  
- post a new note

GET /api/notes/:id  
- get a note by id

DELETE /api/notes/:id  
- delete a note by id

PATCH /api/notes/:id  
- update a note by id

## Responsive

App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap (later)

This is v1.0 of the app, but future enhancements are expected to include:

- allow users to register
- enable users to view and create notes without having to login
- allow users to make private notes public
- extend markdown support beyond basic syntax 
- allow users to export .md or .html file
- search notes  
- tagging notes 


## How to run it

Use command line to navigate into the project folder and run the following in terminal

### Local Server/Node scripts

- clone repo https://github.com/nathanielmata/markdown-notes-capstone-server
- To install the node project ===> npm install
- To migrate the database ===> npm run migrate -- 1
- To run Node server (on port 8000) ===> npm run dev
- To run tests ===> npm run test

### Local Client/React scripts

- clone repo https://github.com/nathanielmata/markdown-notes-capstone-client
- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test
