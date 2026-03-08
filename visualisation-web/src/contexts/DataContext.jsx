import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const DataContext = createContext();

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

const DATASETS = [
    { id: 'ir-instagram', name: 'IR Instagram Network', url: '/data/IR-Instagram-Network.json' },
    { id: 'ir-x', name: 'IR X Network', url: '/data/IR-X-Network.json' },
    { id: 'mek', name: 'MEK Network', url: '/data/MEK.json' },
    { id: 'white-internet', name: 'White Internet', url: '/data/White-Internet.json' },
];

export const DataProvider = ({ children }) => {
    const [datasetId, setDatasetId] = useState('ir-instagram');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataset = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const datasetInfo = DATASETS.find(d => d.id === datasetId) || DATASETS[0];
                const fetchUrl = `${import.meta.env.BASE_URL}${datasetInfo.url.replace(/^\//, '')}`;
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch dataset: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error("Error loading dataset:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataset();
    }, [datasetId]);

    const value = useMemo(() => {
        return {
            data,
            datasetId,
            setDatasetId,
            availableDatasets: DATASETS.map(({ id, name }) => ({ id, name })),
        };
    }, [data, datasetId]);

    if (isLoading || !data) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-900 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                <span className="text-sm font-medium">Loading Dataset...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-900 text-red-400">
                <span className="text-lg font-medium">Error loading data</span>
                <span className="text-sm">{error}</span>
            </div>
        );
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
