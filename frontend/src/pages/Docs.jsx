import React from 'react';
import { Copy, Terminal, ExternalLink, Code, Check } from 'lucide-react';

const Docs = () => {
    const [copied, setCopied] = React.useState(null);

    const baseUrl = window.location.origin + '/api';

    const endpoints = [
        {
            method: 'GET',
            path: '/search?q={query}',
            desc: 'Search for mutual fund schemes with autocomplete.',
            params: [{ name: 'q', type: 'string', desc: 'Min 3 chars search query' }],
            example: `${baseUrl}/search?q=SBI`
        },
        {
            method: 'GET',
            path: '/scheme/{code}',
            desc: 'Get full scheme meta information and full NAV history.',
            params: [{ name: 'code', type: 'integer', desc: 'The unique scheme code (e.g. 102885)' }],
            example: `${baseUrl}/scheme/102885`
        },
        {
            method: 'GET',
            path: '/scheme/{code}/latest',
            desc: 'Get only the latest NAV for a specific scheme.',
            params: [{ name: 'code', type: 'integer', desc: 'Unique scheme code' }],
            example: `${baseUrl}/scheme/102885/latest`
        }
    ];

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="py-20 bg-gray-50/50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">API Documentation</h1>
                    <p className="text-gray-500 text-lg">Build the next generation of fintech apps with our ready-to-use API.</p>
                </div>

                <div className="space-y-12">
                    {/* Intro */}
                    <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-indigo-600" />
                            Getting Started
                        </h2>
                        <div className="prose prose-indigo text-gray-600">
                            <p>All requests should be sent to our base API URL. Responses are returned in consistent JSON format.</p>
                            <div className="mt-4 flex items-center justify-between bg-gray-900 text-indigo-300 p-4 rounded-xl font-mono text-sm group">
                                <span>{baseUrl}</span>
                                <button onClick={() => handleCopy(baseUrl, 'base')} className="text-gray-500 hover:text-white transition-colors">
                                    {copied === 'base' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Endpoints */}
                    {endpoints.map((ep, idx) => (
                        <section key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-black tracking-widest">{ep.method}</span>
                                <h3 className="text-lg font-bold text-gray-900 font-mono">{ep.path}</h3>
                            </div>

                            <p className="text-gray-600 mb-8">{ep.desc}</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Parameters</h4>
                                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-100/50 border-b border-gray-100">
                                                <tr>
                                                    <th className="px-4 py-3 font-bold text-gray-600">Name</th>
                                                    <th className="px-4 py-3 font-bold text-gray-600">Type</th>
                                                    <th className="px-4 py-3 font-bold text-gray-600">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {ep.params.map((p, i) => (
                                                    <tr key={i}>
                                                        <td className="px-4 py-3 font-mono text-indigo-600">{p.name}</td>
                                                        <td className="px-4 py-3 italic text-gray-400">{p.type}</td>
                                                        <td className="px-4 py-3 text-gray-600">{p.desc}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Example Request</h4>
                                    <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100 font-mono text-xs">
                                        <code className="text-gray-600 overflow-x-auto whitespace-nowrap">{ep.example}</code>
                                        <button onClick={() => handleCopy(ep.example, idx)} className="ml-4 text-gray-400 hover:text-indigo-600 transition-colors">
                                            {copied === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}

                    {/* Rate Limiting Note */}
                    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
                        <div className="flex items-center gap-4 mb-4">
                            <Info className="w-8 h-8 text-indigo-200" />
                            <h2 className="text-xl font-bold">Important: Rate Limiting</h2>
                        </div>
                        <p className="text-indigo-100 leading-relaxed">
                            Our API is throttled to <span className="font-bold text-white">60 requests per minute</span> to ensure stability.
                            If you exceed this limit, you will receive a 429 status code. Please cache responses on your end for optimal performance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docs;
