import { useEffect } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminContent from "../components/admin/AdminContent";
import "../styles/admin.css";

function AdminDashboard() {
  useEffect(() => {
    document.title = "Dashboard — MediCare HIS";
  }, []);

  return (
    <AdminLayout>
      <AdminContent />
    </AdminLayout>
  );
}

export default AdminDashboard;
