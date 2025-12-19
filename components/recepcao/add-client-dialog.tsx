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
import { useToast } from "@/hooks/use-toast"
import { clients } from "@/lib/api"

type Props = {
  onCreated?: () => void
}

export function AddClientDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    rg: "",
    email: "",
    phone: "",
    phone2: "",
    street: "",
    house_number: "",
    neighborhood: "",
    city: "",
    state: "",
    notes: "",
    extra_info: "",
  })

  const [submitting, setSubmitting] = useState(false)

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setSubmitting(true)

      // payload básico (ajuste os nomes conforme seu backend/migration)
      const payload = {
        name: form.name.trim(),
        cpf: form.cpf.trim(),
        rg: form.rg.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim(),
        phone2: form.phone2.trim() || null,
        street: form.street.trim(),
        house_number: form.house_number.trim(),
        neighborhood: form.neighborhood.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        notes: form.notes.trim() || null,
        extra_info: form.extra_info.trim() || null,
      }

      await clients.create(payload)

      toast({
        title: "Cliente cadastrado",
        description: "O cliente foi cadastrado com sucesso no sistema.",
      })

      setOpen(false)
      onCreated?.()

      // limpa form
      setForm({
        name: "",
        cpf: "",
        rg: "",
        email: "",
        phone: "",
        phone2: "",
        street: "",
        house_number: "",
        neighborhood: "",
        city: "",
        state: "",
        notes: "",
        extra_info: "",
      })
    } catch (err: any) {
      toast({
        title: "Erro ao cadastrar",
        description: err?.message ?? "Não foi possível cadastrar o cliente.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
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
              <Input id="name" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input id="cpf" value={form.cpf} onChange={(e) => setField("cpf", e.target.value)} required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input id="rg" value={form.rg} onChange={(e) => setField("rg", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone 1 *</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setField("phone", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone2">Telefone 2</Label>
              <Input id="phone2" value={form.phone2} onChange={(e) => setField("phone2", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="street">Rua *</Label>
              <Input id="street" value={form.street} onChange={(e) => setField("street", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="house_number">Número *</Label>
              <Input
                id="house_number"
                value={form.house_number}
                onChange={(e) => setField("house_number", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input
                id="neighborhood"
                value={form.neighborhood}
                onChange={(e) => setField("neighborhood", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="city">Cidade *</Label>
              <Input id="city" value={form.city} onChange={(e) => setField("city", e.target.value)} required />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="state">Estado *</Label>
              <Input id="state" value={form.state} onChange={(e) => setField("state", e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="extra_info">Informações Complementares</Label>
            <Textarea
              id="extra_info"
              value={form.extra_info}
              onChange={(e) => setField("extra_info", e.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Cadastrar Cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
