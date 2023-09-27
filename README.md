# FullCalendar with CRUD

This project is a JS FullCalendar Scheduler application with a server for performing CRUD operations.

## Getting Started

To get started you need to clone the repository and navigate into the folder.

```sh
git clone https://github.com/ritza-co/fullcalendar-scheduler-starter fullcalendar-scheduler
cd fullcalendar-scheduler
```

## Installing

We already configured the required packages in the `package.json` file.

You can run the following command to install all dependent packages related to this project.

```sh
npm install
```

## Setting up the Database

In the `server.js` file, the Express server uses the MySQL2 library to connect to MySQL and run queries.

Create a `.env` file in the root folder and add the following lines for connecting to the MySQL database that we’ll create:

```
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='<your-password>'
DB_DATABASE='fullcalendarscheduler'
```

Don’t forget to add the root password for your MySQL server.

We’ll install MySQL Server and MySQL Workbench. MySQL Workbench is a MySQL GUI that we’ll use to create a database with tables for the Gantt data and to run queries. Download MySQL Server and MySQL Workbench from the MySQL community downloads page. If you’re using Windows, you can use the MySQL Installer to download the MySQL products. Use the default configurations when configuring MySQL Server and Workbench. Make sure that you configure the MySQL Server to start at system startup for convenience.

Open the MySQL Workbench desktop application. Open the local instance of the MySQL Server that you configured.

We’ll write our MySQL queries in the query tab and execute the queries by pressing the yellow lightning bolt button.

Let’s run some MySQL queries in MySQL Workbench to create, use, and populate a database for our FullCalendar Scheduler. Execute the following query to create a database called `fullcalendarscheduler`:

```sql
CREATE DATABASE fullcalendarscheduler;
```

Run the following query so that we set our newly created database for use:

```sql
USE fullcalendarscheduler;
```

Let’s create the table that we’ll need for our FullCalendar Scheduler resources:

```sql
CREATE TABLE fullcalendar_scheduler_resources (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `eventBackgroundColor` varchar(255) NOT NULL,
  PRIMARY KEY (`id`))
```

Now create the table that we’ll need for our FullCalendar Scheduler events:

```sql
CREATE TABLE fullcalendar_scheduler_events (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `resourceId` int NOT NULL,
  PRIMARY KEY (`id`))
```

Now add some example resources data to the `fullcalendar_scheduler_resources` table:

```sql
INSERT INTO fullcalendar_scheduler_resources (id, title, eventBackgroundColor) VALUES (1, 'Peter', '#3183fe'), (2, 'Lisa', '#0076f8'), (3, 'Jennifer', '#9e25c3'), (4, 'Veronica', '#2055a5'), (5, 'James', '#1fba5e'), (6, 'Walter', '#fab007');
```

Add some example events data to the `fullcalendar_scheduler_events` table:

```sql
INSERT INTO fullcalendar_scheduler_events (id, title, start, end, resourceId) VALUES (1,  'Meeting', '2023-12-04T08:00:00', '2023-12-04T11:00:00', 1), (2, 'Interview intern', '2023-12-04T13:00:00', '2023-12-04T14:00:00', 3), (3, 'Write up report', '2023-12-03T08:00:00', '2023-12-04T17:00:00', 4), (4, 'Presentation', '2023-12-04T14:00:00', '2023-12-04T16:00:00', 1), (5, 'Conference call', '2023-12-04T13:00:00', '2023-12-04T15:30:00', 6);
```

You’ll be able to view the example resources data by running the following query:

```sql
SELECT * FROM fullcalendar_scheduler_resources;
```

You’ll be able to view the example events data by running the following query:

```sql
SELECT * FROM fullcalendar_scheduler_events;
```

## Running

Run the server with:

```sh
npm start
```

Then navigate to `http://localhost:3000/` or open up your `public/index.html` in the browser to see your FullCalendar Scheduler app.

## Resources

You can also refer the below resources to know more details about FullCalendar's JS Calendar component.

- [Demos](https://fullcalendar.io/demos)
- [Documentation](https://fullcalendar.io/docs)