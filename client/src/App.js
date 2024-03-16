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
import AdminRoute from "./components/AdminRoutes";
import About from "./pages/About";
import ReportEmergency from "./pages/ReportEmergency";
import Notification from "./pages/Notification";
import Volunteer from "./pages/Volunteer";
import MyReports from "./pages/MyReports";
import VolunteerNetwork from "./pages/VolunteerNetwork";
import Error from "./pages/Error";
import EmergencyDetails from "./pages/EmergencyDetails";
import ChatBox from "./components/ChatBox";
import MessageContainer from "./pages/MessageContainer";

export default function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <Error></Error> },
    { path: "/register", element: <SignUp /> },
    { path: "/login", element: <SignIn /> },
    { path: "/about", element: <About /> },
    {
      path: "/report-emergency",
      element: (
        <ProtectedRoute>
          <ReportEmergency />
        </ProtectedRoute>
      ),
    },
    {
      path: "/notifications",
      element: (
        <ProtectedRoute>
          <Notification />
        </ProtectedRoute>
      ),
    },
    {
      path: "/volunteer/apply",
      element: (
        <ProtectedRoute>
          <Volunteer />
        </ProtectedRoute>
      ),
    },
    {
      path: "/volunteer-network",
      element: (
        <ProtectedRoute>
          <VolunteerNetwork />{" "}
        </ProtectedRoute>
      ),
    },
    {
      path: "/emergency/details/:id",
      element: (
        <ProtectedRoute>
          <EmergencyDetails></EmergencyDetails>
        </ProtectedRoute>
      ),
    },
    {
      path: "/chat",
      element: (
        <ProtectedRoute>
          <ChatBox></ChatBox>
        </ProtectedRoute>
      ),
    },

    {
      path: "/dashboard",
      element: <ProtectedRoute>{<Dashboard />}</ProtectedRoute>,
      children: [
        { path: "profile", element: <Profile /> },
        { path: "products", element: <Products /> },
        { path: "reports", element: <MyReports /> },
        { path: "messages", element: <MessageContainer /> },
        {
          path: "volunteer-dashboard",
          element: <AdminRoute></AdminRoute>,
        },
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
