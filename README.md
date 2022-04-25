# GainTrain Local SetUp

The first thing to do is to change the values of certain variables to allow for you to connect with MySQL and use local host ports. In /server/.env, change the value of 
PASSWORD to the  password of your database. The next file that you may need to configure is /server/database.js. The values of user, password, and database should be changed
to your MySQL username, MySQL password, and the name of the database that you have/will create respectively. Port may also be changed if you would like to use a different port
than 3306. Finally, in /server/server.js, we have set the port to 8080, this can be changed to any port that you would like to use if you are currently using 8080. 

Next, we can create the database tables. Once you have created your database, use the next statements to create the proper tables.

CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FName` varchar(45) DEFAULT NULL,
  `LName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Experience` int DEFAULT NULL,
  `Level` int DEFAULT NULL,
  `Token` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`)
); 

CREATE TABLE `exercises` (
  `ID` int NOT NULL,
  `ExerciseName` varchar(45) DEFAULT NULL,
  `Sets` int DEFAULT NULL,
  `Reps` int DEFAULT NULL,
  `Weight` double DEFAULT NULL,
  `Mins` double DEFAULT NULL,
  `Speed` double DEFAULT NULL,
  `Timestamp` bigint DEFAULT NULL,
   FOREIGN KEY (`ID`) REFERENCES `users` (`ID`)
) ;

Now that the tables have been setup in MySQL, we need to download all of the modules that are used in the project. Open up the terminal and make your way to the
/client and /server directories. You can then run the command 'npm install' to install all of our dependencies. Once that has been done, you can use the command
'npm start' in both /client and /server to start running the website locally.

