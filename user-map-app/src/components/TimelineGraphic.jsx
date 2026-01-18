import React, { useMemo, useState } from 'react';
import { Text } from '@tremor/react';
import TwemojiText from './TwemojiText';

const TimelineGraphic = ({ data }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const hoverTimeout = React.useRef(null);

    const handleMouseEnterPoint = (e, item) => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setHoveredItem({ ...item, x: e.clientX, y: e.clientY });
    };

    const handleMouseLeavePoint = () => {
        hoverTimeout.current = setTimeout(() => {
            setHoveredItem(null);
        }, 100); // Small delay to allow moving to tooltip
    };

    const handleMouseEnterTooltip = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };

    const handleMouseLeaveTooltip = () => {
        setHoveredItem(null);
    };

    // 1. Calculate Time Range
    const { minTime, maxTime, items } = useMemo(() => {
        if (!data || data.length === 0) return { minTime: 0, maxTime: 0, items: [] };

        const processed = data.map(d => {
            const date = new Date(d.creation_date);
            return {
                ...d,
                timestamp: date.getTime(),
                dateObj: date,
                // Pre-calculate random Y jitter (between 20% and 80% height)
                yPos: 20 + Math.random() * 60
            };
        }).sort((a, b) => a.timestamp - b.timestamp);

        // Fixed Start Date: Jan 1, 2007
        const minTime = new Date('2007-01-01').getTime();
        // End Date: Current Time (gives some space on the right)
        const maxTime = Date.now();

        return { minTime, maxTime, items: processed };
    }, [data]);

    // 2. Generate Ticks (Years)
    const ticks = useMemo(() => {
        const t = [];
        const startYear = 2007;
        const currentYear = new Date().getFullYear();
        for (let y = startYear; y <= currentYear; y++) {
            t.push({
                year: y,
                timestamp: new Date(`${y}-01-01`).getTime()
            });
        }
        return t;
    }, []);

    const getXPosition = (timestamp) => {
        return ((timestamp - minTime) / (maxTime - minTime)) * 100;
    };

    if (items.length === 0) return null;

    return (
        <div className="relative w-full h-[500px] bg-slate-900/50 rounded-xl border border-slate-800 p-4 select-none">

            {/* SVG Container */}
            <svg className="w-full h-full overflow-visible">
                {/* Defs for gradients/effects */}
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Horizontal Axis Line */}
                <line
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                />

                {/* Year Markers */}
                {ticks.map((tick) => {
                    const x = getXPosition(tick.timestamp);
                    return (
                        <g key={tick.year}>
                            <line
                                x1={`${x}%`}
                                y1="48%"
                                x2={`${x}%`}
                                y2="52%"
                                stroke="#475569"
                                strokeWidth="1"
                            />
                            <text
                                x={`${x}%`}
                                y="95%"
                                textAnchor="middle"
                                fill="#64748b"
                                fontSize="10"
                                className="font-mono"
                            >
                                {tick.year}
                            </text>
                            {/* Grid line (optional, faint) */}
                            <line
                                x1={`${x}%`}
                                y1="0%"
                                x2={`${x}%`}
                                y2="100%"
                                stroke="#1e293b"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                        </g>
                    );
                })}

                {/* Data Points */}
                {items.map((item, idx) => {
                    const x = getXPosition(item.timestamp);
                    const isHovered = hoveredItem && hoveredItem.user_id === item.user_id;

                    return (
                        <circle
                            key={idx}
                            cx={`${x}%`}
                            cy={`${item.yPos}%`}
                            r={isHovered ? 6 : 3}
                            fill={isHovered ? "#60a5fa" : "#3b82f6"}
                            opacity={isHovered ? 1 : 0.6}
                            className="transition-all duration-200 cursor-pointer hover:opacity-100"
                            onMouseEnter={(e) => handleMouseEnterPoint(e, item)}
                            onMouseLeave={handleMouseLeavePoint}
                            onClick={() => window.location.hash = `#/user/${item.username}`}
                        />
                    );
                })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredItem && (() => {
                // Calculate position percentages
                const xPct = getXPosition(hoveredItem.timestamp);
                const yPct = hoveredItem.yPos;

                // Determine Horizontal Alignment
                let tooltipStyle = {};
                let arrowStyle = {};
                let containerClass = "absolute z-50 pb-3 pointer-events-none"; // pointer-events-none to prevent flickering if cursor enters tooltip

                // Horizontal Logic
                if (xPct < 20) {
                    // Align Left
                    tooltipStyle.left = `${xPct}%`;
                    tooltipStyle.transform = 'translateX(-10px)'; // slight offset
                    arrowStyle.left = '20px'; // fixed offset for arrow
                } else if (xPct > 80) {
                    // Align Right
                    tooltipStyle.left = `${xPct}%`;
                    tooltipStyle.transform = 'translateX(calc(-100% + 10px))';
                    arrowStyle.right = '20px'; // fixed offset from right
                } else {
                    // Center
                    tooltipStyle.left = `${xPct}%`;
                    tooltipStyle.transform = 'translateX(-50%)';
                    arrowStyle.left = '50%';
                    arrowStyle.transform = 'translateX(-50%)';
                }

                // Vertical Logic
                const isNearTop = yPct < 30;
                if (isNearTop) {
                    // Show BELOW the point
                    tooltipStyle.top = `${yPct}%`;
                    tooltipStyle.marginTop = '15px';
                    containerClass = containerClass.replace('pb-3', 'pt-3');
                } else {
                    // Show ABOVE the point (default)
                    tooltipStyle.top = `${yPct}%`;
                    tooltipStyle.transform += ' translateY(-100%)';
                }

                return (
                    <div
                        className={containerClass}
                        style={tooltipStyle}
                        onMouseEnter={handleMouseEnterTooltip}
                        onMouseLeave={handleMouseLeaveTooltip}
                    >
                        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-2xl w-64 pointer-events-auto relative">
                            {/* Arrow - conditionally positioned */}
                            <div
                                className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${isNearTop ? 'border-b-[6px] border-b-slate-800 -top-[6px]' : 'border-t-[6px] border-t-slate-800 -bottom-[6px]'}`}
                                style={arrowStyle}
                            ></div>

                            <div className="flex items-center gap-3 mb-2">
                                {hoveredItem.profile_pic_url ? (
                                    <img src={hoveredItem.profile_pic_url} className="w-8 h-8 rounded-full" alt="" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                                        {hoveredItem.name?.[0]}
                                    </div>
                                )}
                                <div className="overflow-hidden">
                                    <h4 className="text-slate-200 font-bold text-sm truncate">
                                        <TwemojiText text={hoveredItem.name} />
                                    </h4>
                                    <p className="text-slate-500 text-xs">@{hoveredItem.username}</p>
                                </div>
                            </div>
                            <div className="text-slate-400 text-xs border-t border-slate-700 pt-2 mt-2 flex justify-between items-center">
                                <span>Joined: <span className="text-slate-300">{hoveredItem.dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span></span>
                            </div>

                            <a
                                href={`#/user/${hoveredItem.username}`}
                                className="mt-3 block w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium py-1.5 rounded transition-colors"
                            >
                                View Profile
                            </a>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default TimelineGraphic;
