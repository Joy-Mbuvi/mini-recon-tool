import React from "react";
import Upload from "./uploadfile"; 
import "./index.css"; 

function App() {
  return (
    <div className="app-container">
      <h1 className="title">MINI RECONCILIATION TOOL</h1>
      <br/>
      <p className="subtitle">
        Ready to Match Those Transactions? Upload Your CSV Files 
      </p>
      <br/>

      <Upload /> 
    </div>
  );
}

export default App;