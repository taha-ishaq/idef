import React, { useEffect, useState } from 'react';
import { MonacoEditor } from '@monaco-editor/react';
import io from 'socket.io-client';

// Replace with your WebSocket server URL
const socket = io('https://ide-tawny.vercel.app');

// Replace with the session ID you want to join
const sessionId = 'unique-session-id';

const CodeEditor = () => {
  const [code, setCode] = useState('// Start coding...');
  
  useEffect(() => {
    // Join session on connection
    socket.emit('join', { sessionId });

    socket.on('codeUpdate', (data) => {
      setCode(data.code);
    });

    return () => {
      socket.off('codeUpdate');
    };
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('codeUpdate', { code: value, sessionId });
  };

  return (
    <MonacoEditor
      height="90vh"
      language="javascript"
      value={code}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
