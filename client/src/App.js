import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Services from "./pages/Services";
import AdminRoute from "./components/AdminRoutes";
import About from "./pages/About";
import ReportEmergency from "./pages/ReportEmergency";
import Notification from "./pages/Notification";

export default function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/register", element: <SignUp /> },
    { path: "/login", element: <SignIn /> },
    { path: "/about", element: <About /> },
    { path: "/report-emergency", element: <ReportEmergency /> },
    { path: "/notifications", element: <Notification /> },

    {
      path: "/dashboard",
      element: <ProtectedRoute>{<Dashboard />}</ProtectedRoute>,
      children: [
        { path: "profile", element: <Profile /> },
        { path: "products", element: <Products /> },
        { path: "services", element:<AdminRoute><Services /></AdminRoute>  },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer />
    </div>
  );
}
