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

### Info



### Screenshot

![Home page](./screenshot.png)

### Links

- [CUMyBank]()

## My process

### Built with

- Intellij IDEA Ultimate.
- Spring boot.
- Hibernate.
- 
- 
- 

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
- Paste it in db.properties; Also paste there "User" and "Password".
- Create .war of your Spring MVC app.
- Use instruction down below from Heroku documentation.

### What I learned

- 
- 
- 
- 

### Plans

- Create TransferService for manipulating with transfers.
- Create scheduler for savings and credit accounts.
- Create CommissionService.
- Create frontend..
- CI, Pipeline, Docker, Jenkins, Heroku deployment and also Sonarqube.
- 
- 

### Useful resources

- if you're like me and want to deploy .war - read about it [here](https://devcenter.heroku.com/articles/war-deployment) (for me took around 10 min.)
- [MariaDB in details for my distro](https://wiki.archlinux.org/title/MariaDB) btw...
- [W3 Schools](https://www.w3schools.com/) (used for all HTML and CSS)
- I'm so sorry, I can't remember where I took solution for jsp's proper work with foreign keys. It was Stack Overflow, I guess.

## Author

- [Website](https://kamixtrash.netlify.app/)
- Telegram - [kam1xgod](https://t.me/kamixgod)
- Mail - [kamixtrash@gmail.com](mailto:kamixtrash@gmail.com)

