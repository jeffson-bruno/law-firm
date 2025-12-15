// src/lib/api.ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) localStorage.removeItem("auth_token");
  else localStorage.setItem("auth_token", token);
}

async function request<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: any;
    token?: string | null;
  } = {}
): Promise<T> {
  const method = options.method ?? "GET";
  const token = options.token ?? getToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  // tenta ler JSON sempre
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // se der 401, apaga token (sessão expirada/revogada)
    if (res.status === 401) setToken(null);

    const message = data?.message || `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

/** Auth */
export const auth = {
  async login(payload: { username: string; password: string; device_name: string }) {
    const data = await request<{ token: string; user: any }>("/api/auth/login", {
      method: "POST",
      body: payload,
      token: null,
    });
    setToken(data.token);
    return data;
  },

  async me() {
    return request<{ user: any; flags: any }>("/api/auth/me");
  },

  async logout() {
    const data = await request<{ message: string }>("/api/auth/logout", { method: "POST" });
    setToken(null);
    return data;
  },
};

/** Clients */
export const clients = {
  async list(params?: { per_page?: number; search?: string }) {
    const qs = new URLSearchParams();
    if (params?.per_page) qs.set("per_page", String(params.per_page));
    if (params?.search) qs.set("search", params.search);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return request<any>(`/api/clients${query}`);
  },

  async create(payload: any) {
    return request<any>("/api/clients", { method: "POST", body: payload });
  },

  async show(id: number) {
    return request<any>(`/api/clients/${id}`);
  },

  async update(id: number, payload: any) {
    return request<any>(`/api/clients/${id}`, { method: "PUT", body: payload });
  },

  async destroy(id: number) {
    return request<any>(`/api/clients/${id}`, { method: "DELETE" });
  },
};

/** Dashboard */
export const dashboard = {
  async deadlinesWeek() {
    return request<any>("/api/dashboard/deadlines-week");
  },
};
