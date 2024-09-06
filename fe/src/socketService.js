import io from 'socket.io-client';

// Replace with your server URL and path
const socket = io('https://ide-tawny.vercel.app/', { path: '/api/socket.io' });

// Replace with your session ID
const sessionId = 'unique-session-id';

// Join the session when the module is imported
socket.emit('join', sessionId);

export const listenForCodeChanges = (callback) => {
  socket.on('codeUpdate', (data) => {
    callback(data.code);
  });

  // Return a function to unsubscribe from the event
  return () => {
    socket.off('codeUpdate');
  };
};

export const sendCodeChange = (code) => {
  socket.emit('codeUpdate', { code, sessionId });
};
