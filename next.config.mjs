// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 輸出為靜態 HTML，這是 GitHub Pages 部署的必要條件
    output: 'export',

    // 為 GitHub Pages 設定正確的資源路徑
    // 'bus_gallery_web' 是您的網站儲存庫名稱
    assetPrefix: isProd ? '/bus_gallery_web/' : '',
    basePath: isProd ? '/bus_gallery_web' : '',

    images: {
        // 必須設定為 true，以便與 `output: 'export'` 兼容
        unoptimized: true,

        // 允許從 GitHub Raw 載入圖片
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/TYBusStation/bus_gallery_assets/master/**',
            },
        ],
    },
};

export default nextConfig;