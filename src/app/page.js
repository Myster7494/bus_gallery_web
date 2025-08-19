// src/app/page.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRepoFileContent } from '@/lib/github-client';

function VehicleLinkSkeleton() { /* ... (骨架元件無變動) ... */ }

export default function HomePage() {
    const [allVehicles, setAllVehicles] = useState([]); // 儲存所有車輛的原始列表
    const [filteredVehicles, setFilteredVehicles] = useState([]); // 儲存篩選後的列表
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // 儲存搜尋關鍵字

    // 獲取資料的 useEffect
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
            const vehicleList = Object.entries(mainIndex).map(([plate, details]) => ({
                plate,
                ...details,
            }));
            setAllVehicles(vehicleList);
            setFilteredVehicles(vehicleList); // 初始時顯示所有車輛
            setIsLoading(false);
        }
        fetchData();
    }, []);

    // --- 核心變更：監聽搜尋詞變化並執行篩選 ---
    useEffect(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) {
            setFilteredVehicles(allVehicles); // 如果沒有搜尋詞，顯示全部
            return;
        }

        const filtered = allVehicles.filter(vehicle => {
            // 檢查每個欄位是否包含搜尋詞
            const plateMatch = vehicle.plate.toLowerCase().includes(term);
            const companyMatch = vehicle.company?.toLowerCase().includes(term);
            const manufacturerMatch = vehicle.manufacturer?.toLowerCase().includes(term);
            const modelMatch = vehicle.model?.toLowerCase().includes(term);
            const yearMatch = vehicle.year?.toString().includes(term);

            return plateMatch || companyMatch || manufacturerMatch || modelMatch || yearMatch;
        });

        setFilteredVehicles(filtered);
    }, [searchTerm, allVehicles]);


    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900">
                    車輛總覽
                </h1>
                <p className="mt-2 text-lg text-gray-600">點擊卡片以查看詳細資訊與圖片集</p>
            </div>

            {/* --- 核心變更：新增搜尋輸入框 --- */}
            <div className="mb-8 max-w-lg mx-auto">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="搜尋車牌、公司、型號、年份..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    Array.from({ length: 12 }).map((_, i) => <VehicleLinkSkeleton key={i} />)
                ) : filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                        <Link
                            key={vehicle.plate}
                            href={`/${vehicle.plate}`}
                            className="group block p-5 bg-white border border-gray-200 rounded-xl shadow-md
                         transition-all duration-300 ease-in-out
                         hover:shadow-lg hover:border-blue-500 hover:-translate-y-1"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                                {vehicle.plate}
                            </h2>
                            <div className="mt-2 text-gray-600 space-y-1 text-sm">
                                <p className="truncate"><strong>客運：</strong> {vehicle.company || 'N/A'}</p>
                                <p className="truncate"><strong>年份：</strong> {vehicle.year || 'N/A'}</p>
                                <p className="truncate"><strong>廠牌：</strong> {vehicle.manufacturer || 'N/A'}</p>
                                <p className="truncate"><strong>型號：</strong> {vehicle.model || 'N/A'}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-xl text-gray-500 mt-8">
                        找不到符合條件的車輛。
                    </p>
                )}
            </div>
        </div>
    );
}