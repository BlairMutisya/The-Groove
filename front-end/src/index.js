import React from "react";
import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import About from "./components/client/About";
import SignUp from "./components/client/SignUp";
import SignIn from "./components/client/SignIn";
import Agents from "./components/client/Agents";
import Contact from "./components/client/Contact";
import SpaceDetails from "./components/client/SpaceDetails";
import LandingPage from "./components/client/LandingPage";
import SpaceList from "./components/client/SpaceList";
import Navbar from "./components/client/Navbar";

// const PUBLISHABLE_KEY =
//   "pk_test_ZmFpci1sZW1taW5nLTc1LmNsZXJrLmFjY291bnRzLmRldiQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <LandingPage />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <Navbar />
        <About />
      </div>
    ),
  },
  {
    path: "/spacelist",
    element: (
      <div>
        <Navbar />
        <SpaceList />
      </div>
    ),
  },
  {
    path: "/agents",
    element: (
      <div>
        <Navbar />
        <Agents />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div>
        <Navbar />
        <Contact />
      </div>
    ),
  },
  {
    path: "/spacedetails/:id",
    element: (
      <div>
        {/* <Navbar /> */}
        <SpaceDetails />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Navbar />
        <SignUp />
      </div>
    ),
  },
  {
    path: "/signin",
    element: (
      <div>
        <Navbar />
        <SignIn />
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
    <RouterProvider router={router} />
    {/* </ClerkProvider> */}
  </React.StrictMode>
);
