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
import AdminSignIn from "./components/admin/SignIn";
import AddSpace from "./components/admin/AddSpace";
import ManageUsers from "./components/admin/ManageUsers";
import ViewSpace from "./components/admin/ViewSpace";
import Dashboard from "./components/admin/Dashboard";
import PaymentForm from "./components/client/BillingAndPayment";
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
        <SignUp />
      </div>
    ),
  },
  {
    path: "/signin",
    element: (
      <div>
        <SignIn />
      </div>
    ),
  },
  {
    path: "/adminsignin",
    element: (
      <div>
        <AdminSignIn />
      </div>
    ),
  },
  {
    path: "/AddSpace",
    element: (
      <div>
        <AddSpace />
      </div>
    ),
  },
  {
    path: "/MangeUsers",
    element: (
      <div>
        <ManageUsers />
      </div>
    ),
  },
  {
    path: "/ViewSpace",
    element: (
      <div>
        <ViewSpace />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },
    {
    path: "/payment",
    element: (
      <div>
        <PaymentForm />
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
