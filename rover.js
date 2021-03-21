class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    if (!position) {
      throw Error("Rover position required.");
    }
    this.mode = 'NORMAL'
    this.generatorWatts = 110
    //this.commands=commands;
  }
  receiveMessage(message) {
    let response = {

      message: "",
      results: []
    }
    let result ={
    completed:false,
    roverStatus: this
        
    }
    let i;
    for (i = 0; i < message.commands.length; i++) {

      if (message.commands[i].commandType === 'MOVE') {
        if(this.mode === 'LOW_POWER'){
          result.completed = false
        }
        else{
        result.completed = true 
        result.roverStatus.position = message.commands[i].value
        }
        
        
      }
      else if (message.commands[i].commandType === 'STATUS_CHECK') {
        result.completed = true 
        
        
      }
      else if (message.commands[i].commandType === 'MODE_CHANGE') {
        result.completed = true
        result.roverStatus.mode = message.commands[i].value
        
      }
      response.message = message.name
        response.results.push(result)
    }
    return response
  }

}

module.exports = Rover;