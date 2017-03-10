const Worker = require('firefly-core-libs').Worker;
const fetch = require('node-fetch');
const EventEmitter = require('events').EventEmitter; 

class HeartBeat extends Worker {

  constructor({id, delay, data}) {
    super({id, delay, data})
    this.eventEmitter = new EventEmitter();
  }
  
  on(eventName, doSomeThing) {
    this.eventEmitter.on(eventName, doSomeThing)
  }
  
  hey(data) {
    fetch(`${data.serverUrl}/hey`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": data.credentials
      },
      body: JSON.stringify(data.serviceInformations)
    })
    .then(response => {
      return response.json()
    })
    .then(jsonData => {
      console.log("❤️", jsonData)
      return jsonData;
    })
    .catch(error => {
      console.error("😡", error.message)
      this.eventEmitter.emit('error', error)
    })

  } // end of hey()

}

module.exports = HeartBeat
