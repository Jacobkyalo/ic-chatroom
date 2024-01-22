import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Chatroom from "./pages/chatroom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import Profile from "./pages/profile";
import Room from "./components/room";
import MemberProfile from "./pages/member-profile";
import NotFound from "./pages/not-found";
import PrivateRoute from "./components/protected-route";
import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Chatroom />} errorElement={<NotFound />}>
          <Route
            path=":roomId"
            element={<Room />}
            errorElement={<NotFound />}
          />
        </Route>
      </Route>

      <Route
        path="auth/signup"
        element={<Signup />}
        errorElement={<NotFound />}
      />
      <Route
        path="auth/login"
        element={<Login />}
        errorElement={<NotFound />}
      />
      <Route
        path="account/forgot-password"
        element={<ForgotPassword />}
        errorElement={<NotFound />}
      />
      <Route
        path="account/reset-password"
        element={<ResetPassword />}
        errorElement={<NotFound />}
      />
      <Route element={<PrivateRoute />}>
        <Route
          path="/account/profile"
          element={<Profile />}
          errorElement={<NotFound />}
        />
      </Route>
      <Route
        path="/member/:id"
        element={<MemberProfile />}
        errorElement={<NotFound />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
