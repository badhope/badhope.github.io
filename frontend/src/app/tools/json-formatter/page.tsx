"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = (minify = false) => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const formatted = minify
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setValid(true);
    } catch (e) {
      setOutput(`错误: ${(e as Error).message}`);
      setValid(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{`{ }`}</span>
            <div>
              <CardTitle className="text-2xl">JSON 格式化工具</CardTitle>
              <CardDescription>
                JSON 格式化、压缩、验证 - 支持美化输出和压缩
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">输入 JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="粘贴 JSON 内容..."
              className="min-h-[300px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">输出结果</CardTitle>
              {valid !== null && (
                <span
                  className={`text-sm ${
                    valid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {valid ? "✓ 有效 JSON" : "✗ 无效 JSON"}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="格式化结果..."
              className="min-h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => formatJSON(false)} disabled={!input}>
          美化输出
        </Button>
        <Button onClick={() => formatJSON(true)} disabled={!input}>
          压缩
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!output}>
          <Copy className="mr-2 h-4 w-4" />
          复制
        </Button>
      </div>
    </div>
  );
}
