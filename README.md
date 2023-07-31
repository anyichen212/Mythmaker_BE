 <p align="center">
<a href="https://mythmakers.netlify.app">Deployed Netlify Site</a>
    ·
    <a href="https://github.com/anyichen212/Mythmaker_BE">Back End Repo</a>
    ·
    <a href="https://github.com/dhungwt/mythmaker_frontend/">Front End Repo</a>
<img src = "https://github.com/dhungwt/mythmaker_frontend/blob/main/src/pages/assets/MMlogo.png?raw=true">
   <br /> 
    A project made by Anyi Chen, Diana Hung, Hafeefa Sultan and Jianing Wei as part of the Brooklyn College Tech Talent Pipeline Program.
    <br />
    </p>

# MythMaker's API Endpoints
An interactive create-your-own-adventure game platform that enables players to create, share, and explore captivating stories through choose-your-own-adventure style gameplay

## USERS
User datas, including auth information.
#### GET
* `/api/users` - Get all users data
* `/api/users/:id` - Get single user data by id
* `/api/users/auth/me` - Check if user is authenticate before fetching the single user data

#### POST
* `/api/users` - Add a new user
* `/api/users/auth/login` - For log in, Authenticate a user, allowing them to log in
* `/api/users/auth/logout` - For log out, destroy session and clear cookie from the server side, allowing user to logout
* `/api/users/auth/signup` - For sign up, add a new user into the database with a valid email and password

#### PATCH
* `/api/users/:id` - Update single user datas by id

#### DELETE
* `/api/users/:id` - Delete single user by id

## STORIES
Mythmaker stories
#### GET
* `/api/stories` - Get all stories data
* `/api/stories/:id` - Get single stories data by id
* `/api/stories/:id/:userId` - Get all stories create by a single user with userId

#### POST
* `/api/stories` - Add a new story

#### PATCH
* `/api/stories/:id` - Update a story by id
* `/api/stories/:storyId/:characterId` - Update a story's character cast only

#### DELETE
* `/api/stories/:id` - Delete a story by id

## Events
Mythmaker's story events
#### GET
* `/api/events` - Get all existing events
* `/api/events/:storyId` - Get all events within a story by storyId
* `/api/events/:storyId/:id` - Get single event by id

#### POST
* `/api/users` - Add a new event

#### PATCH
* `/api/users/:id` - Update single event by id

#### DELETE
* `/api/users/:id` - Delete single event by id

## Characters
Mythmaker's story characters
#### GET
* `/api/characters` - Get all existing characters
* `/api/characters/:id` - Get a single character by id

#### POST
* `/api/characters` - Add a character

#### PATCH
* `/api/characters/:id` - Update a character by id

#### DELETE
* `/api/characters/:id` - Delete a character by id
