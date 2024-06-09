import Layout from '@/components/layouts/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { Column } from 'react-table';
import Link from 'next/link';
import AdminNav from '@/components/AdminNav';
import WithAuth from '@/components/WithAuth';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '@/utils/constants';
import { Pencil, Trash } from '@phosphor-icons/react';

const AdminDashboard = () => {
  const deleteRecord = async (id: any) => {
    try {
      await axios.delete(`${BASE_URL}/api/city/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Record deleted successfully');
      const updatedData = data.filter((record) => record.id !== id);
      setData([...updatedData]);
    } catch (error) {
      toast.error('Error deleting record');
    }
  };

  const columns: Column[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Update',
      Cell: ({ row: { original } }) => (
        <Link href={`/admin-dashboard/cities/${original.id}/update`}>
          <Pencil className='bg-blue-100 hover:bg-blue-200 p-1 text-2xl rounded-md text-blue-600 hover:text-blue-800' />
        </Link>
      ),
    },
    {
      Header: 'Delete',
      Cell: ({ row: { original } }) => (
        <button onClick={() => deleteRecord(original.id)}>
          <Trash className='bg-red-100 hover:bg-red-200 p-1 text-2xl rounded-md text-red-600 hover:text-red-800' />
        </button>
      ),
    },
  ];
  const token = Cookies.get('token');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/city/getall`, {
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
        <h1 className='text-4xl font-bold text-gray-800'>Cities</h1>
        <Link
          href='/admin-dashboard/cities/add'
          className='bg-blue-100 hover:bg-blue-200 p-2 py-1 rounded-md text-sm text-blue-600 hover:text-blue-800'
        >
          Add New Record
        </Link>{' '}
      </div>
      {isLoading ? <p>Loading data...</p> : <Table columns={columns} data={data} />}
    </Layout>
  );
};
export default WithAuth(AdminDashboard, ['Admin']);
