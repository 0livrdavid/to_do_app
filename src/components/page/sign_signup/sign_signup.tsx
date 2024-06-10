'use client'

import Sign from "@/components/signin";
import Signup from "@/components/signup";
import { useState, useEffect } from 'react';
import { getToken } from '@/api/axios/users/token';
import { redirect } from 'next/navigation';

export default function SignSignup() {
  const [sign, setSign] = useState(true);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    if (getToken()) {
      redirect('/dashboard');
    }
  }, []);

  return (
    <div>
      {sign ? <Sign setSign={setSign} usernameSignIn={username} /> : <Signup setSign={setSign} setUsernameSignIn={setUsername} />}
    </div>
  );
}

