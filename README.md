# igse

# How to run the application

## Requirements

1. Mysql 8.0.\*
2. Java JDK 17 or higher
3. NodeJs 16.15.0

## Database

1. Create a database in MySQL and name it "igse"
2. Run the sql script in the database folder on your database server using the earlier created database "igse"

## Backend

1. Open the backend folder in any Java IDE preferably Intelij Idea
2. Change the database credentials in application.properties located in backend/src/main/resources to match those of your database
3. Run BackendApplication.java located in src/main/java

## Frontend

1. Open the frontend folder in terminal
2. Run these commands one after the other:

```
npm i -g sass
```

```
npm ci
```

```
npm start
```
