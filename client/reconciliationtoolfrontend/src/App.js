import React from "react";
import Upload from "./uploadfile"; 
import "./index.css"; 

function App() {
  return (
    <div className="app-container">
      <h1 className="title">MINI RECONCILIATION TOOL</h1>
      <br/>
      <p className="subtitle">
        Hello, it's reconciliation time. Upload your two documents and wait for the
        results.
      </p>
      <br/>

      <Upload /> 
    </div>
  );
}

export default App;