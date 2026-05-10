"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);
        
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("登录失败，请检查邮箱和密码");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        router.push("/");
      } else {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "注册失败");
        }

        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);
        
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        if (!loginResponse.ok) {
          throw new Error("注册成功，请登录");
        }

        const data = await loginResponse.json();
        localStorage.setItem("token", data.access_token);
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border border-gray-200 dark:border-gray-700/50 overflow-hidden">
        <CardHeader className="text-center p-8 pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLogin ? "登录" : "注册"}
          </CardTitle>
          <CardDescription className="mt-2">
            {isLogin ? "欢迎回来！" : "创建你的账户"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  昵称
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入你的昵称"
                  required={!isLogin}
                  className="h-11"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                邮箱
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入你的邮箱"
                required
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                密码
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入你的密码"
                required
                className="h-11"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
              {loading ? "处理中..." : (isLogin ? "登录" : "注册")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isLogin ? "还没有账户？" : "已有账户？"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-orange-500 hover:text-orange-600 font-medium ml-1"
              >
                {isLogin ? "立即注册" : "立即登录"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
