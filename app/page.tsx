import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-balance text-foreground mb-2">Sistema Jurídico</h1>
          <p className="text-muted-foreground text-pretty">Gestão completa para escritórios de advocacia</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
