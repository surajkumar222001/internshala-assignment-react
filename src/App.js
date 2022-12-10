import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import DataTable from './components/DataTable';
import Container from "react-bootstrap/Container";
function App() {
  return (
    <div className="App w-100 border">
      <Header/>
      <Container>
      <h4 className='my-3 h4 text-dark'>Hello from test app </h4>
        <div className='handle-overflow'>
          <DataTable/>
        </div>
      </Container>
    </div>
  );
}

export default App;
