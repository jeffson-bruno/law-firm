"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/lib/api"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  isRead: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Prazo Crítico",
    description: "Processo 1234/2024 vence em 24 horas",
    time: "2h atrás",
    isRead: false,
  },
  {
    id: "2",
    title: "Tarefa Atualizada",
    description: "Dr. Silva atualizou a petição inicial",
    time: "4h atrás",
    isRead: false,
  },
  {
    id: "3",
    title: "Novo Cliente",
    description: "Cliente João Santos foi cadastrado",
    time: "1d atrás",
    isRead: true,
  },
]

export function AppHeader() {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await auth.me()
        setUsername(res.user?.username || "")
      } catch {
        setUsername("")
      }
    })()
  }, [])

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        {/* ✅ Bem-vindo no lugar certo (Header) */}
        <div>
          <h1 className="text-xl font-semibold">
            Bem-Vindo{username ? `, ${username}` : ""}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          !notification.isRead && "text-primary"
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
