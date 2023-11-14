import Table from '@/components/Table';
import WithAuth from '@/components/WithAuth';
import Layout from '@/components/layouts/Layout';
import { Column } from 'react-table';
import React from 'react';

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
    Header: 'Email',
    accessor: 'email',
  },
];

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: '2@test.com',
  },
];

const DashboardPage = () => {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Table columns={columns} data={data} />
    </Layout>
  );
};

export default WithAuth(DashboardPage, ['HrManager']);
