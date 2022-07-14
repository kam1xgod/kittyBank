# 🐱 SbtJavaSchool - Kitty Bank. 🐈

## Table of contents

- [Overview](#overview)
  - [General Information](#info)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [How to use](#how-to-use)
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
And this is - the graduation work. You can create become a user with your email, create accounts, 
activate them with link sent to email and do basic bank things.

Actually, this app should be using GMail, but unfortunately I reached maximum of accounts per number. :(

There's a lot of todo things in this project. I will handle them after finishing this semester in uni.

Later I will also create repository with all tasks from this JavaSchool. 

### Screenshot

![Home page](./screenshot.png)

### Links

- [Kitty Bank](https://sbtfinalproj.herokuapp.com/)

### How to use

#### In general:

- change values in `./src/main/resources/application.properties`;
``` properties 
# Databse properties:

### may be you would want to change dialect.

### if you're using MariaDB like me:
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.datasource.url=jdbc:mariadb://*hostname*:*port*/*database_name*
spring.jpa.database-platform=org.hibernate.dialect.MariaDB103Dialect

### or if it's MySQL:
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://*hostname*:*port*/*database_name*
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

### same for all:
spring.datasource.username=*your_username*
spring.datasource.password=*your_password*


# Mailing properties:
spring.mail.host=smtp.*your_host*
spring.mail.username=*your_mail_adress*
spring.mail.password=*your_mails_app_password*


# Hostname changing:
### basically, where your frontend ment to be.
### for local React JS app: 
hostname=localhost:3000


# JWT secret:
jwt.secret=*your_random_words*
```
- also in `./frontend/src/utils/constants/url.ts`;
``` TypeScript
export const API_BASE_URL = "LINK TO YOUR BACKEND WITH HTTP(S)";
export const WEBSOCKET_URL = "LINK TO YOUR WEBSOCKET WITH HTPP(S)";
```
- check `./pom.xml` and update dependecies if needed;
- Run
``` bash
# in repository's home directory.

mvn clean install package;
```

#### With Docker

- After all steps above you can simply execute this in your terminal:

``` bash
# in repository's home directory.

docker-compose up;
```

#### Just jar file

- A little bit of walking around, but pretty simple too.

``` bash
# in repository's home directory.

cd target
java -jar finalProject-0.0.1-SNAPSHOT.jar
cd ../frontend
yarn install
yarn start
```

## My process

### Built with

- Intellij IDEA Ultimate.
- [Spring boot](https://start.spring.io/).
- [React JS](https://reactjs.org/)
- [VS Code](https://code.visualstudio.com/).
- [Hibernate](https://hibernate.org/).
- Tried [Swagger](https://swagger.io/).
- [Heroku](https://www.heroku.com).

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

- [Docker](https://www.docker.com/).
- [Jenkins](https://www.jenkins.io/).
- [Sonarqube](https://www.sonarqube.org/).
- actually tests for previous one.
- [Liquibase](https://www.liquibase.com).
- close all my todos.)0))
- will also try to use [Apache Kafka](https://kafka.apache.org/) here.
- and [RabbitMQ](https://www.rabbitmq.com/).
- [Swagger](https://swagger.io/).
- write javadoc?
- change design.
- a lot of refactoring... 

### Useful resources

- [MariaDB in details for my distro](https://wiki.archlinux.org/title/MariaDB) (btw...).
- [W3 Schools](https://www.w3schools.com/) (used for all HTML and CSS)
- [Postman](https://www.postman.com/)
- A lot of [StackOverFlow](https://stackoverflow.com/) threads.
- Also a lot of [Baeldung](https://www.baeldung.com/) articles.
- [Kaffein](http://kaffeine.herokuapp.com/) for pinging your heroku app - so it will not be asleep.

## Author

- [Website](https://kamixtrash.netlify.app/)
- Telegram - [kam1xgod](https://t.me/kamixgod)
- Mail - [kamixtrash@gmail.com](mailto:kamixtrash@gmail.com)

