import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-bounce">
                        <Sparkles className="w-4 h-4" />
                        <span>Real-time NAV Tracking</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Explore Mutual Funds <br />
                        <span className="text-indigo-600">With Confidence.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
                        SIPHouse provides lightning-fast access to NAV history and scheme details for thousands of Mutual Funds in India.
                    </p>

                    <SearchBar />

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/schemes"
                            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
                        >
                            Explore All Schemes
                        </Link>
                        <Link
                            to="/docs"
                            className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
                        >
                            Developer API
                        </Link>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center p-8 rounded-3xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-indigo-100 transition-all group">
                            <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Live Performance</h3>
                            <p className="text-gray-500">Track the latest NAV and historical performance trends with interactive charts.</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-indigo-100 transition-all group">
                            <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Search</h3>
                            <p className="text-gray-500">Blazing fast autocomplete search to find your funds in milliseconds.</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-indigo-100 transition-all group">
                            <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Production Ready</h3>
                            <p className="text-gray-500">Scalable architecture designed for modern fintech applications.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
