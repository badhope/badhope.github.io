"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolTemplateProps {
  title: string;
  description: string;
  icon: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  onTransform: (input: string, extra?: Record<string, string>) => Promise<string>;
  extraInputs?: {
    name: string;
    label: string;
    type: "text" | "number";
    defaultValue?: string | number;
  }[];
  inputType?: "textarea" | "input";
}

export function ToolTemplate({
  title,
  description,
  icon,
  inputLabel,
  inputPlaceholder,
  outputLabel,
  onTransform,
  extraInputs = [],
  inputType = "textarea",
}: ToolTemplateProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [extraValues, setExtraValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    extraInputs.forEach((inp) => {
      defaults[inp.name] = String(inp.defaultValue ?? "");
    });
    return defaults;
  });

  const handleTransform = async () => {
    setLoading(true);
    try {
      const result = await onTransform(input, extraValues);
      setOutput(result);
    } catch (error) {
      setOutput(`错误: ${error}`);
    } finally {
      setLoading(false);
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
            <span className="text-4xl">{icon}</span>
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{inputLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            {extraInputs.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {extraInputs.map((inp) => (
                  <div key={inp.name}>
                    <label className="block text-sm font-medium mb-1 text-text-secondary">
                      {inp.label}
                    </label>
                    <Input
                      type={inp.type}
                      value={extraValues[inp.name]}
                      onChange={(e) =>
                        setExtraValues((prev) => ({
                          ...prev,
                          [inp.name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}
            {inputType === "textarea" ? (
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                className="min-h-[200px] font-mono"
              />
            ) : (
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
              />
            )}
            <Button
              onClick={handleTransform}
              disabled={loading || !input}
              className="w-full mt-4"
            >
              {loading ? "处理中..." : "转换"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{outputLabel}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="结果将显示在这里..."
              className="min-h-[200px] font-mono"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
