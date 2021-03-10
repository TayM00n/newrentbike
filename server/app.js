let express = require('express');
let path = require('path');
let logger = require('morgan');
let cors = require('cors')
let debug = require('debug')('server:server');
let mongoose = require('mongoose')

let app = express();

let port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use("/api", require("./routes/bikes"))

app.use(express.static(path.join(__dirname,"/../", "client", 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"/../", "client", 'build',"index.html"))
})


async function start () {
  try{
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    app.listen(port);
    app.on('error', onError);
    app.on('listening', onListening);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Connection to DB has been successes")
    });
  }catch(e){
    console.log(e)
    process.exit(1)
  }
}

start()



function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = app.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
