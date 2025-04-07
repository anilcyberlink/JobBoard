// app/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const redirectToFrontend = () => {
    router.push('/frontend');
  };

  const redirectToBackend = () => {
    router.push('/backend');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Choose a Page</h1>
      <button
        onClick={redirectToFrontend}
        style={{ padding: '10px 20px', margin: '20px', cursor: 'pointer' }}
      >
        Frontend
      </button>
      <button
        onClick={redirectToBackend}
        style={{ padding: '10px 20px', margin: '20px', cursor: 'pointer' }}
      >
        Backend
      </button>
    </div>
  );
}
