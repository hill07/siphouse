import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, placeholder = "Search for Mutual Fund schemes..." }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await api.get(`/search?q=${query}`);
                setResults(Array.isArray(data) ? data.slice(0, 10) : []);
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelect = (scheme) => {
        setQuery('');
        setShowDropdown(false);
        navigate(`/scheme/${scheme.schemeCode}`);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400 text-lg"
                    onFocus={() => query.length >= 3 && setShowDropdown(true)}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {loading ? (
                        <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />
                    ) : query && (
                        <button onClick={() => setQuery('')}>
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            {/* Dropdown Results */}
            {showDropdown && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="divide-y divide-gray-50">
                        {results.map((scheme) => (
                            <li
                                key={scheme.schemeCode}
                                onClick={() => handleSelect(scheme)}
                                className="px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors group"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-700">
                                            {scheme.schemeName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Code: {scheme.schemeCode}
                                        </p>
                                    </div>
                                    <span className="ml-4 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                        View detail
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
