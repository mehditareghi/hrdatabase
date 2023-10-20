import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Layout from '@/components/layouts/Layout';

export default function Home() {
  const [message, setMessage] = useState('');

  const token = Cookies.get('token');
  useEffect(() => {

    if (token) {
      const decodedToken = jwt.decode(token) as JwtPayload;
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
