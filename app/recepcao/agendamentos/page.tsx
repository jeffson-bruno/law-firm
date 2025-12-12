"use client"

import { useState } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgendamentosPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week">("week")

  const appointments = [
    { id: 1, time: "09:00", client: "Maria Silva", lawyer: "Dr. Silva", type: "Consulta" },
    { id: 2, time: "11:00", client: "João Santos", lawyer: "Dra. Santos", type: "Audiência" },
    { id: 3, time: "14:00", client: "Ana Costa", lawyer: "Dr. Costa", type: "Reunião" },
    { id: 4, time: "16:00", client: "Pedro Oliveira", lawyer: "Dr. Silva", type: "Consulta" },
  ]

  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const hours = Array.from({ length: 10 }, (_, i) => i + 8) // 8:00 to 17:00

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Agendamentos</h1>
          <p className="text-muted-foreground text-pretty">Gerencie consultas e compromissos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
              <DialogDescription>Agende uma nova consulta ou reunião</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Input id="client" placeholder="Nome do cliente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lawyer">Advogado</Label>
                <Select>
                  <SelectTrigger id="lawyer">
                    <SelectValue placeholder="Selecione o advogado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silva">Dr. Silva</SelectItem>
                    <SelectItem value="santos">Dra. Santos</SelectItem>
                    <SelectItem value="costa">Dr. Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Tipo de agendamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="audiencia">Audiência</SelectItem>
                    <SelectItem value="reuniao">Reunião</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit">Agendar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Calendário de Agendamentos</CardTitle>
              <CardDescription>
                {currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setView(view === "month" ? "week" : "month")}>
                {view === "month" ? "Visão Semanal" : "Visão Mensal"}
              </Button>
              <div className="flex gap-1">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === "week" && (
            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-2 border-b pb-2">
                <div className="text-sm font-medium text-muted-foreground">Horário</div>
                {weekDays.slice(0, 7).map((day) => (
                  <div key={day} className="text-sm font-medium text-center">
                    {day}
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-2 min-h-16">
                    <div className="text-sm text-muted-foreground py-2">{`${hour}:00`}</div>
                    {weekDays.map((day, i) => (
                      <div key={`${day}-${hour}`} className="border rounded-md p-1 hover:bg-accent/50 cursor-pointer">
                        {hour === 9 && i === 0 && (
                          <div className="bg-primary/10 border-l-2 border-primary rounded p-1 text-xs">
                            <p className="font-medium text-foreground">Maria Silva</p>
                            <p className="text-muted-foreground">Dr. Silva</p>
                          </div>
                        )}
                        {hour === 11 && i === 2 && (
                          <div className="bg-accent/10 border-l-2 border-accent rounded p-1 text-xs">
                            <p className="font-medium text-foreground">João Santos</p>
                            <p className="text-muted-foreground">Dra. Santos</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <CardDescription>Todos os agendamentos do dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                    <span className="text-2xl font-bold text-primary">{appointment.time.split(":")[0]}</span>
                    <span className="text-xs text-muted-foreground">{appointment.time.split(":")[1]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.lawyer}</p>
                  </div>
                </div>
                <Badge>{appointment.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
