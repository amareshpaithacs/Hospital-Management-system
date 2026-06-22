import { createHashRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import UserManagement from "../pages/UserManagement.jsx";
import BranchManagement from "../pages/BranchManagement.jsx";
import Placeholder from "../pages/Placeholder.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "../config-service/ProtectedRoute.jsx";

const adminPlaceholderRoutes = [
  {
    path: "/admin/analytics",
    title: "Analytics Dashboard",
    description: "This module is currently under development and will be available in an upcoming release."
  },
  {
    path: "/admin/audit",
    title: "Audit Logs",
    description: "Administrative activity tracking will be available in an upcoming release."
  },
  {
    path: "/admin/settings",
    title: "System Settings",
    description: "System configuration tools are currently under development."
  }
];

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
      ...adminPlaceholderRoutes.map(({ path, title, description }) => ({
        path,
        element: <Placeholder title={title} description={description} useAdminLayout />
      }))
    ],
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/placeholder",
        element: <Placeholder />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;