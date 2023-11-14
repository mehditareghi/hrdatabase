import Layout from '@/components/layouts/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { Column } from 'react-table';
import Link from 'next/link';

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
        const response = await axios.get('http://185.104.189.135:5280/api/city/getall', {
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
      <Link href='/admin-dashboard/cities/add'>Add City</Link>
      {isLoading ? <p>Loading data...</p> : <Table columns={columns} data={data} />}
    </Layout>
  );
};

export default AdminDashboard;
