import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { listenForCodeChanges, sendCodeChange } from './socketService';

function App() {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Listen for code changes from other clients
    const unsubscribe = listenForCodeChanges((newCode) => {
      setCode(newCode);
    });

    // Clean up listener on component unmount
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
        onChange={(value) => handleChange(value)} // Handle code changes
        theme="vs-dark"
      />
    </div>
  );
}

export default App;
