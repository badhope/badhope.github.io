"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Copy, Check } from "lucide-react";

export default function QRGeneratorPage() {
  const [content, setContent] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(200);

  const generateQR = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const response = await fetch("/api/tools/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, size }),
      });
      const data = await response.json();
      setQrImage(data.image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrImage;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrImage) return;
    await navigator.clipboard.writeText(qrImage);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-4xl">📱</span>
            <div>
              <CardTitle className="text-2xl">二维码生成器</CardTitle>
              <CardDescription>
                输入任意内容，生成对应的二维码图片
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                输入内容
              </label>
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="输入网址、文字或其他内容..."
                onKeyDown={(e) => e.key === "Enter" && generateQR()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                图片大小: {size}px
              </label>
              <input
                type="range"
                min="100"
                max="400"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <Button
              onClick={generateQR}
              disabled={!content || loading}
              className="w-full"
            >
              {loading ? "生成中..." : "生成二维码"}
            </Button>
          </div>

          {qrImage && (
            <div className="mt-8 text-center">
              <div className="inline-block p-4 bg-white rounded-lg">
                <img src={qrImage} alt="QR Code" className="mx-auto" />
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={downloadQR} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  下载
                </Button>
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  复制
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
