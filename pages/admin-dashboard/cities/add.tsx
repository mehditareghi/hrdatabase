import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '@/components/layouts/Layout';
import Cookies from 'js-cookie';

type FormData = {
  name: string;
};

const AddCity = () => {
  const token = Cookies.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('http://185.104.189.135:5280/api/city/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset()
      alert('City added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='w-full max-w-xs'>
          <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                {...register('name', { required: true })}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                type='text'
                placeholder='City name'
              />
              {errors.name && <p className='text-red-500 text-xs italic'>Please fill out this field.</p>}
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add City
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddCity;
