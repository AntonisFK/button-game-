module.exports = function Route (app, server){

  var counter = 0; 
//route to open index
  app.get('/', function(req, res){
    res.render('index')
  })

  
  var io = require('socket.io').listen(server)

   io.sockets.on('connection', function (socket){
      
      socket.emit('initalCount', {response: counter});
      console.log(socket.id);
      
      socket.on('pushButton', function (data){
        console.log("Bpressed");
        console.log(data.action)
         counter += 1; 
         //need to also create a response to seen it to everyone 
         io.emit('pushCounter', {response: counter});
      })

      socket.on('pushReset', function (data){
        console.log(data.action);
        counter = 0;
       
        io.emit('countZero', {response: counter});

      })

  });
}