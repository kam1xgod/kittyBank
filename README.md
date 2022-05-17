# SbtJavaSchool - Online banking (idk).

## Table of contents

- [Overview](#overview)
  - [General Information](#info)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Heroku Deployment](#heroku-deployment)
  - [What I learned](#what-i-learned)
  - [In plans](#plans)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This application is some kind of online banking.

### Info

So, from february I was able to learn more 'bout Java in SbtSchool - program from Russian bank.
And this is - the graduation work. You can create account with your email, activate it with link sent to it and do basic
bank things.

### Screenshot

![Home page](./screenshot.png)

### Links

- [CUMyBank](https://sbtfinalproj.herokuapp.com/)

## My process

### Built with

- Intellij IDEA Ultimate.
- Spring boot.
- React.js.
- VS Code.
- Hibernate.
- Tried Swagger.
- Heroku.

### Heroku deployment

- Create app on Heroku.
- To use ClearDB (Cloud MySQL, I believe) you need to verify your account with card. I used digital one.
- Go to 'Settings' tab of your Heroku app. 
- Find 'Config Vars' and copy URL.
- Go in IntelliJ IDEA, on right panel open "Database" view.
- Create new one.
- Paste your url in "Database" for now.
- Delete 'mysql://'; First pair separated with ':' is username and password.
- Then delete '@' and take URL with last forward slash before "heroku_something" and paste it in "Host".
- Delete '/' from "Host".
- The rest of URL is "Database" itself.
- Test connection and apply settings.
- Copy "URL" in "Data Sources and Drivers" window.
- Paste it in application.properties; Also paste there "User" and "Password".
- And change there "hostname" to Heroku app for frontend. DON'T PASTE "HTTPS" part.
- In React project: change URL to one you've got from Heroku deployment.
- Use instruction down below from Heroku documentation.

### What I learned

- How useful DTO's are.
- How to work with mappers.
- How to create authentication.
- How React-Redux works.
- React with TypeScript.
- Postman auth requests.

### Plans

- CI, Pipeline, Docker, Jenkins and also Sonarqube.
- But I actually will need to write tests for last one.
- close all my todos.)0))

### Useful resources

- [MariaDB in details for my distro](https://wiki.archlinux.org/title/MariaDB) btw...
- [W3 Schools](https://www.w3schools.com/) (used for all HTML and CSS)
- [React JS](https://reactjs.org/)
- [Postman](https://www.postman.com/)
- A lot of [StackOverFlow](https://stackoverflow.com/) threads.

## Author

- [Website](https://kamixtrash.netlify.app/)
- Telegram - [kam1xgod](https://t.me/kamixgod)
- Mail - [kamixtrash@gmail.com](mailto:kamixtrash@gmail.com)

