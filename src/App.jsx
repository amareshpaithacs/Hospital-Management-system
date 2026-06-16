import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./config-service/AuthProvider.jsx";
import router from "./routes/AppRoutes.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
