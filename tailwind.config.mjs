// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
    // Tailwind CSS v4 不需要 content 屬性，它會自動掃描您的專案。
    // 只需要在這裡定義主題擴展即可。
    theme: {
        extend: {
            fontFamily: {
                // 將 'sans' 預設字體設定為我們的自訂字體棧
                sans: ['var(--font-noto-sans-tc)', 'var(--font-inter)', 'sans-serif'],
            },
        },
    },
};