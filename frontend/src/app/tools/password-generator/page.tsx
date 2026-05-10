"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw } from "lucide-react";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSpecial) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { label: "弱", color: "bg-red-500", width: "33%" };
    if (score <= 3) return { label: "中等", color: "bg-yellow-500", width: "66%" };
    return { label: "强", color: "bg-green-500", width: "100%" };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-4xl">🔐</span>
            <div>
              <CardTitle className="text-2xl">密码生成器</CardTitle>
              <CardDescription>
                生成安全的随机密码，保护你的账户安全
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <div className="p-4 bg-muted-light dark:bg-muted-dark rounded-lg mb-4">
              <code className="text-lg break-all">{password || "点击下方按钮生成密码"}</code>
            </div>
            {password && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-secondary">密码强度</span>
                  <span className={getStrength().color.replace("bg-", "text-")}>
                    {getStrength().label}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrength().color} transition-all`}
                    style={{ width: getStrength().width }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                密码长度: {length}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">包含数字</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSpecial}
                  onChange={(e) => setIncludeSpecial(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">包含特殊字符</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={generatePassword} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              重新生成
            </Button>
            <Button variant="outline" onClick={copyToClipboard} disabled={!password}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  复制
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
