import rawData from '../Data/IR-Network.json';

// Comprehensive Coordinate Mapping
const REGION_COORDINATES = {
    // Major Regions
    "United States": { lat: 37.0902, lng: -95.7129 },
    "Pakistan": { lat: 30.3753, lng: 69.3451 },
    "India": { lat: 20.5937, lng: 78.9629 },
    "Yemen": { lat: 15.5527, lng: 48.5164 },
    "Iraq": { lat: 33.2232, lng: 43.6793 },
    "United Kingdom": { lat: 55.3781, lng: -3.4360 },
    "Germany": { lat: 51.1657, lng: 10.4515 },
    "Canada": { lat: 56.1304, lng: -106.3468 },
    "Turkey": { lat: 38.9637, lng: 35.2433 },
    "Lebanon": { lat: 33.8547, lng: 35.8623 },
    "Nigeria": { lat: 9.0820, lng: 8.6753 },
    "West Asia": { lat: 32.0000, lng: 40.0000 }, // Approximate center
    "Afghanistan": { lat: 33.9391, lng: 67.7100 },
    "France": { lat: 46.2276, lng: 2.2137 },
    "Europe": { lat: 54.5260, lng: 15.2551 },
    "Sweden": { lat: 60.1282, lng: 18.6435 },
    "Iran": { lat: 32.4279, lng: 53.6880 },
    "Indonesia": { lat: -0.7893, lng: 113.9213 },
    "Netherlands": { lat: 52.1326, lng: 5.2913 },
    "United Arab Emirates": { lat: 23.4241, lng: 53.8478 },
    "Australia": { lat: -25.2744, lng: 133.7751 },
    "Saudi Arabia": { lat: 23.8859, lng: 45.0792 },
    "North America": { lat: 54.5260, lng: -105.2551 },
    "Oman": { lat: 21.4735, lng: 55.9754 },
    "Bahrain": { lat: 26.0667, lng: 50.5577 },
    "Mexico": { lat: 23.6345, lng: -102.5528 },
    "Kenya": { lat: -1.2921, lng: 36.8219 },
    "South Asia": { lat: 24.5937, lng: 78.9629 },
    "Japan": { lat: 36.2048, lng: 138.2529 },
    "Italy": { lat: 41.8719, lng: 12.5674 },
    "Spain": { lat: 40.4637, lng: -3.7492 },
    "Bangladesh": { lat: 23.6850, lng: 90.3563 },
    "Egypt": { lat: 26.8206, lng: 30.8025 },
    "Brazil": { lat: -14.2350, lng: -51.9253 },
    "Kuwait": { lat: 29.3117, lng: 47.4818 },
    "Malaysia": { lat: 4.2105, lng: 101.9758 },
    "Austria": { lat: 47.5162, lng: 14.5501 },
    "Ghana": { lat: 7.9465, lng: -1.0232 },
    "Switzerland": { lat: 46.8182, lng: 8.2275 },
    "South Africa": { lat: -30.5595, lng: 22.9375 },
    "Poland": { lat: 51.9194, lng: 19.1451 },
    "Belgium": { lat: 50.5039, lng: 4.4699 },
    "Norway": { lat: 60.4720, lng: 8.4689 },
    "Colombia": { lat: 4.5709, lng: -74.2973 },
    "Qatar": { lat: 25.3548, lng: 51.1839 },
    "Argentina": { lat: -38.4161, lng: -63.6167 },
    "Hong Kong": { lat: 22.3193, lng: 114.1694 },
    "Bulgaria": { lat: 42.7339, lng: 25.4858 },
    "Algeria": { lat: 28.0339, lng: 1.6596 },
    "Peru": { lat: -9.1900, lng: -75.0152 },
    "Ireland": { lat: 53.1424, lng: -7.6921 },
    "Africa": { lat: -8.7832, lng: 34.5085 },
    "Australasia": { lat: -35.2744, lng: 145.7751 },
    "Uganda": { lat: 1.3733, lng: 32.2903 },
    "Portugal": { lat: 39.3999, lng: -8.2245 },
    "New Zealand": { lat: -40.9006, lng: 174.8860 },
    "Maldives": { lat: 3.2028, lng: 73.2207 },
    "Finland": { lat: 61.9241, lng: 25.7482 },
    "East Asia & Pacific": { lat: 15.0000, lng: 125.0000 },
    "Thailand": { lat: 15.8700, lng: 100.9925 },
    "South America": { lat: -15.6006, lng: -56.1004 },
    "Senegal": { lat: 14.4974, lng: -14.4524 },
    "Panama": { lat: 8.5380, lng: -80.7821 },
    "North Africa": { lat: 30.0000, lng: 10.0000 },
    "Morocco": { lat: 31.7917, lng: -7.0926 },
    "Libya": { lat: 26.3351, lng: 17.2283 },
    "Cyprus": { lat: 35.1264, lng: 33.4299 },
    "Congo": { lat: -0.2280, lng: 15.8277 },
    "Chile": { lat: -35.6751, lng: -71.5430 },
    "Azerbaijan": { lat: 40.1431, lng: 47.5769 },
    "Tunisia": { lat: 33.8869, lng: 9.5375 },
    "Romania": { lat: 45.9432, lng: 24.9668 },
    "Paraguay": { lat: -23.4425, lng: -58.4438 },
    "Niger": { lat: 17.6078, lng: 8.0817 },
    "Israel": { lat: 31.0461, lng: 34.8516 },
    "Greece": { lat: 39.0742, lng: 21.8243 },
    "Ethiopia": { lat: 9.1450, lng: 40.4897 },
    "Denmark": { lat: 56.2639, lng: 9.5018 },
    "Côte d'Ivoire": { lat: 7.5400, lng: -5.5471 },
    "Czech Republic": { lat: 49.8175, lng: 15.4730 },
    "Burkina Faso": { lat: 12.2383, lng: -1.5616 },
    "Zimbabwe": { lat: -19.0154, lng: 29.1549 },
    "Taiwan": { lat: 23.6978, lng: 120.9605 },
    "Somalia": { lat: 5.1521, lng: 46.1996 },
    "Slovenia": { lat: 46.1512, lng: 14.9955 },
    "Mozambique": { lat: -18.6657, lng: 35.5296 },
    "Mali": { lat: 17.5707, lng: -3.9962 },
    "Kazakhstan": { lat: 48.0196, lng: 66.9237 },
    "Jordan": { lat: 30.5852, lng: 36.2384 },
    "Georgia": { lat: 42.3154, lng: 43.3569 },
    "Ecuador": { lat: -1.8312, lng: -78.1834 },
    "Croatia": { lat: 45.1000, lng: 15.2000 },
    "Costa Rica": { lat: 9.7489, lng: -83.7534 },
    "Viet Nam": { lat: 14.0583, lng: 108.2772 },
    "Uzbekistan": { lat: 41.3775, lng: 64.5853 },
    "Uruguay": { lat: -32.5228, lng: -55.7658 },
    "Ukraine": { lat: 48.3794, lng: 31.1656 },
    "Trinidad and Tobago": { lat: 10.6918, lng: -61.2225 },
    "Syrian Arab Republic": { lat: 34.8021, lng: 38.9968 },
    "Sudan": { lat: 12.8628, lng: 30.2176 },
    "Sri Lanka": { lat: 7.8731, lng: 80.7718 },
    "Singapore": { lat: 1.3521, lng: 103.8198 },
    "Serbia": { lat: 44.0165, lng: 21.0059 },
    "Rwanda": { lat: -1.9403, lng: 29.8739 },
    "Nicaragua": { lat: 12.8654, lng: -85.2072 },
    "Nepal": { lat: 28.3949, lng: 84.1240 },
    "Malta": { lat: 35.9375, lng: 14.3754 },
    "Macao": { lat: 22.1987, lng: 113.5439 },
    "Lithuania": { lat: 55.1694, lng: 23.8813 },
    "Latvia": { lat: 56.8796, lng: 24.6032 },
    "Lao People's Democratic Republic": { lat: 19.8563, lng: 102.4955 },
    "Hungary": { lat: 47.1625, lng: 19.5033 },
    "Guinea": { lat: 9.9456, lng: -9.6966 },
    "Estonia": { lat: 58.5953, lng: 25.0136 },
    "Djibouti": { lat: 11.8251, lng: 42.5903 },
    "Cambodia": { lat: 12.5657, lng: 104.9910 },
    "Brunei Darussalam": { lat: 4.5353, lng: 114.7277 },
    "Armenia": { lat: 40.0691, lng: 45.0382 },
    "Andorra": { lat: 42.5063, lng: 1.5218 },
    "Albania": { lat: 41.1533, lng: 20.1683 },
};

