"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRepoFileContent } from '@/lib/github-client';

// 骨架元件
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

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const mainIndex = await getRepoFileContent('pages/index.json');
            if (mainIndex) {
                const vehicleList = Object.entries(mainIndex).map(([plate, details]) => ({ plate, ...details }));
                setAllVehicles(vehicleList);
                setFilteredVehicles(vehicleList);
            } else {
                setAllVehicles([]);
                setFilteredVehicles([]);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const pSearch = plateSearch.toLowerCase().trim();
        const cSearch = companySearch.toLowerCase().trim();
        const mSearch = manufacturerSearch.toLowerCase().trim();
        const ySearch = yearSearch.trim();
        const moSearch = modelSearch.toLowerCase().trim();

        const filtered = allVehicles.filter(vehicle =>
            (!pSearch || vehicle.plate.toLowerCase().includes(pSearch)) &&
            (!cSearch || vehicle.company?.toLowerCase().includes(cSearch)) &&
            (!mSearch || vehicle.manufacturer?.toLowerCase().includes(mSearch)) &&
            (!ySearch || vehicle.year?.toString().includes(ySearch)) &&
            (!moSearch || vehicle.model?.toLowerCase().includes(moSearch))
        );
        setFilteredVehicles(filtered);
    }, [plateSearch, companySearch, manufacturerSearch, yearSearch, modelSearch, allVehicles]);


    return (
        <div className="space-y-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
                <a href="https://tybusstation.github.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    <span>Linktree</span>
                </a>
                <a href="https://github.com/Myster7494/bus_gallery_web" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-5 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:bg-slate-900 hover:scale-105 hover:shadow-lg dark:bg-slate-700 dark:hover:bg-slate-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                    <span>GitHub</span>
                </a>
                <a href="https://www.instagram.com/myster.bus" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.04.02-5.462.164-6.527.584a5.87 5.87 0 00-2.14 1.096 5.87 5.87 0 00-1.096 2.14C2.164 6.853 2.02 8.274 2 12.315c-.02 4.04.124 5.462.544 6.527a5.87 5.87 0 001.096 2.14 5.87 5.87 0 002.14 1.096c1.065.42 2.487.564 6.527.584 4.04-.02 5.462-.164 6.527-.584a5.87 5.87 0 002.14-1.096 5.87 5.87 0 001.096-2.14c.42-1.065.564-2.487.584-6.527.02-4.04-.124-5.462-.544-6.527a5.87 5.87 0 00-1.096-2.14 5.87 5.87 0 00-2.14-1.096C17.777 2.164 16.355 2.02 12.315 2zM12 7.23a4.77 4.77 0 100 9.54 4.77 4.77 0 000-9.54zm0 7.82a3.05 3.05 0 110-6.1 3.05 3.05 0 010 6.1zM16.95 6.3a1.18 1.18 0 100 2.36 1.18 1.18 0 000-2.36z" clipRule="evenodd" /></svg>
                    <span>Instagram</span>
                </a>
                <p className="w-full text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                    如果有公車迷想建置類似的網站，歡迎點擊 Linktree 聯繫
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">篩選車輛</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <input type="text" value={plateSearch} onChange={(e) => setPlateSearch(e.target.value)} placeholder="車牌號碼..." className="input-style" />
                    <input type="text" value={companySearch} onChange={(e) => setCompanySearch(e.target.value)} placeholder="客運公司..." className="input-style" />
                    <input type="text" value={manufacturerSearch} onChange={(e) => setManufacturerSearch(e.target.value)} placeholder="車輛廠牌..." className="input-style" />
                    <input type="text" value={modelSearch} onChange={(e) => setModelSearch(e.target.value)} placeholder="車輛型號..." className="input-style" />
                    <input type="text" inputMode="numeric" pattern="\d*" value={yearSearch} onChange={(e) => setYearSearch(e.target.value)} placeholder="出廠年份..." className="input-style" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {isLoading ? (
                    Array.from({ length: 15 }).map((_, i) => <VehicleLinkSkeleton key={i} />)
                ) : filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                        <Link key={vehicle.plate} href={`/vehicle?plate=${vehicle.plate}`} className="group block p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1">
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
                    background-color: #0f172a; /* slate-900 */
                }
                .input-style::placeholder {
                    color: var(--color-muted-foreground);
                }
            `}</style>
        </div>
    );
}