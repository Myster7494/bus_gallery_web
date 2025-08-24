// src/lib/github-client.js

// --- 設定您的資料儲存庫資訊 ---
const GITHUB_OWNER = "TYBusStation";
const GITHUB_REPO = "bus_gallery_assets";
const GITHUB_BRANCH = 'master';

// --- 修改部分 START ---
// 原本的 GitHub Raw URL:
// export const RAW_CONTENT_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// 修改為使用 jsDelivr CDN URL，以獲得更快的速度並避免速率限制
// 注意：分支名稱使用 "@" 符號來指定
export const RAW_CONTENT_BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}`;
// --- 修改部分 END ---


/**
 * 獲取並解析儲存庫中的 JSON 檔案內容 (現在透過 jsDelivr CDN)
 * @param {string} path - JSON 檔案的路徑，例如 "pages/index.json"
 * @returns {Promise<Object|null>}
 */
export async function getRepoFileContent(path) {
    // 這一部分的邏輯完全不需要修改
    const cdnUrl = `${RAW_CONTENT_BASE_URL}/${path}`;
    try {
        const response = await fetch(cdnUrl);
        if (!response.ok) {
            console.error(`檔案找不到或獲取失敗: ${cdnUrl}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`從 ${cdnUrl} 獲取或解析 JSON 時發生錯誤`, error);
        return null;
    }
}