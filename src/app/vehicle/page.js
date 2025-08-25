// src/app/vehicle/page.js
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getRepoFileContent, RAW_CONTENT_BASE_URL } from '@/lib/github-client';

// 骨架畫面元件
function VehiclePageSkeleton() {
    return (
        <div>
            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-8"></div>
            <div className="mb-12 rounded-xl bg-white dark:bg-slate-800 p-8 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
                <div className="h-16 w-3/4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            <div className="h-6 w-24 bg-slate-300 dark:bg-slate-600 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-10 w-64 bg-slate-300 dark:bg-slate-600 rounded animate-pulse mb-8"></div>
        </div>
    );
}

// 找不到資料的元件
function NotFound({ plate }) {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">404 - 找不到資料</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
                無法找到車牌號碼為 <span className="font-mono text-blue-500">{plate || '...'}</span> 的車輛。
            </p>
            <Link href="/" className="mt-8 inline-block text-blue-600 dark:text-blue-400 hover:underline">
                返回車輛總覽
            </Link>
        </div>
    );
}

function VehicleDetails() {
    const searchParams = useSearchParams();
    const plate = searchParams.get('plate'); // 從 URL 讀取 ?plate=...

    const [vehicle, setVehicle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!plate) {
            setIsLoading(false);
            return;
        };
        async function fetchData() {
            setIsLoading(true);
            setVehicle(null);
            try {
                const [allVehicles, imagesData] = await Promise.all([
                    getRepoFileContent('pages/index.json'),
                    getRepoFileContent(`pages/${plate}/index.json`)
                ]);

                if (!allVehicles || !allVehicles[plate]) {
                    setIsLoading(false);
                    return;
                }
                const vehicleInfo = allVehicles[plate];
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
                setVehicle(null);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [plate]);

    if (isLoading) {
        return <VehiclePageSkeleton />;
    }
    if (!vehicle) {
        return <NotFound plate={plate} />;
    }

    return (
        <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                返回總覽
            </Link>

            <div className="mb-12 rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-50">{vehicle.plate}</h1>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-lg text-slate-700 dark:text-slate-300">
                    <div><strong className="block text-sm text-slate-500 dark:text-slate-400 font-medium">客運</strong>{vehicle.company || 'N/A'}</div>
                    <div><strong className="block text-sm text-slate-500 dark:text-slate-400 font-medium">年份</strong>{vehicle.year || 'N/A'}</div>
                    <div><strong className="block text-sm text-slate-500 dark:text-slate-400 font-medium">廠牌</strong>{vehicle.manufacturer || 'N/A'}</div>
                    <div><strong className="block text-sm text-slate-500 dark:text-slate-400 font-medium">型號</strong>{vehicle.model || 'N/A'}</div>
                </div>
            </div>

            <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">圖片集</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicle.images.length > 0 ? (
                    vehicle.images.map((image) => (
                        <div key={image.url} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md flex flex-col">
                            <div className="w-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <Image
                                    src={image.url}
                                    alt={image.description || `車輛 ${vehicle.plate} 的圖片`}
                                    width={image.width || 1280}
                                    height={image.height || 720}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{image.date}</p>
                                {image.description && (
                                    <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">{image.description}</p>
                                )}
                                <a
                                    href={image.url}
                                    download={image.filename}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 ml-auto inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-colors duration-200"
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
                    <div className="col-span-full text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400">此車輛暫無圖片。</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// 由於 useSearchParams() 這個 Hook 需要在 <Suspense> 內使用，
// 我們建立一個包裝元件來處理這個問題。
export default function VehiclePage() {
    return (
        <Suspense fallback={<VehiclePageSkeleton />}>
            <VehicleDetails />
        </Suspense>
    );
}