export const getGroupedData = () => {
    const grouped = {};

    rawData.forEach(user => {
        // Normalize: Trim whitespace and handle "iraq" vs "Iraq" via Title Case or mapping
        let rawRegion = user.account_based_in || "Unknown";
        let region = rawRegion.trim();

        // Manual overrides for known casing issues
        if (region.toLowerCase() === 'iraq') region = 'Iraq';
        if (region.toLowerCase() === 'iran') region = 'Iran';
        if (region.toLowerCase() === 'usa') region = 'United States';
        // Add more normalization if needed, but title case is usually enough for data like this

        if (!grouped[region]) {
            // Find coordinates - try direct match, then title case (just in case)
            let coords = REGION_COORDINATES[region];

            grouped[region] = {
                name: region,
                users: [],
                count: 0,
                coordinates: coords || { lat: 0, lng: 0 }
            };
        }
        grouped[region].users.push(user);
        grouped[region].count++;
    });

    // Filter out regions without coordinates 
    // IMPORTANT: Log missing regions to console for debugging
    const missing = Object.values(grouped).filter(g => g.coordinates.lat === 0 && g.coordinates.lng === 0);
    if (missing.length > 0) {
        console.warn("Regions missing coordinates:", missing.map(m => m.name));
    }

    return Object.values(grouped).filter(g => g.coordinates.lat !== 0 || g.coordinates.lng !== 0);
};
