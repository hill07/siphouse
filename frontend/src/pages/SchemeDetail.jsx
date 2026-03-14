import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import NavChart from '../components/NavChart';
import Loader from '../components/Loader';
import { ArrowLeft, Landmark, Layers, Tag, Info, Calendar, Download } from 'lucide-react';

const SchemeDetail = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [fund, setFund] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('1Y'); // 1M, 6M, 1Y, ALL

    useEffect(() => {
        fetchDetails();
    }, [code]);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const data = await api.get(`/scheme/${code}`);
            setFund(data);
        } catch (err) {
            setError('Failed to load fund details. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen py-20"><Loader size="lg" /><p className="text-center text-gray-500">Fetching latest NAV data...</p></div>;
    if (error) return <div className="min-h-screen py-20 text-center"><p className="text-red-500 mb-4">{error}</p><button onClick={() => navigate(-1)} className="text-indigo-600 font-bold underline">Go Back</button></div>;
    if (!fund) return null;

    const latestNav = fund.data?.[0]?.nav || 'N/A';
    const latestDate = fund.data?.[0]?.date || 'N/A';

    return (
        <div className="py-12 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-medium">Back to search</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                                {fund.meta.scheme_name}
                            </h1>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                                        <Landmark className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Fund House</p>
                                        <p className="text-sm font-semibold text-gray-700">{fund.meta.fund_house}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                                        <Layers className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Category</p>
                                        <p className="text-sm font-semibold text-gray-700">{fund.meta.scheme_category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                                        <Tag className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Scheme Type</p>
                                        <p className="text-sm font-semibold text-gray-700">{fund.meta.scheme_type}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Latest NAV</p>
                                            <p className="text-4xl font-extrabold text-indigo-600">₹{latestNav}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Update Date</p>
                                            <p className="text-sm font-semibold text-gray-600">{latestDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Chart & Table */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Chart Area */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                    NAV History
                                </h2>
                                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                                    {['1M', '6M', '1Y', 'ALL'].map(range => (
                                        <button
                                            key={range}
                                            onClick={() => setDateRange(range)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${dateRange === range ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-indigo-600'}`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <NavChart data={fund.data.slice(0, dateRange === '1M' ? 30 : dateRange === '6M' ? 180 : dateRange === '1Y' ? 365 : undefined)} />
                        </div>

                        {/* Recent History Table */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-indigo-600" />
                                    Recent Daily NAV
                                </h2>
                                <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                                    <Download className="w-3 h-3" />
                                    Download CSV
                                </button>
                            </div>
                            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">NAV (₹)</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {fund.data.slice(0, 10).map((item, idx) => (
                                            <tr key={item.date}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.date}</td>
                                                <td className="px-6 py-4 text-sm font-mono font-bold text-indigo-600">{item.nav}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {fund.data[idx + 1] ? (
                                                        <span className={item.nav > fund.data[idx + 1].nav ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                                                            {item.nav > fund.data[idx + 1].nav ? '+' : ''}
                                                            {(((item.nav - fund.data[idx + 1].nav) / fund.data[idx + 1].nav) * 100).toFixed(2)}%
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemeDetail;
