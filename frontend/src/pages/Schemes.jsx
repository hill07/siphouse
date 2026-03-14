import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SchemeTable from '../components/SchemeTable';
import { Search, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSchemes();
    }, [limit, offset]);

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            // Note: In a real app we'd need a paginated endpoint
            // For now, we'll fetch a list and slice it or handle multiple results
            const data = await api.get(`/search?q=${searchTerm || 'SBI'}`);
            setSchemes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setOffset(0);
        fetchSchemes();
    };

    const filteredSchemes = schemes.filter(s =>
        s.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(offset, offset + limit);

    return (
        <div className="py-12 bg-white min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Explore Schemes</h1>
                        <p className="text-gray-500 mt-1">Browse and filter thousands of mutual fund schemes.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Filter results..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </form>

                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                            <ListFilter className="w-4 h-4 text-gray-400" />
                            <select
                                value={limit}
                                onChange={(e) => { setLimit(Number(e.target.value)); setOffset(0); }}
                                className="bg-transparent text-sm font-medium text-gray-700 outline-none"
                            >
                                <option value={20}>20 / page</option>
                                <option value={50}>50 / page</option>
                                <option value={100}>100 / page</option>
                            </select>
                        </div>
                    </div>
                </div>

                <SchemeTable schemes={filteredSchemes} loading={loading} />

                {/* Pagination Controls */}
                {!loading && (
                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{offset + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(offset + limit, schemes.length)}</span> of <span className="font-semibold text-gray-900">{schemes.length}</span> results
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setOffset(Math.max(0, offset - limit))}
                                disabled={offset === 0}
                                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setOffset(offset + limit)}
                                disabled={offset + limit >= schemes.length}
                                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schemes;
