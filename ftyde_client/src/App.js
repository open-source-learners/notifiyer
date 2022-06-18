import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';

global.score = [];

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
     <Route element={<Login/>} path="/login"/>
     <Route element={<Register/>} path="register"/>
     <Route element={<Quiz/>} path="/quiz/:category"/>
     <Route element={<Courses/>} path="/"/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
