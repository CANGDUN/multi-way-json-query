import React, { useState } from 'react';
import * as jq from 'jq-web';
import jmespath from 'jmespath';
import * as jp from 'jsonpath';

import HeadNav from './components/HeadNav';
import JsonMirrorArea from './components/JsonMirrorArea';
import { initProp } from './init/initProp';

import './App.css';

export default function App(props) {
  const [input, setInput] = useState(initProp.input);
  const [query, setQuery] = useState(initProp.query);
  const [queryMode, setQueryMode] = useState('jmespath');
  const [result, setResult] = useState(initProp.result);

  const handleQueryMode = (event) => {
    setQueryMode(event.target.value);
    queryInput('mode', event.target.value);
  };

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
          throw new Error('Invalid Query Mode')
      }
    } catch (error) {
      queryResult = error.toString();
    }
    setResult(queryResult);
  }

  return (
    <div>
      <HeadNav />
      <div className="mx-3 md:mx-12 md:mt-2 pt-20 md:pt-0">
        <div className="grid grid-flow-row-dense md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl mb-2">Input</h2>
            <JsonMirrorArea
              id="jsonInput"
              value={input}
              onChange={(value, viewUpdate) => {
                setInput(value);
                queryInput('input', value);
              }}
              height="70vh"
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl mb-2">Query</h2>
            <div className="mb-2">
              <span className="pr-2">By:</span>
              <input className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 mr-1" type="radio" onChange={handleQueryMode} checked={queryMode === "jq"} value="jq" id="queryByJq" />
              <label className="mr-2" htmlFor="queryByJq">jq</label>
              <input className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 mr-1" type="radio" onChange={handleQueryMode} checked={queryMode === "jmespath"} value="jmespath" id="queryByJmespath" />
              <label className="mr-2" htmlFor="queryByJmespath">JMESPath</label>
              <input className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 mr-1" type="radio" onChange={handleQueryMode} checked={queryMode === "jsonpath"} value="jsonpath" id="queryByJsonpath" />
              <label className="mr-2" htmlFor="queryByJsonpath">JSONPath</label>
            </div>
            <JsonMirrorArea
              id="queryInput"
              value={query}
              onChange={(value, viewUpdate) => {
                setQuery(value);
                queryInput('query', value);
              }}
            />
          </div>
          <div>
            <h2 className="text-xl mb-2">Query Result</h2>
            <JsonMirrorArea
              id="queryResult"
              value={result}
              editable={false}
              readOnly={true}
              onChange={(value, viewUpdate) => {
                setResult(value);
              }}
              height="70vh"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
