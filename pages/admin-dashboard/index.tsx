import AdminNav from '@/components/AdminNav';
import Layout from '@/components/layouts/Layout';
import WithAuth from '@/components/WithAuth';

const AdminDashboard = () => {
  return (
    <Layout>
      <AdminNav />
    </Layout>
  );
};

export default WithAuth(AdminDashboard, ['Admin']);
