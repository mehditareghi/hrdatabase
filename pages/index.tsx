import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Layout from '@/components/layouts/Layout';

export default function Home() {
  const [message, setMessage] = useState('');

  const token = Cookies.get('token');
  useEffect(() => {
    // Check if you are on the client side

    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken) {
        setMessage(`Welcome, ${decodedToken.FirstName}!`);
      } else {
        setMessage('Invalid token');
      }
    } else {
      setMessage('You are not logged in');
    }
  }, [token]); // empty dependency array

  return <Layout>{message}</Layout>;
}
