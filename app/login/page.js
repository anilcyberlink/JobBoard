'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs'; // Import bcryptjs
import { prisma } from '@prisma/client'; // Import Prisma client

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectToRegister = () => {
    router.push('/register');
  };
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // If user not found or password doesn't match, show error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        setError('Invalid credentials');
        return;
      }

      // Set authentication cookie
      document.cookie = 'auth=true; path=/';
      router.push('/backend'); // Redirect to the backend page
    } catch (error) {
      setError('Error logging in. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px' }}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px' }}
      /><br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <p>
        Do not have an account?{" "}
        <span
          onClick={redirectToRegister}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register
        </span>
      </p>
    </div>
  );
}
