import Layout from '@/components/layouts/Layout';
import WithAuth from '@/components/WithAuth';

import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <Layout>
      <nav className=''>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <Link
                    href='/admin-dashboard/cities'
                    className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                  >
                    Cities
                  </Link>
                  <Link
                    href='/admin-dashboard/universities'
                    className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                  >
                    Universities
                  </Link>
                  <Link
                    href='/admin-dashboard/companies'
                    className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                  >
                    Companies
                  </Link>
                  {/* Add more links here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Layout>
  );
};

export default WithAuth(AdminDashboard, ['Admin']);
