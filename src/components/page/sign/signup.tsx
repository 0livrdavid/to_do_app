'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import HrSign from "@/components/hr_text"
import signup from "@/api/axios/users/signup";
import { SignupResponse } from "@/api/interfaces/users/signup";
import { useLoading } from '@rest-hooks/hooks';

export default function Signup(
  { 
    sign, setSign, usernameSignIn, setUsernameSignIn}: 
  { 
    sign: boolean,
    setSign: (sign: boolean) => void,
    usernameSignIn: string,
    setUsernameSignIn: (usernameSignIn: string) => void,
  }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [handleSignup, isLoadingSignup] = useLoading(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }
  
    try {
      const result: SignupResponse = await signup({
        name: name,
        username: username,
        email: email,
        password: password,
      });
  
      if (result && result.success) {
        setUsernameSignIn(username);
      } else {
        setError(result.msg);
      }
    } catch (error) {
      setError(`Um erro ocorreu durante o cadastro: ${error}`);
    }

    setSign(true);
  })

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Criar uma Conta</h1>
        <p className="text-gray-500 dark:text-gray-400">Entre com suas informações para começar.</p>
      </div>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg transition-all duration-500 ease-in-out dark:bg-gray-950">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="johndoe" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="example@email.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar Senha</Label>
          <Input id="confirm-password" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button className="w-full">
          {isLoadingSignup ? 'Criando...' : 'Criar Conta'}
        </Button>
        <HrSign text="Já possui uma conta?" />
        <Button onClick={() => setSign(true)} className="w-full" variant="outline">
          Entrar
        </Button>
      </form>
      </div>
    </div>
  )
}
