"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import HrSign from "@/components/hr_text"
import React, { useState } from "react"
import { useLoading } from '@rest-hooks/hooks';
import { setToken } from "@/api/axios/users/token"
import { SigninResponse } from "@/api/interfaces/users/signin"
import signin from "@/api/axios/users/signin"
import { useRouter } from "next/navigation";

export default function Sign({ 
    sign, setSign, usernameSignIn, 
  }: { 
    sign: boolean,
    setSign: (sign: boolean) => void,
    usernameSignIn: string,
  }) {
  const router = useRouter();
  const [username, setUsername] = useState(usernameSignIn);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [handleSignIn, isLoadingSignIn] = useLoading(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const result: SigninResponse = await signin({
      username: username,
      password: password,
    });
    
    if (result && result.success && result.data) {
      setToken(result.data.token);
      localStorage.setItem('user_id', result.data.user.id);
      localStorage.setItem('user_name', result.data.user.name);
      localStorage.setItem('user_username', result.data.user.username);
      localStorage.setItem('user_email', result.data.user.email);
      router.push('/dashboard');
    } else {
      setError(result.msg);
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="block w-1/2 mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">To-Do-App</h1>
          <p className="text-gray-500 dark:text-gray-400">Seja bem-vindo(a), entre para começar a usar.</p>
        </div>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg transition-all duration-500 ease-in-out dark:bg-gray-950 ">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" required type="text" value={username} defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button className="w-full">
              {isLoadingSignIn ? 'Carregando...' : 'Entrar'}
            </Button>
            <HrSign text="ou" />
            <Button onClick={() => setSign(false)} className="w-full" variant="outline">
              Criar uma Conta
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
