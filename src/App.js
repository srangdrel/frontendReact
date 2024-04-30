import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Trainee from './components/Trainee';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes without AppBar */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Trainee route with AppBar */}
          <Route path="/admin" element={
            <div>
              <Appbar />  {/* Render AppBar here */}
              <Trainee /> {/* Render Trainee component */}
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
