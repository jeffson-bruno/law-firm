"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de login será implementada aqui
    console.log("Login:", { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary">
            <Scale className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-[28px] font-semibold text-foreground font-[family-name:var(--font-poppins)]">
              Sistema de Gestão
            </CardTitle>
            <CardDescription className="text-base mt-2">Escritório de Advocacia</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-normal text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-input bg-background focus:border-ring transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-normal text-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-input bg-background focus:border-ring transition-colors"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold bg-[#2C3E50] hover:bg-[#2980B9] transition-colors font-[family-name:var(--font-poppins)]"
            >
              Entrar
            </Button>
            <div className="text-center pt-2">
              <button
                type="button"
                className="text-primary text-base underline hover:text-primary/80 transition-colors font-[family-name:var(--font-poppins)]"
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
