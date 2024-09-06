import io from 'socket.io-client';

const socket = io('https://ide-tawny.vercel.app/');

export const listenForCodeChanges = (callback) => {
  socket.on('codeUpdate', (data) => {
    callback(data.code);
  });

  return () => {
    socket.off('codeUpdate');
  };
};

export const sendCodeChange = (code) => {
  socket.emit('codeUpdate', { code, sessionId: 'unique-session-id' });
};
