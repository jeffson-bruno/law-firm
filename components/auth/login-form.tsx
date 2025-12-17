"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { auth, clearMeCache, getMeCached } from "@/lib/api"

type UserRole = "recepcao" | "advogado" | "admin"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // limpa cache do /me se existir
      clearMeCache?.()

      // login real (Sanctum Bearer)
      await auth.login({
        username,
        password,
        device_name: "next-web",
      })

      // pega user + flags
      const me = await getMeCached(true)
      const role = me?.user?.role as UserRole | undefined

      if (!role) {
        throw new Error("Não foi possível identificar o perfil do usuário.")
      }

      // opcional: guardar infos úteis pro front (sidebar)
      localStorage.setItem("userRole", role)
      localStorage.setItem("userUsername", me.user.username)
      localStorage.setItem("flags", JSON.stringify(me.flags || {}))

      document.cookie = `auth_token=${localStorage.getItem("auth_token")}; path=/; SameSite=Lax`;
      document.cookie = `userRole=${role}; path=/; SameSite=Lax`;

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao sistema!",
      })

      router.push(`/${role}`)
    } catch (err: any) {
      toast({
        title: "Erro no login",
        description: err?.message || "Não foi possível autenticar.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <CardTitle>Entrar no Sistema</CardTitle>
        <CardDescription>Acesse sua conta para gerenciar casos e processos</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              placeholder="ex: admin01"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={5}
              maxLength={10}
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={16}
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
