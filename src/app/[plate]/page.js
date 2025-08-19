// src/app/[plate]/page.js

import { getRepoFileContent } from '@/lib/github-client';
import VehicleDetails from './VehicleDetails'; // 引入客戶端元件

// 建置階段函式保持不變
export async function generateStaticParams() {
    try {
        const mainIndex = await getRepoFileContent('pages/index.json');
        if (!mainIndex) {
            return [];
        }
        return Object.keys(mainIndex).map(plate => ({
            plate: plate,
        }));
    } catch (error) {
        console.error("在 generateStaticParams 中獲取資料失敗:", error);
        return [];
    }
}

// --- 核心修正 ---
// 1. 將頁面元件改為 async 函式
export default async function VehiclePage({ params: unresolvedParams }) {

    // 2. 核心修正：直接 await 傳入的 params 物件
    // 這是 Next.js 錯誤訊息要求的標準做法
    const params = await unresolvedParams;

    // 3. 從解析完成的 params 物件中安全地獲取 plate
    const { plate } = params;

    // 它的唯一工作就是渲染客戶端元件，並將車牌號碼作為 prop 傳遞下去
    return <VehicleDetails plate={plate} />;
}