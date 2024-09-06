import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { listenForCodeChanges, sendCodeChange } from './socketService';

function App() {
  const [code, setCode] = useState('');

  useEffect(() => {
    const unsubscribe = listenForCodeChanges((newCode) => {
      setCode(newCode);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (value) => {
    setCode(value);
    sendCodeChange(value); // Emit the code change to the server
  };

  return (
    <div className="App">
      <Editor
        height="90vh"
        language="javascript"
        value={code} // Set the code as the value
        onChange={(value, event) => handleChange(value)} // Handle code changes
        theme="vs-dark"
      />
    </div>
  );
}

export default App;
