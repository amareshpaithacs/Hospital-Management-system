import AdminLayout from "../components/admin/AdminLayout";
import UserManagementContent from "../components/admin/UserManagementContent";
import "../styles/user-management.css";
import "../styles/admin.css";

export default function UserManagement() {
  return (
    <AdminLayout>
      <UserManagementContent />
    </AdminLayout>
  );
}
