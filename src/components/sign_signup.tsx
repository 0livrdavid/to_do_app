import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"

export default function SignSignup() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="block w-1/2 mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Crie uma Conta</h1>
          <p className="text-gray-500 dark:text-gray-400">Entre com seus dados para começar</p>
        </div>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg transition-all duration-500 ease-in-out dark:bg-gray-950 ">
          <React.Fragment key=".0">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="email@exemplo.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Crie uma Conta
            </Button>
          </React.Fragment>
        </div>
      </div>
    </div>
  )
}
