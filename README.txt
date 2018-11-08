==========================================
  Express package
==========================================

https://www.npmjs.com/package/express

Fast, unopinionated, minimalist web framework for node - great for building web servers

==========================================
  Handlebars JS templating engine
==========================================

http://handlebarsjs.com/

==========================================
  ExpressJS view engine for handlebars.js
==========================================

https://www.npmjs.com/package/hbs

==========================================
  Make nodemon watch for hbs files too
==========================================
nodemon server.js -e js,hbs



==========================================
  Using heroku
==========================================

1. Go here https://toolbelt.heroku.com
2. Download heroku toolbelt for your platform and install it
3. Login with heroku
    > heroku login
4. Add your SSH key
    > heroku key:add
5. Test the connection to heroku
    > ssh -v git@heroku.com
6. Inside package.json specify a "start" script (i.e. a command to be run from the terminal)
    - see package.json for this "start" script line
7. Make sure your app uses the PORT environment variable (set by Heroku)
    - see the port variable in server.js for this
8. Create an app in Heroku
    > heroku create
9. Heroku will add a new remote repository, so make sure to push everything to that remote as well
    > git push heroku
10. Open the newly created heroku app in the default browser
    > heroku open
