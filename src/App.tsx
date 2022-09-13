import React from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";

// Pages
import Menu from './Pages/Menu';
import DisplayInit from './Pages/DisplayInit';
import DrawInit from './Pages/DrawInit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />}/>
        <Route path="/display" element={<DisplayInit />}/>
        <Route path="/drawer" element={<DrawInit />}/>

      </Routes>
    </div>
  );
}

export default App;
