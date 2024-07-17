import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginPageAdmin from "./pages/LoginPageAdmin";
import DashboardLayout from "./layout/DashboardLayout";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import NewPost from "./pages/NewPost";
import Guide from "./pages/Guide";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Dashboard/Profile";
import PostCentral from "./pages/Dashboard/PostCentral";
import ChangePassword from "./pages/Dashboard/ChangePassword";
import Notification from "./pages/Dashboard/Notification";
import UserProfile from "./pages/UserProfile";
import AdminLayout from "./layout/AdminLayout";
import TagCentral from "./pages/AdminDashboard/TagCentral";
import PostStatistic from "./pages/AdminDashboard/PostStatistic";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/login-admin",
        element: <LoginPageAdmin />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "guide",
        element: <Guide />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "user-profile/:id",
        element: <UserProfile />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "notification",
            element: <Notification />,
          },
          {
            path: "your-profile",
            element: <Profile />,
          },
          {
            path: "post-central",
            element: <PostCentral />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "/admin-dashboard",
        element: <AdminLayout />,
        children: [
          {
            path: "tag-central",
            element: <TagCentral />,
          },
          {
            path: "statistic",
            element: <PostStatistic />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
