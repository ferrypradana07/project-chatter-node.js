io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', async ({ roomId, userId }) => {
        try {
            const user = await User.findById(userId);
            if (user) {
                socket.join(roomId);
                console.log(`User ${userId} joined room ${roomId}`);
                socket.emit('message', { user: 'system', text: `Welcome to room ${roomId}` });
                socket.broadcast.to(roomId).emit('message', { user: 'system', text: `${user.name} has joined the room` });
            } else {
                socket.emit('error', { message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            socket.emit('error', { message: 'An error occurred while joining the room' });
        }
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
        socket.leave(roomId);
        console.log(`User ${userId} left room ${roomId}`);
        socket.broadcast.to(roomId).emit('message', { user: 'system', text: `User ${userId} has left the room` });
    });

    socket.on('sendMessage', ({ roomId, userId, message }) => {
        io.to(roomId).emit('message', { user: userId, text: message });
        console.log(`User ${userId} sent message to room ${roomId}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
