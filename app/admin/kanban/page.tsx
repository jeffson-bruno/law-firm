"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Clock, User, MoreVertical, Bell } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

type Task = {
  id: string
  title: string
  description: string
  deadline: string
  responsible: string
  priority: "high" | "medium" | "low"
  processNumber?: string
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

export default function AdminKanbanPage() {
  const { toast } = useToast()
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null)

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "A Fazer",
      tasks: [
        {
          id: "1",
          title: "Revisar Petição Inicial",
          description: "Revisar e ajustar petição do processo 1234/2024",
          deadline: "20/12/2024",
          responsible: "Dr. Silva",
          priority: "high",
          processNumber: "1234/2024",
        },
        {
          id: "2",
          title: "Preparar Documentos",
          description: "Reunir documentos necessários para audiência",
          deadline: "22/12/2024",
          responsible: "Dr. Silva",
          priority: "medium",
          processNumber: "5678/2024",
        },
      ],
    },
    {
      id: "progress",
      title: "Em Andamento",
      tasks: [
        {
          id: "3",
          title: "Elaborar Contestação",
          description: "Contestação do processo trabalhista",
          deadline: "Hoje",
          responsible: "Dra. Santos",
          priority: "high",
          processNumber: "9012/2024",
        },
      ],
    },
    {
      id: "done",
      title: "Concluído",
      tasks: [
        {
          id: "4",
          title: "Protocolar Recurso",
          description: "Recurso protocolado com sucesso",
          deadline: "18/12/2024",
          responsible: "Dr. Costa",
          priority: "low",
          processNumber: "3456/2024",
        },
      ],
    },
  ])

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task)
    setDraggedFrom(columnId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask || !draggedFrom) return

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }))

      const sourceColumn = newColumns.find((col) => col.id === draggedFrom)
      const targetColumn = newColumns.find((col) => col.id === targetColumnId)

      if (sourceColumn && targetColumn) {
        sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== draggedTask.id)
        targetColumn.tasks.push(draggedTask)

        toast({
          title: "Tarefa movida",
          description: `Tarefa movida para "${targetColumn.title}"`,
        })
      }

      return newColumns
    })

    setDraggedTask(null)
    setDraggedFrom(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-destructive bg-destructive/5"
      case "medium":
        return "border-warning bg-warning/5"
      case "low":
        return "border-muted bg-muted/5"
      default:
        return ""
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gestão de Tarefas - Kanban</h1>
          <p className="text-muted-foreground text-pretty">Visão completa de todas as tarefas da equipe</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
              <DialogDescription>Crie uma nova tarefa e atribua a um advogado</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Título da Tarefa</Label>
                <Input id="taskTitle" placeholder="Ex: Revisar petição inicial" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskDesc">Descrição</Label>
                <Textarea id="taskDesc" placeholder="Descreva os detalhes da tarefa..." className="min-h-20" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taskDeadline">Prazo</Label>
                  <Input id="taskDeadline" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskPriority">Prioridade</Label>
                  <Select>
                    <SelectTrigger id="taskPriority">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskResponsible">Advogado Responsável</Label>
                <Select>
                  <SelectTrigger id="taskResponsible">
                    <SelectValue placeholder="Selecione o advogado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silva">Dr. Silva</SelectItem>
                    <SelectItem value="santos">Dra. Santos</SelectItem>
                    <SelectItem value="costa">Dr. Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskProcess">Número do Processo (opcional)</Label>
                <Input id="taskProcess" placeholder="0000/2024" />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit">Criar Tarefa</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Sistema de Notificações Ativo</p>
              <p className="text-xs text-muted-foreground">
                Todos os advogados serão notificados sobre atualizações nas tarefas atribuídas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Card
            key={column.id}
            className="flex flex-col"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>{column.title}</span>
                <Badge variant="secondary">{column.tasks.length}</Badge>
              </CardTitle>
              <CardDescription>
                {column.id === "todo" && "Tarefas aguardando início"}
                {column.id === "progress" && "Tarefas em execução"}
                {column.id === "done" && "Tarefas finalizadas"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {column.tasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <p>Nenhuma tarefa</p>
                  <p className="text-xs mt-1">Arraste tarefas para cá</p>
                </div>
              ) : (
                column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className={`border-l-4 p-4 rounded-r-lg cursor-move hover:shadow-md transition-all ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground pr-2">{task.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Reatribuir</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                    {task.processNumber && (
                      <Badge variant="outline" className="mb-2 text-xs">
                        Processo: {task.processNumber}
                      </Badge>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{task.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{task.responsible}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral da Equipe</CardTitle>
          <CardDescription>Distribuição de tarefas entre advogados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Dr. Silva", tasks: 5, completed: 12 },
              { name: "Dra. Santos", tasks: 3, completed: 8 },
              { name: "Dr. Costa", tasks: 2, completed: 6 },
            ].map((lawyer) => (
              <div key={lawyer.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{lawyer.name}</p>
                    <p className="text-sm text-muted-foreground">{lawyer.completed} tarefas concluídas</p>
                  </div>
                </div>
                <Badge variant="secondary">{lawyer.tasks} ativas</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
