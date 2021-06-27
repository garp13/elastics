import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import './styles/styles.scss';
import {SearchHaystack} from "./components/search/search-haystack";
function App() {
  return (
    <div className="App">
      <SearchHaystack />
    </div>
  );
}

export default App;
