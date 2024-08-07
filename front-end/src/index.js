<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import About from './components/client/About';
import Agents from './components/client/Agents';
import Contact from './components/client/Contact';
import SpaceDetails from './components/client/SpaceDetails';
import LandingPage from './components/client/LandingPage';
import SpaceList from './components/client/SpaceList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  }, 
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/spacelist",
    element: <SpaceList />
  },
  {
    path:"/agents",
    element:<Agents />
  },
  {
    path:"/contact",
    element:<Contact />
  },
  {
    path:"/listing/details/:id",
    element:<SpaceDetails />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  
);
=======
// App.js or your main component file
import React from "react";
import About from "./components/client/About";


const App = () => {
  return (
    <div>
      {/* Other components and routes */}
      <About/>
    </div>
  );
};

export default App;
>>>>>>> 87abcd83e719253b027d9f8c2fa1e50d9018aba8
