import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const SampleComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://185.104.189.135:5280/api/accountidentity/sample', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}</div>;
};

export default SampleComponent;
