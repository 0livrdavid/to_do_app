'use client'

import Sign from "@/components/sign";
import Signup from "@/components/signup";
import { useState } from 'react';

export default function SignSignup() {
const [sign, setSign] = useState(true);

  return (
    <div>
      {sign ? <Sign setSign={setSign} /> : <Signup setSign={setSign} />}
    </div>
  );
}

