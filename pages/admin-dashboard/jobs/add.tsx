import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '@/components/layouts/Layout';
import Cookies from 'js-cookie';
import WithAuth from '@/components/WithAuth';
import AdminNav from '@/components/AdminNav';
import { toast } from 'react-hot-toast';

type FormData = {
  name: string;
};

const AddJob = () => {
  const token = Cookies.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('http://185.104.189.135:5280/api/job/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset()
      toast.success('Record added successfully.');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

return (
  <Layout>
    <AdminNav />
    <div>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>Add Jobs</h1>
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
            placeholder='Jobs name'
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

export default WithAuth(AddJob, ['Admin']);
