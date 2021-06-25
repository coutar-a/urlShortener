# Url shortener

This app is a simple url shortener service.

## Get started

Create a file called `.env`  in the root folder and write in it the following:

```
SERVER_PORT= # the app's server port
MONGO_URL= # the url of the MongoDB database you want to use
REACT_APP_SERVER_PORT= # should be the same as SERVER_PORT, this is a bug workaround 
```

Give these variables values, and then run `npm install` and then `npm start` to start the app. The app's url will be display in your terminal.
