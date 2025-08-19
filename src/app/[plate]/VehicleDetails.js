// src/app/[plate]/VehicleDetails.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRepoFileContent, RAW_CONTENT_BASE_URL } from '@/lib/github-client';

// --- 讀取中的骨架畫面元件 ---
function VehiclePageSkeleton() {
    return (
        <div>
            <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mb-8"></div>
            <div className="mb-12 rounded-xl bg-white p-8 shadow-lg border animate-pulse">
                <div className="h-16 w-3/4 bg-gray-400 rounded"></div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-24 bg-gray-300 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- 找不到資料的元件 ---
function NotFound({ plate }) {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - 找不到頁面</h1>
            <p className="text-xl text-gray-600">找不到車牌號碼為 {plate} 的車輛資料。</p>
            <Link href="/" className="mt-8 inline-block text-blue-600 hover:underline">
                返回總覽
            </Link>
        </div>
    );
}


export default function VehicleDetails({ plate }) {
    const [vehicle, setVehicle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!plate) return;

        async function fetchData() {
            // 確保每次重新獲取時都重置狀態
            setIsLoading(true);
            setVehicle(null);

            try {
                const allVehicles = await getRepoFileContent('pages/index.json');
                if (!allVehicles || !allVehicles[plate]) {
                    // 如果找不到，直接結束，讓 vehicle 保持 null
                    setIsLoading(false);
                    return;
                }

                const vehicleInfo = allVehicles[plate];
                const imagesData = await getRepoFileContent(`pages/${plate}/index.json`);

                let images = [];
                if (imagesData) {
                    images = Object.entries(imagesData).map(([filename, details]) => ({
                        ...details,
                        filename,
                        url: `${RAW_CONTENT_BASE_URL}/pages/${plate}/${filename}`
                    }));
                }

                setVehicle({ plate, ...vehicleInfo, images });
            } catch (e) {
                console.error("獲取資料時發生錯誤:", e);
                // 出錯時也確保 vehicle 為 null
                setVehicle(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [plate]);

    // --- 核心修正：採用最嚴格的條件渲染流程 ---

    // 1. 在資料載入完成前，一律顯示骨架畫面
    if (isLoading) {
        return <VehiclePageSkeleton />;
    }

    // 2. 資料載入完成後，如果 vehicle 仍然是 null，則顯示找不到頁面
    if (!vehicle) {
        return <NotFound plate={plate} />;
    }

    // 3. 只有在確定 isLoading 為 false 且 vehicle 物件存在時，才渲染主體內容
    return (
        <div>
            <Link
                href="/"
                className="inline-flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-800 transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                返回總覽
            </Link>

            <div className="mb-12 rounded-xl bg-white p-8 shadow-lg border">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900">{vehicle.plate}</h1>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-lg text-gray-700">
                    <div><strong className="block text-sm text-gray-500">客運</strong>{vehicle.company || 'N/A'}</div>
                    <div><strong className="block text-sm text-gray-500">年份</strong>{vehicle.year || 'N/A'}</div>
                    <div><strong className="block text-sm text-gray-500">廠牌</strong>{vehicle.manufacturer || 'N/A'}</div>
                    <div><strong className="block text-sm text-gray-500">型號</strong>{vehicle.model || ''}</div>
                </div>
            </div>

            <h2 className="text-4xl font-bold mb-8">圖片集</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicle.images.length > 0 ? (
                    vehicle.images.map((image) => (
                        <div key={image.url} className="bg-white border rounded-xl overflow-hidden shadow-md flex flex-col">
                            <div className="w-full bg-gray-200">
                                <Image
                                    src={image.url}
                                    alt={image.description || `車輛 ${vehicle.plate} 的圖片`}
                                    width={image.width || 1280}
                                    height={image.height || 720}
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <p className="font-semibold text-gray-800">{image.date}</p>
                                {image.description && (
                                    <p className="text-gray-600 mt-1 text-sm">{image.description}</p>
                                )}
                                <a
                                    href={image.url}
                                    download={image.filename}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto ml-auto inline-flex items-center justify-center h-10 w-10 rounded-full
                             bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white
                             transition-colors duration-200"
                                    title={`下載圖片 ${image.filename}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md border">
                        <p className="text-gray-500">此車輛暫無圖片。</p>
                    </div>
                )}
            </div>
        </div>
    );
}