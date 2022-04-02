import React, { useState } from 'react';
import jmespath from 'jmespath';

import JsonMirrorArea from './JsonMirrorArea';
import './App.css';

const initJson = `{
  "menu": {
    "id": "file",
    "value": "Files",
    "popup": {
      "menuitem": [
        {
          "value": "New", 
          "onclick": "CreateNewDoc()"
        },
        {
          "value": "Open", 
          "onclick": "OpenDoc()"
        },
        {
          "value": "Close", 
          "onclick": "CloseDoc()"
        }
      ]
    }
  }
}`

function App() {
  const [input, setInput] = useState(initJson);
  const [query, setQuery] = useState();
  const [result, setResult] = useState();

  const queryJmespath = (source, value) => {
    let inputVal, queryVal, queryResult = '';

    switch (source) {
      case 'input':
        inputVal = value;
        queryVal = query;
        break;
      case 'query':
        inputVal = input;
        queryVal = value;
        break;
      default:
        return;
    }

    try {
      queryResult = JSON.stringify(jmespath.search(JSON.parse(inputVal), queryVal), null, 2);
    } catch (error) {
      queryResult = error.toString();
    }
    setResult(queryResult);
  }

  return (
    <div>
      <p>Input</p>
      <JsonMirrorArea
        value={input}
        onChange={(value, viewUpdate) => {
          setInput(value);
          queryJmespath('input', value);
        }}
      />
      <p>Query</p>
      <JsonMirrorArea
        value={query}
        onChange={(value, viewUpdate) => {
          setQuery(value);
          queryJmespath('query', value);
        }}
      />
      <p>Result</p>
      <JsonMirrorArea
        value={result}
        editable={false}
        onChange={(value, viewUpdate) => {
          setResult(value);
        }}
      />
    </div>
  );
}

export default App;
