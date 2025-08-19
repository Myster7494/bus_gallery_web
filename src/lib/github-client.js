// src/lib/github-client.js

// --- 設定您的資料儲存庫資訊 ---
const GITHUB_OWNER = "Myster7494";
const GITHUB_REPO = "bus_gallery_assets";
const GITHUB_BRANCH = 'master';

export const RAW_CONTENT_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

/**
 * 獲取並解析儲存庫中的 JSON 檔案內容 (透過 Raw URL)
 * @param {string} path - JSON 檔案的路徑，例如 "pages/index.json"
 * @returns {Promise<Object|null>}
 */
export async function getRepoFileContent(path) {
    const rawUrl = `${RAW_CONTENT_BASE_URL}/${path}`;
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            console.error(`檔案找不到或獲取失敗: ${rawUrl}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(`從 ${rawUrl} 獲取或解析 JSON 時發生錯誤`, error);
        return null;
    }
}