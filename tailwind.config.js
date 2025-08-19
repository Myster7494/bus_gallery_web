// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // 將 'sans' 預設字體設定為我們的自訂字體棧
                sans: ['var(--font-noto-sans-tc)', 'var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};