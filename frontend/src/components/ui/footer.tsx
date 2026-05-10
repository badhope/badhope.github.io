import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted-light dark:bg-muted-dark py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <span>Built with</span>
            <span className="text-red-500">❤️</span>
            <span>by BadHope</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-text-secondary hover:text-primary">
              首页
            </Link>
            <Link href="/tools" className="text-text-secondary hover:text-primary">
              工具
            </Link>
            <Link href="/resources" className="text-text-secondary hover:text-primary">
              资源
            </Link>
            <Link href="/ai" className="text-text-secondary hover:text-primary">
              AI
            </Link>
          </nav>

          <div className="text-text-muted text-xs">
            © 2024 BadHope. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
