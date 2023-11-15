import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '@/components/layouts/Layout';
import Cookies from 'js-cookie';
import WithAuth from '@/components/WithAuth';
import AdminNav from '@/components/AdminNav';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type FormData = {
  name: string;
};

const AdminDashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get('token');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Fetch the current data of the record
    // Replace this with your actual API call
    const fetchData = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://185.104.189.135:5280/api/company/get?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // replace with your API endpoint
        const record = response.data;

        // Set the initial values of the form fields
        setValue('name', record.name);
        // setValue for other fields...
      } catch (error) {
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, [id, setValue, token]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`http://185.104.189.135:5280/api/company/update?id=${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Record updated successfully.');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <Layout>
      <AdminNav />
      <div>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Update Company Record</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              {...register('name', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Company name'
            />
            {errors.name && <p className='text-red-500 text-xs italic'>Please fill out this field.</p>}
          </div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default WithAuth(AdminDashboard, ['Admin']);
