// src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { Editor } from '@monaco-editor/react';

const socket = io('http://localhost:3000');

function App() {
  const [code, setCode] = useState('');

  useEffect(() => {
    socket.on('codeChange', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off('codeChange');
    };
  }, []);

  const handleChange = (value) => {
    setCode(value);
    socket.emit('codeChange', value);
  };

  return (
    <div className="App">
      <Editor
  height="90vh"
  defaultLanguage="javascript"
  defaultValue="// some code"
  theme="vs-dark"
/>
    </div>
  );
}

export default App;
