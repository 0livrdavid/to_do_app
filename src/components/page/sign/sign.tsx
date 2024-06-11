'use client'

import SignIn from "@/components/page/sign/signin";
import SignUp from "@/components/page/sign/signup";
import { useState } from 'react';

export default function Sign() {
  const [sign, setSign] = useState(true);
  const [username, setUsername] = useState('');

  return (
    <div>
      {sign ? <SignIn setSign={setSign} usernameSignIn={username} /> : <SignUp setSign={setSign} setUsernameSignIn={setUsername} />}
    </div>
  );
}

