import AdminLayout from "../components/admin/AdminLayout";
import BranchManagementContent from "../components/admin/BranchManagement";
import "../styles/admin.css";
import "../styles/branch-management.css";

const BranchManagementPage = () => {
  return (
    <AdminLayout>
      <BranchManagementContent />
    </AdminLayout>
  );
};

export default BranchManagementPage;
