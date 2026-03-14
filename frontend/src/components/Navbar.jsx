import React from 'react';
import { Link } from 'react-router-dom';
import { Home, List, FileText, Activity } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Activity className="w-8 h-8 text-indigo-600" />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">SIP<span className="text-indigo-600">House</span></span>
                        </Link>
                    </div>
                    <div className="hidden sm:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        <Link to="/schemes" className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
                            <List className="w-4 h-4" />
                            <span>Explores</span>
                        </Link>
                        <Link to="/docs" className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
                            <FileText className="w-4 h-4" />
                            <span>API Docs</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
