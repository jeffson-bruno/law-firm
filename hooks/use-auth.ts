"use client"

import { useEffect, useState } from "react"
import { getMeCached } from "@/lib/api"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [flags, setFlags] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMeCached()
      .then((res) => {
        setUser(res.user)
        setFlags(res.flags || {})
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    user,
    flags,
    loading,
  }
}
