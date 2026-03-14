import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 italic">SIPHouse</h3>
                        <p className="text-sm text-gray-500">
                            The ultimate Mutual Fund NAV Explorer. Simple, fast, and free.
                        </p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-sm text-gray-400">
                            Powered by <a href="https://api.mfapi.in" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">MFapi.in</a>
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            Disclaimer: Information provided is for educational purposes only. Not investment advice.
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} SIPHouse. Built for stability and speed.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
