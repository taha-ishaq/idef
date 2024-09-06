import io from 'socket.io-client';

const socket = io('https://ide-tawny.vercel.app/'); // Replace with your server URL

export const listenForCodeChanges = (callback) => {
  socket.on('codeChange', callback);

  return () => {
    socket.off('codeChange', callback);
  };
};

export const sendCodeChange = (code) => {
  socket.emit('codeChange', code);
};
