export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001"

type LoginResponse = {
  user: {
    id: number
    name: string
    email: string
    role: "admin" | "advogado" | "assistente" | "atendente"
  }
  token: string
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || "Erro ao fazer login")
  }

  return res.json()
}
