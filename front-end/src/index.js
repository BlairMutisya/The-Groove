import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './Components/Home';
import About from './Components/About';
import Listing from './Components/Listing';
import Agents from './Components/Agents';
import Contact from './Components/Contact';
import SpaceDetails from './Components/SpaceDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, 
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/listing",
    element: <Listing />
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
