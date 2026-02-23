// import logo from './logo.svg';
import './App.css';
// import {Routes,Route,Link} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from "./components/Hero/Hero";
// import Card from "./components/Card/Card";
import Section from "./components/Section/Section";

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes> */}
      <Navbar />
      <Hero/>
      <Section
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
      />

      <Section
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
      />
    </div>
  );
}

export default App;
