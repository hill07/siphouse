import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NavChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400">No NAV history available for the selected range.</p>
            </div>
        );
    }

    // Prepare data for Recharts (reverse to show chronological order)
    const chartData = [...data].reverse().map(item => ({
        date: item.date,
        nav: parseFloat(item.nav)
    }));

    return (
        <div className="w-full h-[400px] bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            fontSize: '14px'
                        }}
                        formatter={(value) => [`₹${value.toFixed(4)}`, 'NAV']}
                    />
                    <Line
                        type="monotone"
                        dataKey="nav"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default NavChart;
