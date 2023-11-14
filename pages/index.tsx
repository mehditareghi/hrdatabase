import Layout from '@/components/layouts/Layout';

export default function Home() {

  return (
    <Layout>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8'>Welcome to the HR ASSISTANT!</h1>
        <div className='text-gray-700 mb-8'>
          <p className='text-lg leading-7'>
            HR ASSISTANT is your all-in-one solution for HR professionals looking to streamline their data management
            and access crucial information efficiently. Our service empowers HR experts to securely store and access
            data on individuals, ensuring that key details and insights are readily available whenever and wherever
            needed.
          </p>
          <p className='text-lg leading-7 mt-4'>
            Whether you&apos;re managing employee records, contact information, or other vital HR data, our platform provides
            a user-friendly and practical interface, making your HR processes more organized and effective. Join us in
            simplifying HR management and enhancing your ability to connect with and support your people.
          </p>
        </div>
        <div className='text-gray-700 mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Our Competitive Advantages</h2>
          <ul className='list-disc pl-6 text-lg leading-7'>
            <li className='mb-2'>Efficiency and Accessibility: Easily access and manage your personal HR data.</li>
            <li className='mb-2'>Privacy and Security: Your data is kept private and secure.</li>
            <li className='mb-2'>User-Friendly Interface: Simple data entry and retrieval.</li>
            <li className='mb-2'>Customization: Tailor HR ASSISTANT to your personal HR needs.</li>
            <li className='mb-2'>Data Insights: Gain valuable career insights from your personal HR data.</li>
            <li className='mb-2'>Mobile Accessibility: Stay connected and organized on the go.</li>
            <li className='mb-2'>Customer Support: We&apos;re here to assist you in managing your HR information.</li>
            <li className='mb-2'>Affordability: Competitive pricing options to meet your budget.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}