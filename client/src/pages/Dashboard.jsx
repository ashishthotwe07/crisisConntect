import React, { useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelector, logoutUser } from "../redux/reducers/authSlice";
import {
  FiMenu,
  FiHome,
  FiLayout,
  FiInbox,
  FiUsers,
  FiShoppingBag,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector(AuthSelector);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignout = async () => {
    await dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const dashboardHeight = `calc(100vh - 70px)`;

  return (
    <Layout>
      <>
        <button
          onClick={toggleSidebar}
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <FiMenu className="w-6 h-6" />
        </button>

        <aside
          id="default-sidebar"
          className={`fixed top-15 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dashboard/profile"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Profile</span>
                </a>
              </li>
              {user.role === "customer" && (
                <li>
                  <a
                    href="/dashboard/products"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Products
                    </span>
                  </a>
                </li>
              )}
              {user.role === "service_provider" && (
                <li>
                  <a
                    href="/dashboard/service"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FiUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Service Requests
                    </span>
                  </a>
                </li>
              )}
              <li>
                <button
                  onClick={handleSignout}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiLogIn className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sign out
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {/* Main Content Here */}
            <Outlet />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Dashboard;
