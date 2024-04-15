import './App.css';
import Home from './Components/Home'
import LogIn from './Components/LogIn'
import StudentAssociates from './Components/StudentAssociates/StudentAssociates'
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Routes location = {location} key={location.pathname} >
        <Route path='/' element={<Home />} />
        <Route path='/logIn' element={<LogIn />} />
        <Route path='/studentAssociates' element={<StudentAssociates />} />
      </Routes>
    </div>
  );
}

export default App;
