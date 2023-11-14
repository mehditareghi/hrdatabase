import Layout from '@/components/layouts/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { addHookAliases } from 'next/dist/server/require-hook';

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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const addCity = async () => {
    try {
      await axios.post(
        'http://185.104.189.135:5280/api/city/add',
        {
          name: 'Tehran',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

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
      <button onClick={addCity}>Add City</button>
      {isLoading ? <p>Loading data...</p> : <Table columns={columns} data={data} />}
    </Layout>
  );
};

export default AdminDashboard;
