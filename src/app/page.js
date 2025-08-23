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
        <div className="space-y-8">
            {/* 社群連結按鈕 (無變動) */}
            <div className="flex justify-center items-center gap-6">
                <a
                    href="https://myster7494.github.io/bus_scraper"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="桃園公車站動態網"
                    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                >
                    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zM18 11H6V6h12v5z"/>
                    </svg>
                </a>
                <a
                    href="https://github.com/Myster7494/bus_gallery_web"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                >
                    <svg className="h-10 w-10" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/>
                    </svg>
                </a>
                <a
                    href="https://www.instagram.com/myster.bus"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                >
                    <svg className="h-10 w-10" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <linearGradient id="b-3">
                                <stop offset="0" stopColor="#3771c8"/>
                                <stop stopColor="#3771c8" offset=".128"/>
                                <stop offset="1" stopColor="#60f" stopOpacity="0"/>
                            </linearGradient>
                            <linearGradient id="a-3">
                                <stop offset="0" stopColor="#fd5"/>
                                <stop offset=".1" stopColor="#fd5"/>
                                <stop offset=".5" stopColor="#ff543e"/>
                                <stop offset="1" stopColor="#c837ab"/>
                            </linearGradient>
                            <radialGradient id="c-3" cx="158.429" cy="578.088" r="65" xlinkHref="#a-3" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 -1.98198 1.8439 0 -1031.402 454.004)" fx="158.429" fy="578.088"/>
                            <radialGradient id="d-3" cx="147.694" cy="473.455" r="65" xlinkHref="#b-3" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.17394 .86872 -3.5818 .71718 1648.348 -458.493)" fx="147.694" fy="473.455"/>
                        </defs>
                        <path fill="url(#c-3)" d="M65.03 0C37.888 0 29.95.028 28.407.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468C4 13.126 1.5 18.394.595 24.656c-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28 7.79-2.01 14.24-7.29 17.75-14.53 1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624C116.9 4 111.64 1.5 105.372.596 102.335.157 101.73.027 86.19 0H65.03z" transform="translate(1.004 1)"/>
                        <path fill="url(#d-3)" d="M65.03 0C37.888 0 29.95.028 28.407.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468C4 13.126 1.5 18.394.595 24.656c-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28 7.79-2.01 14.24-7.29 17.75-14.53 1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624C116.9 4 111.64 1.5 105.372.596 102.335.157 101.73.027 86.19 0H65.03z" transform="translate(1.004 1)"/>
                        <path fill="#fff" d="M66.004 18c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C18.06 51.327 18 52.964 18 66s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788 0-13.036-.06-14.672-.29-19.792-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514-1.68 1.68-3.275 2.72-5.516 3.59-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28-12.817 0-14.336-.05-19.396-.28-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.276-3.592-5.517-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52 1.68-1.68 3.28-2.72 5.52-3.592 1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97c-3.18 0-5.76 2.577-5.76 5.758 0 3.18 2.58 5.76 5.76 5.76 3.18 0 5.76-2.58 5.76-5.76 0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65 0 13.613 11.037 24.645 24.65 24.645C79.617 90.645 90.65 79.613 90.65 66S79.616 41.35 66.003 41.35zm0 8.65c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16z"/>
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
                    <input type="text" inputMode="numeric" pattern="\d*" value={yearSearch} onChange={(e) => setYearSearch(e.target.value)} placeholder="出廠年份..."
                           className="input-style" />
                </div>
            </div>

            {/* --- 核心變更：增加 Grid 欄位數，讓每格變小 --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {isLoading ? (
                    Array.from({ length: 12 }).map((_, i) => <VehicleLinkSkeleton key={i} />)
                ) : filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                        <Link key={vehicle.plate} href={`/${vehicle.plate}`}
                              className="group block p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm
                                         transition-all duration-300 ease-in-out
                                         hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {vehicle.plate}
                            </h2>
                            <div className="mt-2 text-slate-600 dark:text-slate-400 space-y-1 text-xs">
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