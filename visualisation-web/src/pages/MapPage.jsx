import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from '../components/WorldMap';
import { getGroupedData } from '../components/MapData';
import { useDataContext } from '../contexts/DataContext';

const MapPage = () => {
    const navigate = useNavigate();
    const { data } = useDataContext();
    const groupedData = getGroupedData(data);

    const handleRegionSelect = (region) => {
        // Navigate to Users Page with location filter
        if (region && region.name) {
            navigate(`/users?location=${encodeURIComponent(region.name)}`);
        }
    };

    return (
        <div className="relative w-full h-full">
            <WorldMap
                data={groupedData}
                onRegionSelect={handleRegionSelect}
            />
        </div>
    );
};

export default MapPage;
