import logo from './logo.svg';
import './App.css';
import Homepage from './homepage';
import Dashboard from './dashboard';
import Play from './play';
import CreateQuestion from './create';
import {BrowserRouter, Routes, Route} from "react-router-dom" 
import Register from './register';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <header className="App-header">

      </header> */}
      
        <Routes>
          <Route path='/' element={<Homepage/>}/> 
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/play' element={<Play/>}/>
          <Route path='/create' element={<CreateQuestion/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;