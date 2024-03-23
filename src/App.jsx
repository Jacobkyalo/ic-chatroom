import { Suspense, lazy } from "react";
import AuthContextProvider from "./contexts/auth-context";
import { ToastContainer } from "react-toastify";
const OutletComponent = lazy(() => import("./components/outlet"));
import Loading from "./components/loading";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthContextProvider>
      <div className="relative px-4 md:px-0">
        <ToastContainer />
        <Suspense fallback={<Loading />}>
          <OutletComponent />
        </Suspense>
      </div>
    </AuthContextProvider>
  );
}
