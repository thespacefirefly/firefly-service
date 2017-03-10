const express = require("express");
const bodyParser = require("body-parser");

let httpService = ({serviceName}) => {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));
      //app.use(express.static('public'));

      // called by the discovery-server
      app.get(`/${serviceName}/hello`, (req, res) => {
        res.send({message: "👋 hi"})
      });

      resolve(app)

    } catch(error) {
      reject(error)
    }
  })
}

module.exports = httpService