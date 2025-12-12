"use client"

import type React from "react"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function AddClientDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Cliente cadastrado",
      description: "O cliente foi cadastrado com sucesso no sistema.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
          <DialogDescription>Preencha os dados do cliente para cadastro no sistema</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input id="name" placeholder="João Silva Santos" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input id="cpf" placeholder="000.000.000-00" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="joao@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone1">Telefone 1 *</Label>
              <Input id="phone1" placeholder="(11) 98888-8888" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone2">Telefone 2</Label>
              <Input id="phone2" placeholder="(11) 3333-3333" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input id="city" placeholder="São Paulo" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caseType">Tipo de Caso *</Label>
            <Select required>
              <SelectTrigger id="caseType">
                <SelectValue placeholder="Selecione o tipo de caso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="criminal">Criminal</SelectItem>
                <SelectItem value="trabalhista">Trabalhista</SelectItem>
                <SelectItem value="familia">Família</SelectItem>
                <SelectItem value="tributario">Tributário</SelectItem>
                <SelectItem value="empresarial">Empresarial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caseDetails">Detalhes Iniciais do Caso *</Label>
            <Textarea
              id="caseDetails"
              placeholder="Descreva brevemente o caso do cliente..."
              className="min-h-24"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações da Recepção</Label>
            <Textarea id="notes" placeholder="Anotações adicionais sobre o atendimento..." className="min-h-20" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Cliente</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
