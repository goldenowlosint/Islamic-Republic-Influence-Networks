import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const WorldMap = ({ data, onRegionSelect }) => {

    // Helper to determine styles based on count
    const getRegionStyles = (count) => {
        // Continuous sizing: 15px base + sqrt(count)*2 for smooth growth
        // 1 -> 17px
        // 16 -> 23px
        // 42 -> 28px
        // 100 -> 35px
        // 200 -> 43px
        // 350 -> 52px
        const sizePx = Math.round(15 + Math.sqrt(count) * 2);

        let fontSizeClass = 'text-[10px]';
        if (sizePx > 35) fontSizeClass = 'text-base';
        else if (sizePx > 28) fontSizeClass = 'text-xs';

        let colorConfig = {};

        // Color buckets based on distribution (>200 is the top tier)
        if (count >= 200) {
            colorConfig = {
                gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)', // Red
                solidColor: '#ef4444',
                shadowColor: 'rgba(220, 38, 38, 0.6)'
            };
        } else if (count >= 100) {
            colorConfig = {
                gradient: 'linear-gradient(135deg, #f97316, #c2410c)', // Orange
                solidColor: '#f97316',
                shadowColor: 'rgba(249, 115, 22, 0.6)'
            };
        } else if (count > 20) {
            colorConfig = {
                gradient: 'linear-gradient(135deg, #3b82f6, #4338ca)', // Blue
                solidColor: '#3b82f6',
                shadowColor: 'rgba(59, 130, 246, 0.6)'
            };
        } else {
            colorConfig = {
                gradient: 'linear-gradient(135deg, #10b981, #0f766e)', // Green
                solidColor: '#10b981',
                shadowColor: 'rgba(16, 185, 129, 0.6)'
            };
        }

        return {
            sizePx,
            fontSizeClass,
            ...colorConfig
        };
    };

    // Helper to create a custom numbered icon
    const createNumberIcon = (count) => {
        const styles = getRegionStyles(count);

        // Inline styles for reliability + Professional glass/border effects
        const html = `
            <div class="flex items-center justify-center rounded-full text-white font-bold transition-transform duration-300 hover:scale-110"
                 style="
                    width: ${styles.sizePx}px; 
                    height: ${styles.sizePx}px; 
                    background: ${styles.gradient}; 
                    box-shadow: 0 2px 10px ${styles.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.4);
                    border: 1px solid rgba(255,255,255,0.4);
                 ">
                <span class="${styles.fontSizeClass} drop-shadow-md" style="font-family: 'Inter', sans-serif;">${count}</span>
            </div>
        `;

        return L.divIcon({
            className: 'custom-number-icon',
            html: html,
            iconSize: [styles.sizePx, styles.sizePx],
            iconAnchor: [styles.sizePx / 2, styles.sizePx / 2],
        });
    };

    return (
        <div className="h-screen w-full relative z-0 bg-black">
            <MapContainer
                center={[20, 0]}
                zoom={3}
                minZoom={2}
                maxBounds={[[-85, -180], [85, 180]]}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {data.map((region) => {
                    const styles = getRegionStyles(region.count);
                    return (
                        <Marker
                            key={region.name}
                            position={[region.coordinates.lat, region.coordinates.lng]}
                            icon={createNumberIcon(region.count)}
                            eventHandlers={{
                                click: () => onRegionSelect(region),
                            }}
                        >
                            <Tooltip
                                direction="top"
                                offset={[0, -20]}
                                opacity={1}
                                permanent={false}
                                className="custom-tooltip"
                            >
                                <div
                                    className="text-white text-xs font-bold uppercase tracking-wide transform translate-y-1 opacity-100 relative z-50 shadow-lg"
                                    style={{
                                        backgroundColor: styles.solidColor,
                                        padding: '8px 16px',
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    {region.name}
                                </div>
                            </Tooltip>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default WorldMap;
