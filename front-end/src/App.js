import logo from './logo.svg';
import './App.css';
import LandingPage from './components/client/LandingPage';
import Navbar from './components/client/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App;
