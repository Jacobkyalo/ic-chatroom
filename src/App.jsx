import { Outlet } from "react-router-dom";
import AuthContextProvider from "./contexts/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthContextProvider>
      <div className="relative px-4 md:px-0">
        <ToastContainer />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}
