import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const SchemeTable = ({ schemes, loading }) => {
    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fund Code</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheme Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {schemes.map((scheme) => (
                        <tr key={scheme.schemeCode} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-500">
                                {scheme.schemeCode}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {scheme.schemeName}
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <Link
                                    to={`/scheme/${scheme.schemeCode}`}
                                    className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                >
                                    <span>Details</span>
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SchemeTable;
