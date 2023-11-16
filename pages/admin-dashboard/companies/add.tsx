import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '@/components/layouts/Layout';
import Cookies from 'js-cookie';
import WithAuth from '@/components/WithAuth';
import AdminNav from '@/components/AdminNav';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { BASE_URL } from '@/utils/constants';

type FormData = {
  name: string;
  industryId: string;
};

const AddCompany = () => {
  const [industries, setIndustries] = useState([]);
  useEffect(() => {
    // Fetch the industries here and update the state
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/industry/getall`);
        setIndustries(response.data);
      } catch (error) {
        toast.error('Error fetching industries');
      }
    };

    fetchIndustries();
  }, []);

  const industryOptions = industries.map((industry) => ({ value: industry.id, label: industry.name }));

  const token = Cookies.get('token');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`${BASE_URL}/api/company/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      toast.success('Record added successfully.');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };
  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      setValue('industryId', selectedOption.value);
    }
  };

  return (
    <Layout>
      <AdminNav />
      <div>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Add Company</h1>
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
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='industryId'>
              Industry
            </label>
            <Select
              {...register('industryId', { required: true })}
              options={industryOptions}
              className='basic-single'
              classNamePrefix='select'
              onChange={handleSelectChange}
            />
            {errors.industryId && <p className='text-red-500 text-xs italic'>Please fill out this field.</p>}
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

export default WithAuth(AddCompany, ['Admin']);
