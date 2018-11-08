const express = require('express'); // Express JS
const hbs = require('hbs');         // handlebars.js wrapper for Express JS
const fs = require('fs');

// the PORT environment variable below is set by heroku
// since on a local installation of this app the PORT environment varialbe might
// not be set a fallback port number was also added for local development
const port = process.env.PORT || 8080;
var app = express();

/*************************************************************
 * Configure HBS
 *************************************************************/

hbs.registerPartials(__dirname + '/views/partials'); // add support for partials from handlebars.js
app.set('view engine', 'hbs');  // setting the Express JS view engine to hbs (handlebars.js)

// register a handlebars helper function to return the current year
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// register another handlebars helper to return uppercase text
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


/*************************************************************
 * Custom Logger middleware
 * (How to create and use custom middlewares)
 *************************************************************/

 // this is a custom middleware that logs each request to the console and into a 'server.log' file
 // IMPORTANT: it's required to call the next() method inside the middleware definition,
 // otherwise the app will never go past this middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

/*************************************************************
 * Custom Maintenance Mode middleware
 * (How to create and use custom middlewares)
 *
 * NOTE: remove the comment block below to test maintenance mode
 *************************************************************/

/*
// this is a custom middleware for maintenance mode
// This middleware it's not calling next() at all, which means that the app will
// never get past this middleware
app.use((rew, res, next) => {
  res.render('maintenance.hbs');
  // notice that next() it's not called
  // so for each and every request the user will see the maintenance.hbs view
});
*/

/*************************************************************
 * Serving static files from the /public folder
 *************************************************************/

// using the built in express static middleware to serve static files (Example: http://localhost:8080/help.html)
// this way any static files from the /public folder will be served automatically, without setting up any routes in Express
app.use(express.static(__dirname + '/public'));




/*************************************************************
 * Routes
 *************************************************************/

// sending back HTML in the response
/*
app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});
*/

// sending back JSON data in the response
/*
app.get('/', (req, res) => {
  res.send({
    name: 'Balazs',
    likes: [
      'Movies',
      'Reading'
    ]
  });
});
*/

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
