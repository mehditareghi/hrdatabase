import Link from 'next/link';

const AdminNav = () => {
  return (
    <nav className=''>
      <div className='max-w-7xl'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='md:block'>
              <div className='flex items-baseline space-x-4'>
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
                <Link
                  href='/admin-dashboard/industries'
                  className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                >
                  Industries
                </Link>
                <Link
                  href='/admin-dashboard/competencies'
                  className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                >
                  Competencies
                </Link>
                <Link
                  href='/admin-dashboard/educationfields'
                  className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                >
                  Education Fields
                </Link>
                <Link
                  href='/admin-dashboard/languages'
                  className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                >
                  Languages
                </Link>
                <Link
                  href='/admin-dashboard/jobs'
                  className='text-blue-500 border border-blue-500 hover:bg-blue-100 px-2 py-1 rounded-md text-sm font-medium'
                >
                  Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav