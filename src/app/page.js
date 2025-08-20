// src/app/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRepoFileContent } from '@/lib/github-client';

// 骨架元件 (無變動)
function VehicleLinkSkeleton() {
    return (
        <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm animate-pulse">
            <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-2 mt-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const [allVehicles, setAllVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [plateSearch, setPlateSearch] = useState('');
    const [companySearch, setCompanySearch] = useState('');
    const [manufacturerSearch, setManufacturerSearch] = useState('');
    const [yearSearch, setYearSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');

    // 資料獲取邏輯 (無變動)
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const mainIndex = await getRepoFileContent('pages/index.json');
            if (!mainIndex) {
                setAllVehicles([]);
                setFilteredVehicles([]);
                setIsLoading(false);
                return;
            }
            const vehicleList = Object.entries(mainIndex).map(([plate, details]) => ({ plate, ...details }));
            setAllVehicles(vehicleList);
            setFilteredVehicles(vehicleList);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    // 篩選邏輯 (無變動)
    useEffect(() => {
        const pSearch = plateSearch.toLowerCase().trim();
        const cSearch = companySearch.toLowerCase().trim();
        const mSearch = manufacturerSearch.toLowerCase().trim();
        const ySearch = yearSearch.trim();
        const moSearch = modelSearch.toLowerCase().trim();

        const filtered = allVehicles.filter(vehicle => {
            const plateMatch = pSearch ? vehicle.plate.toLowerCase().includes(pSearch) : true;
            const companyMatch = cSearch ? vehicle.company?.toLowerCase().includes(cSearch) : true;
            const manufacturerMatch = mSearch ? vehicle.manufacturer?.toLowerCase().includes(mSearch) : true;
            const yearMatch = ySearch ? vehicle.year?.toString().includes(ySearch) : true;
            const modelMatch = moSearch ? vehicle.model?.toLowerCase().includes(moSearch) : true;

            return plateMatch && companyMatch && manufacturerMatch && yearMatch && modelMatch;
        });

        setFilteredVehicles(filtered);
    }, [plateSearch, companySearch, manufacturerSearch, yearSearch, modelSearch, allVehicles]);


    return (
        // --- 核心變更：調整主容器的間距 ---
        <div className="space-y-8">
            {/* --- 核心變更：新增社群連結區塊 --- */}
            <div className="flex justify-end items-center gap-4">
                <a
                    href="https://github.com/YOUR_USERNAME/YOUR_REPO" // <-- 請替換成您的 GitHub 連結
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                </a>
                <a
                    href="https://www.instagram.com/YOUR_ACCOUNT" // <-- 請替換成您的 Instagram 連結
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.37a4.312 4.312 0 100 8.625 4.312 4.312 0 000-8.625zM12 15.687a3.687 3.687 0 110-7.375 3.687 3.687 0 010 7.375z" clipRule="evenodd" />
                        <path d="M16.949 8.127a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                    </svg>
                </a>
            </div>

            {/* 篩選器卡片 (無變動) */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">篩選車輛</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <input type="text" value={plateSearch} onChange={(e) => setPlateSearch(e.target.value)} placeholder="車牌號碼..."
                           className="input-style" />
                    <input type="text" value={companySearch} onChange={(e) => setCompanySearch(e.target.value)} placeholder="客運公司..."
                           className="input-style" />
                    <input type="text" value={manufacturerSearch} onChange={(e) => setManufacturerSearch(e.target.value)} placeholder="車輛廠牌..."
                           className="input-style" />
                    <input type="text" value={modelSearch} onChange={(e) => setModelSearch(e.target.value)} placeholder="車輛型號..."
                           className="input-style" />
                    <input type="number" value={yearSearch} onChange={(e) => setYearSearch(e.target.value)} placeholder="出廠年份..."
                           className="input-style" />
                </div>
            </div>

            {/* 結果列表 (無變動) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    Array.from({ length: 12 }).map((_, i) => <VehicleLinkSkeleton key={i} />)
                ) : filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                        <Link key={vehicle.plate} href={`/${vehicle.plate}`}
                              className="group block p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm
                                         transition-all duration-300 ease-in-out
                                         hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {vehicle.plate}
                            </h2>
                            <div className="mt-3 text-slate-600 dark:text-slate-400 space-y-1.5 text-sm">
                                <p className="truncate"><strong className="font-medium text-slate-700 dark:text-slate-300">客運：</strong> {vehicle.company || 'N/A'}</p>
                                <p className="truncate"><strong className="font-medium text-slate-700 dark:text-slate-300">年份：</strong> {vehicle.year || 'N/A'}</p>
                                <p className="truncate"><strong className="font-medium text-slate-700 dark:text-slate-300">廠牌：</strong> {vehicle.manufacturer || 'N/A'}</p>
                                <p className="truncate"><strong className="font-medium text-slate-700 dark:text-slate-300">型號：</strong> {vehicle.model || 'N/A'}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200">找不到結果</p>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">請嘗試調整您的篩選條件。</p>
                    </div>
                )}
            </div>

            {/* 共用的輸入框樣式 (無變動) */}
            <style jsx>{`
                .input-style {
                    width: 100%;
                    padding: 0.625rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--color-border);
                    background-color: var(--color-background);
                    color: var(--color-foreground);
                    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                    transition: all 0.2s ease-in-out;
                }
                .input-style:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-primary);
                }
                .dark .input-style {
                    background-color: #0f172a; /* slate-900, 讓輸入框比卡片深一點 */
                }
                .input-style::placeholder {
                    color: var(--color-muted-foreground);
                }
            `}</style>
        </div>
    );
}