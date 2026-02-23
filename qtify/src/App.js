// import logo from './logo.svg';
import './App.css';
// import {Routes,Route,Link} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes> */}
      <Navbar />
      <Hero/>
    </div>
  );
}

export default App;
