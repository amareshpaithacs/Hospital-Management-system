import { createHashRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import UserManagement from "../pages/UserManagement.jsx";
import BranchManagement from "../pages/BranchManagement.jsx";
import Placeholder from "../pages/Placeholder.jsx";
import ProtectedRoute from "../config-service/ProtectedRoute.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute allowedRoles={["Administrator"]} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/users",
        element: <UserManagement />,
      },
      {
        path: "/admin/branches",
        element: <BranchManagement />,
      },
      {
        path: "/admin/analytics",
        element: (
          <Placeholder
            title="Analytics Dashboard"
            description="This module is currently under development and will be available in an upcoming release."
            useAdminLayout
          />
        ),
      },
      {
        path: "/admin/audit",
        element: (
          <Placeholder
            title="Audit Logs"
            description="Administrative activity tracking will be available in an upcoming release."
            useAdminLayout
          />
        ),
      },
      {
        path: "/admin/settings",
        element: (
          <Placeholder
            title="System Settings"
            description="System configuration tools are currently under development."
            useAdminLayout
          />
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />, // Any authenticated user
    children: [
      {
        path: "/placeholder",
        element: <Placeholder />,
      },
    ],
  },
  {
    path: "*",
    element: <Placeholder />,
  }
]);

export default router;
