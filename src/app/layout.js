// src/app/layout.js
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// 字體設定 (無變動)
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSansTC = Noto_Sans_TC({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-noto-sans-tc'
});

export const metadata = {
    title: "桃園公車站圖片展覽",
    description: "桃園公車站圖片展覽",
};

export default function RootLayout({ children }) {
    return (
        // 核心變更：添加 className="dark" 來啟用深色模式
        <html lang="zh-Hant" className="dark">
        <body className={`${inter.variable} ${notoSansTC.variable}`}>
        <div className="min-h-screen flex flex-col">
            {/* 深色模式下的頁首 */}
            <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <nav className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-wide">
                        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                            {metadata.title}
                        </Link>
                    </h1>
                </nav>
            </header>

            <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
                {children}
            </main>

            {/* 深色模式下的頁腳 */}
            <footer className="mt-16 py-8 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                <p>&copy; {new Date().getFullYear()} 桃園公車站 | CC BY-NC 4.0</p>
            </footer>
        </div>
        </body>
        </html>
    );
}