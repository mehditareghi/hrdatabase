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

const AdminDashboard = () => {
  const deleteRecord = async (id: any) => {
    try {
      await axios.delete(`${BASE_URL}/api/educationfield/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // replace with your API endpoint
      toast.success('Record deleted successfully');
      // update the table data
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
        <Link href={`/admin-dashboard/educationfields/${original.id}/update`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-blue-500 hover:text-blue-700'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-2-9-9-9-9 9 2 9z' />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 11a4 4 0 11-8 0 4 4 0 018 0zm-3 0a1 1 0 11-2 0 1 1 0 012 0z'
            />
          </svg>
        </Link>
      ),
    },
    {
      Header: 'Delete',
      Cell: ({ row: { original } }) => (
        <button onClick={() => deleteRecord(original.id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-red-500 hover:text-red-700'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
          </svg>
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
        const response = await axios.get(`${BASE_URL}/api/educationfield/getall`, {
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
        <h1 className='text-4xl font-bold text-gray-800'>Education Fields</h1>
        <Link
          href='/admin-dashboard/educationfields/add'
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
