import React, { useState } from 'react';
import * as jq from 'jq-web';
import jmespath from 'jmespath';
import * as jp from 'jsonpath';

import JsonMirrorArea from './JsonMirrorArea';
import { initConfig } from './initConfig';

import './App.css';

function App() {
  const [input, setInput] = useState(initConfig.input);
  const [query, setQuery] = useState(initConfig.query);
  const [queryMode, setQueryMode] = useState('jmespath');
  const [result, setResult] = useState(initConfig.result);

  const queryInput = (source, value) => {
    let inputVal, queryVal, modeVal, queryResult = '';

    switch (source) {
      case 'input':
        inputVal = value;
        queryVal = query;
        modeVal = queryMode;
        break;
      case 'query':
        inputVal = input;
        queryVal = value;
        modeVal = queryMode;
        break;
      case 'mode':
        inputVal = input;
        queryVal = query;
        modeVal = value;
        break;
      default:
        return;
    }

    try {
      switch (modeVal) {
        case 'jq':
          queryResult = JSON.stringify(jq.json(JSON.parse(inputVal), queryVal), null, 2);
          break;
        case 'jmespath':
          queryResult = JSON.stringify(jmespath.search(JSON.parse(inputVal), queryVal), null, 2);
          break;
        case 'jsonpath':
          queryResult = JSON.stringify(jp.query(JSON.parse(inputVal), queryVal), null, 2);
          break;
        default:
          return;
      }
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
          queryInput('input', value);
        }}
      />
      <p>Query</p>
      <div onChange={(event) => {
        setQueryMode(event.target.value);
        queryInput('mode', event.target.value);
      }}>
        <label><input type="radio" checked={queryMode === "jq"} value="jq" />jq</label>
        <label><input type="radio" checked={queryMode === "jmespath"} value="jmespath" />JMESPath</label>
        <label><input type="radio" checked={queryMode === "jsonpath"} value="jsonpath" />JSONPath</label>
      </div>
      <JsonMirrorArea
        value={query}
        onChange={(value, viewUpdate) => {
          setQuery(value);
          queryInput('query', value);
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
