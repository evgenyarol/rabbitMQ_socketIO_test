let io = require('../Socket/socket');
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'updateUser';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for UserData messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (data) {
            user = JSON.parse(data.content.toString())
            console.log(" [x] Received User:", user.name + " : " + user.value);
            io.socket.emit("updatedUser", user);
        }, {
            noAck: true
        });
    });
});