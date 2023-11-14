import Layout from '@/components/layouts/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { Column } from 'react-table';
import Link from 'next/link';
import AdminNav from '@/components/AdminNav';
import WithAuth from '@/components/WithAuth';

const columns: Column[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
];

const AdminDashboard = () => {
  const token = Cookies.get('token');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://185.104.189.135:5280/api/university/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

return (
  <Layout>
    <AdminNav />
    <div className='flex justify-between items-center mb-2'>
      <h1 className='text-4xl font-bold text-gray-800'>Universities</h1>
      <Link
        href='/admin-dashboard/universities/add'
        className='bg-blue-100 hover:bg-blue-200 p-2 py-1 rounded-md text-sm text-blue-600 hover:text-blue-800'
      >
        Add New Record
      </Link>{' '}
    </div>
    {isLoading ? <p>Loading data...</p> : <Table columns={columns} data={data} />}
  </Layout>
);
}
export default WithAuth(AdminDashboard, ['Admin']);
