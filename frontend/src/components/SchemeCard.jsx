import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SchemeCard = ({ scheme }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-50 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    #{scheme.schemeCode}
                </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-4 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
                {scheme.schemeName}
            </h3>
            <Link
                to={`/scheme/${scheme.schemeCode}`}
                className="flex items-center space-x-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors"
            >
                <span>Explore Fund</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
};

export default SchemeCard;
