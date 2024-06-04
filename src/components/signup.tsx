import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import HrSign from "@/components/hr_text"

interface SignProps {
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ setSign }: SignProps) {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Criar uma Conta</h1>
        <p className="text-gray-500 dark:text-gray-400">Entre com suas informações para começar.</p>
      </div>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg transition-all duration-500 ease-in-out dark:bg-gray-950">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="johndoe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="example@email.com" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" required type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar Senha</Label>
          <Input id="confirm-password" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Criar Conta
        </Button>
        <HrSign text="Já possui uma conta?" />
        <Button onClick={() => setSign(true)} className="w-full" variant="outline" type="submit">
          Entrar
        </Button>
      </form>
      </div>
    </div>
  )
}
