const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  register: (data: { email: string; name: string; password: string }) =>
    fetchAPI("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  
  login: (email: string, password: string) =>
    fetchAPI("/auth/login", {
      method: "POST",
      body: new URLSearchParams({ username: email, password }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  
  getMe: () => fetchAPI("/auth/me"),

  // Tools
  generateQR: (content: string, size: number) =>
    fetchAPI("/tools/qr/generate", {
      method: "POST",
      body: JSON.stringify({ content, size }),
    }),

  formatJSON: (jsonStr: string, minify: boolean) =>
    fetchAPI("/tools/json/format", {
      method: "POST",
      body: JSON.stringify({ json_str: jsonStr, minify }),
    }),

  encodeBase64: (text: string) =>
    fetchAPI("/tools/base64/encode", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),

  decodeBase64: (text: string) =>
    fetchAPI("/tools/base64/decode", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),

  testRegex: (pattern: string, testString: string) =>
    fetchAPI("/tools/regex/test", {
      method: "POST",
      body: JSON.stringify({ pattern, test_string: testString }),
    }),

  // AI
  getModels: () => fetchAPI("/ai/models"),

  chat: (model: string, messages: { role: string; content: string }[]) =>
    fetchAPI("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 2000 }),
    }),

  // Resources
  getResources: (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    return fetchAPI(`/resources/?${params.toString()}`);
  },

  getCategories: () => fetchAPI("/resources/categories"),

  // Blogs
  getBlogs: (source?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (source) params.set("source", source);
    if (limit) params.set("limit", String(limit));
    return fetchAPI(`/blogs/?${params.toString()}`);
  },
};
