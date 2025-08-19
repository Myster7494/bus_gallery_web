// src/app/layout.js
import { Inter, Noto_Sans_TC } from "next/font/google"; // 引入 Noto Sans TC
import "./globals.css";
import Link from "next/link";

// 設定英文字體
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
// 設定繁體中文字體
const notoSansTC = Noto_Sans_TC({
    subsets: ['latin'],
    weight: ['400', '700', '900'], // 載入需要的字重
    variable: '--font-noto-sans-tc'
});

export const metadata = {
    title: "桃園公車站",
    description: "桃園公車站",
};

export default function RootLayout({ children }) {
    return (
        <html lang="zh-Hant">
        {/* 應用字體變數 */}
        <body className={`${inter.variable} ${notoSansTC.variable} bg-gray-100 text-gray-800 font-sans`}>
        {/* --- 核心美化：全域容器 --- */}
        <div className="min-h-screen flex flex-col">
            {/* 頁首 */}
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        <Link href="/">桃園公車站</Link>
                    </h1>
                </nav>
            </header>

            {/* 主要內容區域，並設定最大寬度和左右邊距 */}
            <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
                {children}
            </main>

            {/* 頁腳 */}
            <footer className="bg-white mt-12 py-6 text-center text-gray-500 border-t">
                <p>{new Date().getFullYear()} 桃園公車站 | CC BY-NC 4.0</p>
            </footer>
        </div>
        </body>
        </html>
    );
}