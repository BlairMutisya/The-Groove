import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import About from "./components/client/About";
import SignUp from "./components/client/SignUp";
import SignIn from "./components/client/SignIn";
import Agents from './components/client/Agents';
import Contact from './components/client/Contact';
import SpaceDetails from './components/client/SpaceDetails';
import LandingPage from './components/client/LandingPage';
import SpaceList from './components/client/SpaceList';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ManageUsers from './components/admin/ManageUsers';
import ViewSpace from './components/admin/ViewSpace';
import AddSpace from './components/admin/AddSpace';


const PUBLISHABLE_KEY ="pk_test_dG9sZXJhbnQtZG9nZmlzaC0xMy5jbGVyay5hY2NvdW50cy5kZXYk";
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
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/manage-users",
    element: <ManageUsers/>
  },
  {
    path: "/view-space",
    element: <ViewSpace/>
  },  {
    path: "/add-space",
    element: <AddSpace/>
  },
]);
// <BrowserRouter>
// <Routes>
//   <Route path="/" element={<Navigate to="/manage-users" />} />
//   <Route path="/manage-users" element={<ManageUsers />} />
//   <Route path="/view-space" element={<ViewSpace />} />
//   <Route path="/add-space" element={<AddSpace />} />
// </Routes>
// </BrowserRouter>

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);