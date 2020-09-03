const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports = {

  socket: any = io.on('connection', (socket) => {
    console.log('User Socket Connected');
    socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
  })
};
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

