// src/lib/github-client.js

// --- 設定您的資料儲存庫資訊 ---
const GITHUB_OWNER = "TYBusStation";
const GITHUB_REPO = "bus_gallery_assets";
const GITHUB_BRANCH = 'master';

export const RAW_CONTENT_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

export async function getRepoFileContent(path) {
    const cdnUrl = `${RAW_CONTENT_BASE_URL}/${path}`;
    try {
        // 使用 'no-store' 確保每次都從網路獲取最新資料，避免瀏覽器快取
        const response = await fetch(cdnUrl, { cache: 'no-store' });
        if (!response.ok) {
            console.error(`檔案找不到或獲取失敗: ${cdnUrl}, 狀態: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`從 ${cdnUrl} 獲取或解析 JSON 時發生錯誤`, error);
        return null;
    }
}