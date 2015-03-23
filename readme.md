INSTRUCTIONS
================

- Building
    - NodeJS, NPM must be installed
    - 'gulp' must be installed (npm install -g gulp)
    - Run 'npm install'
    - To build the project run the default 'gulp'
- Testing
    - PhantomJS must be installed globally (http://phantomjs.org/download.html)
    - Run 'gulp test' to run all of the unit tests and functional tests

COMMENTS
================
- Uses a similar implementation to Backbone except that it's read only so no need for putting, posting, deleting...
- Has base models and view classes that everything extends from
- Proxies the rest API through a Node server that is run by calling 'node server'
- Is hosted on Heroku. Deploys by pushing the branch to 'heroku master' and viewed at 'http://polar- shelf- 5424.herokuapp.com/client/'
- Uses model view template architecture
    - Model:    Models the data that synchronizes with an endpoint URL
    - View:     Controls the UI logic for a model
    - Template: HTML templates for the model
- If there was no restriction on JS libraries I would have used FB React or Angular instead of using templates
