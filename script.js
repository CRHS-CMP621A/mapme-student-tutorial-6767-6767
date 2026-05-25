//following code is intended to be used by the server:

class Server {
  constructor(password) {
    this.password = password;
    this.clientSet = {};
  }
  cRequest(attempt) {
    if ((attempt = this.password)) {
      //establish connection with the client
      //
    }
  }
  iRequest(info) {}
}

//following code is intended to be used by the client:

function connect(serverName, password) {
  //attempt to send a message to the server to establish connection
}
