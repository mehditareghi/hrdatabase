import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [menu, setMenu] = useState<JSX.Element | null>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setMenu(
        <div className='flex items-center'>
          <Link href='/login' className='text-gray-800 hover:text-gray-600 mr-4'>
            Login
          </Link>
          <Link href='/register' className='text-gray-800 hover:text-gray-600'>
            Register
          </Link>
        </div>
      );
    } else {
      setMenu(
        <div className='flex items-center'>
          <a href='#' onClick={logout} className='text-red-500 hover:text-red-700 mr-4'>
            Logout
          </a>
          <Link href='/profile' className='text-gray-800 hover:text-gray-600'>
            Profile
          </Link>
        </div>
      );
    }
  }, []); // empty dependency array

  const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='flex justify-between w-full bg-white text-gray-800 shadow-sm py-4 px-6'>
        <Link href='/' className='text-2xl font-bold text-gray-800 hover:text-gray-600'>
          My App
        </Link>
        {menu}
      </nav>
      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</main>
    </div>
  );
};

export default Layout;
